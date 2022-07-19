import React, { useEffect, useState } from "react";
import { Masonry } from "@mui/lab";
import "chart.js/auto";
import "./report.scss";
import ReportHeader from "../../components/report/header";
import ReportFooter from "../../components/report/footer";
import FinanceReport from "../../components/report/reports/finance";
import EmissionReport from "../../components/report/reports/emission";
import Co2breakdownReport from "../../components/report/reports/co2breakdown";
import SiteMovementsReport from "../../components/report/reports/sitemovements";
import { getWasteOfEnergyList } from "../../store/actions/action.wasteOfEnergy";
import { getSiteBreakdownlist } from "../../store/actions/action.siteBd";
import ReportFilters from "../../components/report/filters";
import { useSelector, useDispatch } from "react-redux";
import * as htmlToImage from "html-to-image";
import * as Excel from "exceljs";
import { saveAs } from "file-saver";

const NewReports = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [csvData, setCsvData] = useState([]);
  const [reports, setReports] = useState({
    finance: false,
    site_movements: false,
    emissions: false,
    waste_statistics: false,
    ids: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelected(value);
  };
  const handleChangeReportType = async (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "finance":
        setReports({
          ...reports,
          finance: true,
          site_movements: false,
          emissions: false,
          waste_statistics: false,
          ids: "finance",
        });
        await dispatch(getSiteBreakdownlist());
        await setCsvData(state?.siteBreakdownList?.site_breakdown?.result);
        break;
      case "site_movements":
        setReports({
          ...reports,
          finance: false,
          site_movements: true,
          emissions: false,
          waste_statistics: false,
          ids: "site_movements",
        });
        break;
      case "emissions":
        setReports({
          ...reports,
          finance: false,
          site_movements: false,
          emissions: true,
          waste_statistics: false,
          ids: "emissions",
        });
        break;
      case "waste_statistics":
        setReports({
          ...reports,
          finance: false,
          site_movements: false,
          emissions: false,
          waste_statistics: true,
          ids: "waste_statistics",
        });
        //  await dispatch(getWasteOfEnergyList());
        //  await setCsvData(state?.energyList?.data?.result)
        break;
    }
  };

  async function exTest() {
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("Main sheet");
    var logo = "";
    var node = document.getElementById(reports.ids);
    await htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        logo = workbook.addImage({
          base64: img.src,
          extension: "png",
        });
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    worksheet.columns = [
      { header: "container", key: "container", width: 20 },
      { header: "customer_cost", key: "customer_cost", width: 20 },
      { header: "delivered", key: "delivered", width: 20 },
      { header: "em_co2e_value", key: "em_co2e_value", width: 20 },
      { header: "full_name", key: "full_name", width: 20 },
      { header: "job_address", key: "job_address", width: 20 },
      { header: "job_date", key: "job_date", width: 20 },
      { header: "job_number", key: "job_number", width: 20 },
      {
        header: "landfill_diversion_rate",
        key: "landfill_diversion_rate",
        width: 20,
      },
      { header: "movement", key: "movement", width: 20 },
      { header: "postcode", key: "postcode", width: 20 },
      { header: "recycled", key: "recycled", width: 20 },
      { header: "supplier", key: "supplier", width: 20 },
      { header: "supplier_postcode", key: "supplier_postcode", width: 20 },
    ];
    // worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date() });
    const newRows = worksheet.addRows(csvData);
    //   worksheet.getRow(1).border = {
    //     top: {style:'thin', color: {argb:'FF00FF00'}},
    //     left: {style:'thin', color: {argb:'FF00FF00'}},
    //     bottom: {style:'thin', color: {argb:'FF00FF00'}},
    //     right: {style:'thin', color: {argb:'FF00FF00'}}
    // };
    // worksheet.getRow(1).fill = {
    //   type: "pattern",
    //   pattern: "darkTrellis",
    //   fgColor: { argb: "FFFFFF00" },
    //   bgColor: { argb: "FF0000FF" },
    // };

    // worksheet.getRow(2).font = {
    //   name: "Comic Sans MS",
    //   family: 4,
    //   size: 16,
    //   underline: "double",
    //   bold: true,
    // };

    worksheet.addImage(
      logo,
      `B${csvData?.length + 5}:G${csvData?.length + 25}`
    );
    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${reports?.ids}-${new Date().toLocaleDateString()}.xlsx`
      );
    });
  }

  useEffect(() => {
    if (reports.ids === "waste_statistics") {
      setCsvData(state?.energyList?.data?.result);
    }
    if (reports.ids === "finance") {
      setCsvData(state?.siteBreakdownList?.site_breakdown?.result);
    }
  }, [state, reports]);

  useEffect(() => {
    dispatch(getWasteOfEnergyList());
    dispatch(getSiteBreakdownlist());
  }, []);

  return (
    <>
      <div className="main-report">
        <ReportHeader
          sites={selected}
          handleChange={handleChange}
          selected={selected}
        />
        <ReportFilters />
        <div className="report-grid">
          <Masonry container columns={2} spacing={4}>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Finance report</div>
              <FinanceReport sites={selected} />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Emissions</div>
              <EmissionReport
                sites={selected}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">C02e Breakdown</div>
              <Co2breakdownReport sites={selected} />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Site Movements</div>
              <SiteMovementsReport sites={selected} />
            </div>
          </Masonry>
        </div>
      </div>
      <ReportFooter
        handleChangeReportType={handleChangeReportType}
        reports={reports}
        sites={selected}
        exTest={exTest}
      />
    </>
  );
};
export default NewReports;
