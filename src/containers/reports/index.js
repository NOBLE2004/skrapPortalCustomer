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
import { getSiteBreakdownlist } from "../../store/actions/action.siteBd";
import { getSitesMovementList } from "../../store/actions/action.siteMovements";
import { getLandfillDiversionList } from "../../store/actions/action.landfillDiversion";
import ReportFilters from "../../components/report/filters";
import { useSelector, useDispatch } from "react-redux";
import * as htmlToImage from "html-to-image";
import * as Excel from "exceljs";
import { saveAs } from "file-saver";
import RebateReport from "../../components/report/reports/rebate";
import DualAxisGraph from "../../components/report/reports/dualAxis";
import { getEfficencyList } from "../../store/actions/action.reportEfficenyList";
import { Grid } from "@mui/material";
import WasteEmissionGraph from "../../components/report/reports/wasteEmissionGraph/index";
import WasteBreakDown from "../../components/report/reports/WasteBreakDown";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const NewReports = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [selected, setSelected] = useState('');
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState();

  const [startDate, setStartDate] = useState(new Date());
  const [csvData, setCsvData] = useState([]);
  const [reductionCSV, setReductionCSV] = useState([]);
  let currency = localStorage.getItem("currency");
  const [siteCurrency, setSiteCurrency] = useState(currency);
  const [showMore, setShowMore] = useState(false);
  const [reports, setReports] = useState({
    finance: true,
    ids: "",
  });
  //const [reportIds, setReportIds] = useState(['finance', 'site_movements', 'emissions', 'waste_statistics', 'waste_segrigation', 'avoided_ems', 'utilization']);
  const [reportIds, setReportIds] = useState(['pdf_download']);
  const [csvLoading, setCsvLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [redLoading, setRedLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelected(value);
  };

  async function exTest() {
    setShowMore(true);
    setCsvLoading(true);
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    let logos = [];
    for (const id of reportIds){
      let logo = "";
      var node = document.getElementById(id);
      var width = node.clientWidth;
      var height = node.clientHeight;
      await htmlToImage
          .toPng(node, {quality: 1, style: {fontFamily: 'DM Sans'}})
          .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            logo = workbook.addImage({
              base64: img.src,
              extension: "png",
            });
            logos.push({logo, width, height});
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
          });
    }
    worksheet.columns = [
      { header: "Job Number", key: "job_number", width: 10 },
      { header: "Job Date", key: "job_date", width: 10 },
      { header: "Address", key: "job_address", width: 40 },
      { header: "Container", key: "container", width: 30 },
      { header: "Customer Cost", key: "customer_cost", width: 15 },
      { header: "Ewc Code", key: "ewc_code", width: 10 },
      { header: "Tonnage", key: "diverted", width: 10 },
      { header: "CO2 emitted (KGS)", key: "em_co2e_value", width: 15 },
    ];
    worksheet.addRows(csvData);
    logos.map((img)=>{
      worksheet.addImage(img.logo, {
        tl: { col: 10, row: 1 },
        ext: { width: img.width, height: img.height },
      });
    })
    workbook.xlsx
      .writeBuffer()
      .then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `csv-report-${new Date().toLocaleDateString()}.xlsx`
        );
        setShowMore(false);
        setCsvLoading(false);
      })
      .catch(() => {
        setShowMore(false);
        setCsvLoading(false);
      });
  }

  async function reductioncsv() {
    setRedLoading(true);
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("Main sheet");
    worksheet.columns = [
      { header: "Site", key: "name", width: 20 },
      { header: "Baseline dumpsters", key: "dumpsters", width: 20 },
      { header: "Total dumpsters used", key: "total_dumpsters", width: 20 },
      { header: "Reduction in dumpsters", key: "reduction_in_dumpsters", width: 20 },
      { header: "Baseline transport emission", key: "base_transport_emission", width: 20 },
      { header: "Total transport emission", key: "total_transport_emission", width: 20 },
      { header: "Reduction transport emission", key: "reduction_transport_emission", width: 20 },
      { header: "Baseline waste emission", key: "baseline_waste_emission", width: 20 },
      { header: "Total waste emission produced", key: "total_waste_emission", width: 20 },
      { header: "Reduction in waste emission", key: "reduction_waste_emission", width: 20 },
      { header: "Reduction in waste emission by Up cycling", key: "reduction_waste_emission_upcycle", width: 20 },
      { header: "Total reduction in waste emission", key: "total_reduction_waste_emission", width: 20 },
      { header: "Reduction in cost", key: "reduction_in_cost", width: 20 }
    ];
    worksheet.addRows(reductionCSV);
    workbook.xlsx
        .writeBuffer()
        .then(function (buffer) {
          saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              `Reduction-report-${new Date().toLocaleDateString()}.xlsx`
          );
          setShowMore(false);
          setRedLoading(false);
        })
        .catch(() => {
          setShowMore(false);
          setRedLoading(false);
        });
  }

  useEffect(() => {
      setCsvData(
        state?.siteBreakdownList?.site_breakdown?.result.map((obj) => {
          obj.customer_cost = `${obj.customer_cost}`;
          return obj;
        }));
  }, [state, reports]);

  useEffect(() => {
    dispatch(getLandfillDiversionList({ sites: selected, date, currency }));
    dispatch(getSiteBreakdownlist({ sites: selected, date, currency }));
  }, [selected, date]);

  useEffect(()=> {
    setReductionCSV(state?.siteMovementsList?.data?.result);
  }, [state?.siteMovementsList?.data]);

  const exportPdf = async () => {
    setPdfLoading(true);
    var node = document.getElementById('pdf_download');
    var width = node.clientWidth;
    var height = node.clientHeight;
    await htmlToImage
        .toPng(node, {quality: 1, style: {fontFamily: 'DM Sans'}})
        .then(function (dataUrl) {
          const pdf = new jsPDF('p', 'px', [width, height]);
          pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
          pdf.save(`pdf-report-${new Date().toLocaleDateString()}.pdf`);
          setPdfLoading(false);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
          setPdfLoading(false);
        });
  }

  return (
    <>
      <div className="main-report">
        <ReportHeader
          setDate={setDate}
          sites={selected}
          handleChange={handleChange}
          selected={selected}
          setSelected={setSelected}
          currency={currency}
          setSiteCurrency={setSiteCurrency}
        />
        {/*<ReportFilters />*/}
        <div className="report-grid" id="pdf_download">
          <Masonry container columns={2} spacing={4}>
            <div className="report-chart-card-outer" id={"finance"}>
              <div className="report-card-title">Finance report</div>
              <FinanceReport
                date={date}
                sites={selected}
                showMore={showMore}
                siteCurrency={siteCurrency}
              />
            </div>
            <RebateReport
              date={date}
              sites={selected}
              showMore={showMore}
              siteCurrency={siteCurrency}
            />
            <div className="report-chart-card-outer" id={"emissions"}>
              <div className="report-card-title">Emissions</div>
              <EmissionReport
                dateM={date}
                sites={selected}
                startDate={startDate}
                setStartDate={setStartDate}
                showMore={showMore}
                siteCurrency={siteCurrency}
              />
            </div>
            <div className="report-chart-card-outer" id="waste_statistics">
              <div className="report-card-title">Waste breakdown</div>
              <Co2breakdownReport
                date={date}
                sites={selected}
                showMore={showMore}
                siteCurrency={siteCurrency}
              />
            </div>

            <div className="report-chart-card-outer" id="waste_segrigation">
              <div className="report-card-title">Waste Segregation</div>
              <WasteBreakDown
                  date={date}
                  sites={selected}
                  showMore={showMore}
                  siteCurrency={siteCurrency}
              />
            </div>
            {/*<div className="report-chart-card-outer">*/}
            {/*  <div className="report-card-title">Site Movements</div>*/}
            {/*  <SiteMovementsReport*/}
            {/*    date={date}*/}
            {/*    sites={selected}*/}
            {/*    showMore={showMore}*/}
            {/*    siteCurrency={siteCurrency}*/}
            {/*  />*/}
            {/*</div>*/}
          </Masonry>
          <Grid container spacing={4} style={{padding: '0px 16px'}}>
            <Grid item xs={12}>
              <div
                  className="report-chart-card-outer"
                  style={{ width: "100%" }}
              >
                <div className="report-card-title">Emissions avoided by recycling</div>
                <WasteEmissionGraph
                    dateM={date}
                    sites={selected}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    showMore={showMore}
                    siteCurrency={siteCurrency}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                  className="report-chart-card-outer"
                  style={{ width: "100%" }}
                  id={"utilization"}
              >
                <div className="report-card-title">Delivery Vs Utilization</div>
                <DualAxisGraph
                    dateM={date}
                    sites={selected}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    showMore={showMore}
                    siteCurrency={siteCurrency}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <ReportFooter
        reports={reports}
        sites={selected}
        csvLoading={csvLoading}
        pdfLoading={pdfLoading}
        redLoading={redLoading}
        date={date}
        exTest={exTest}
        csvData={csvData}
        reductionCsv={reductioncsv}
        exportPdf={exportPdf}
      />
    </>
  );
};
export default NewReports;
