import React, { useEffect, useState } from "react";
import { Masonry } from "@mui/lab";
import "chart.js/auto";
import "./report.scss";
import ReportHeader from "../../components/report/header";
import ReportFooter from "../../components/report/footer";
import FinanceReport from "../../components/report/reports/finance";
import SkipsReport from "../../components/report/reports/skip";
import EmissionReport from "../../components/report/reports/emission";
import Co2breakdownReport from "../../components/report/reports/co2breakdown";
import SiteMovementsReport from "../../components/report/reports/sitemovements";
import RebateReport from "../../components/report/reports/rebate";
import { getSiteBreakdownlist } from "../../store/actions/action.siteBd";
import { getSitesMovementList } from "../../store/actions/action.siteMovements";
import { getLandfillDiversionList } from "../../store/actions/action.landfillDiversion";
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
  const [showMore, setShowMore] = useState(false);
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
        break;
    }
  };

  async function exTest() {
    setShowMore(true);
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("Main sheet");
    var logo = "";
    var node = document.getElementById(reports.ids);
    var width = node.clientWidth;
    var height = node.clientHeight;
    // await htmlToImage
    //   .toPng(node)
    //   .then(function (dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     logo = workbook.addImage({
    //       base64: img.src,
    //       extension: "png",
    //     });
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });
    worksheet.columns = [
      { header: "Job Number", key: "job_number", width: 20 },
      { header: "Job Date", key: "job_date", width: 20 },
      { header: "Address", key: "job_address", width: 20 },
      { header: "Postcode", key: "postcode", width: 20 },
      { header: "Customer", key: "full_name", width: 20 },
      { header: "Movement", key: "movement", width: 20 },
      { header: "Container", key: "container", width: 20 },
      { header: "Customer Cost", key: "customer_cost", width: 20 },
      { header: "% Recycled", key: "recycled", width: 20 },
      { header: "Diverted T", key: "diverted", width: 20 },
      { header: "% Landfill", key: "landfill_diversion_rate", width: 20 },
      { header: "Supplier", key: "supplier", width: 20 },
      { header: "Supplier Postcode", key: "supplier_postcode", width: 20 },
      { header: "CO2 emitted (KGS)", key: "em_co2e_value", width: 20 },
    ];
    worksheet.addRows(csvData);
    // worksheet.addImage(logo, {
    //   tl: { col: 2, row: csvData?.length + 4 },
    //   ext: { width: width, height: height },
    // });
    workbook.csv
      .writeBuffer()
      .then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `${reports?.ids}-${new Date().toLocaleDateString()}.csv`
        );
        setShowMore(false);
      })
      .catch(() => {
        setShowMore(false);
      });
  }

  useEffect(() => {
    if (reports.ids === "waste_statistics") {
      setCsvData(state?.landfillList?.data?.result);
    }
    if (reports.ids === "finance") {
      setCsvData(state?.siteBreakdownList?.site_breakdown?.result);
    }
    if (reports.ids === "emissions") {
      setCsvData(state?.landfillList?.data?.result);
    }
    if (reports.ids === "site_movements") {
      setCsvData(state?.siteMovementsList?.data?.result);
    }
  }, [state, reports]);

  useEffect(() => {
    dispatch(getLandfillDiversionList({ sites: selected }));
    dispatch(getSiteBreakdownlist({ sites: selected }));
    dispatch(getSitesMovementList({ sites: selected }));
  }, [selected]);

 
  return (
    <>
      <div className="main-report">
        <ReportHeader
          sites={selected}
          handleChange={handleChange}
          selected={selected}
        />
        {/*<ReportFilters />*/}
        <div className="report-grid">
          <Masonry container columns={2} spacing={4}>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Rebate report</div>
              <SkipsReport sites={selected} showMore={showMore} />
            </div>
            {/*<div className="report-chart-card-outer">*/}
            {/*  <div className="report-card-title">Finance report</div>*/}
            {/*  <FinanceReport sites={selected} showMore={showMore} />*/}
            {/*</div>*/}
            <div className="report-chart-card-outer">
              <div className="report-card-title">Emissions</div>
              <EmissionReport
                sites={selected}
                startDate={startDate}
                setStartDate={setStartDate}
                showMore={showMore}
              />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Waste Breakdown</div>
              <Co2breakdownReport sites={selected} showMore={showMore} />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Site Movements</div>
              <SiteMovementsReport sites={selected} showMore={showMore} />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Rebate report</div>
              <RebateReport sites={selected} showMore={showMore} />
            </div>
          </Masonry>
        </div>
      </div>
      <ReportFooter
        handleChangeReportType={handleChangeReportType}
        reports={reports}
        sites={selected}
        exTest={exTest}
        csvData={csvData}
      />
    </>
  );
};
export default NewReports;
