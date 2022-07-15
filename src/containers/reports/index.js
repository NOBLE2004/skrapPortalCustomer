import React, { useState } from "react";
import { Masonry } from "@mui/lab";
import "chart.js/auto";
import "./report.scss";
import ReportHeader from "../../components/report/header";
import ReportFooter from "../../components/report/footer";
import FinanceReport from "../../components/report/reports/finance";
import EmissionReport from "../../components/report/reports/emission";
import Co2breakdownReport from "../../components/report/reports/co2breakdown";
import SiteMovementsReport from "../../components/report/reports/sitemovements";
import ReportFilters from "../../components/report/filters";
import { useSelector } from "react-redux";
import * as htmlToImage from "html-to-image";
import * as Excel from "exceljs";
import { saveAs } from "file-saver";

const NewReports = () => {
  const state = useSelector((state) => state);
  const [selected, setSelected] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
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
      { header: "Id", key: "id", width: 10 },
      { header: "Name", key: "name", width: 32 },
      { header: "D.O.B.", key: "dob", width: 10, outlineLevel: 1 },
    ];
    worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });
    worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date() });
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

    worksheet.addImage(logo, `B6:G25`);
    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        "DataGrid.xlsx"
      );
    });
  }

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
