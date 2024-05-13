import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import React from "react";
import "./index.scss";
import {getUserDataFromLocalStorage} from "../../../services/utils";
import LoadingButton from "@mui/lab/LoadingButton";

const ReportFooter = (props) => {
  const data = getUserDataFromLocalStorage();
  console.log(data);
  const { reports, exTest, sites, csvData, exportPdf, reductionCsv, redLoading, pdfLoading, csvLoading } = props;
  return (
    <div className="report-footer">
      {/*<div className="label">Select reports to download</div>*/}
      {/*<div className="content">*/}
      {/*  <div className="content-item">*/}
      {/*    <label htmlFor="finance">Finance</label>*/}
      {/*    <Checkbox*/}
      {/*      value={reports?.finance}*/}
      {/*      checked={reports?.finance}*/}
      {/*      name="finance"*/}
      {/*      id="finance"*/}
      {/*      onChange={handleChangeReportType}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="content-item">*/}
      {/*    <label htmlFor="site_movements">Site movements</label>*/}
      {/*    <Checkbox*/}
      {/*      value={reports.site_movements}*/}
      {/*      checked={reports?.site_movements}*/}
      {/*      name="site_movements"*/}
      {/*      id="site_movements"*/}
      {/*      onChange={handleChangeReportType}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="content-item">*/}
      {/*    <label htmlFor="emissions">Emissions</label>*/}
      {/*    <Checkbox*/}
      {/*      value={reports.emissions}*/}
      {/*      checked={reports?.emissions}*/}
      {/*      name="emissions"*/}
      {/*      id="emissions"*/}
      {/*      onChange={handleChangeReportType}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="content-item">*/}
      {/*    <label htmlFor="waste_statistics">Waste Statistics</label>*/}
      {/*    <Checkbox*/}
      {/*      value={reports.waste_statistics}*/}
      {/*      checked={reports?.waste_statistics}*/}
      {/*      name="waste_statistics"*/}
      {/*      id="waste_statistics"*/}
      {/*      onChange={handleChangeReportType}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
        <LoadingButton
            classes="footer-btn"
            onClick={() => {
                exportPdf();
            }}
            loading={pdfLoading}
        >
            Download PDF
        </LoadingButton>
        <LoadingButton
        classes="footer-btn"
        disabled={
          sites?.length > 1 
          || sites?.length === 0 
          || csvData?.length === 0
        }
        style={{marginLeft: '1%'}}
        onClick={() => {
          exTest();
        }}
        loading={csvLoading}
      >
        Download CSV
        </LoadingButton>

        {data?.company?.includes('Amazon') && <LoadingButton
          classes="footer-btn"
          style={{marginLeft: '1%'}}
          onClick={() => {
            reductionCsv();
          }}
          loading={redLoading}
      >
          Reduction Report
      </LoadingButton>}
    </div>
  );
};
export default ReportFooter;
