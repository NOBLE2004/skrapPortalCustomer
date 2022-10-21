import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import React from "react";
import "./index.scss";

const ReportFooter = (props) => {
  const { handleChangeReportType, reports, exTest, sites, csvData } = props;
  return (
    <div className="report-footer">
      <div className="label">Select reports to download</div>
      <div className="content">
        <div className="content-item">
          <label htmlFor="finance">Finance</label>
          <Checkbox
            value={reports?.finance}
            checked={reports?.finance}
            name="finance"
            id="finance"
            onChange={handleChangeReportType}
          />
        </div>
        <div className="content-item">
          <label htmlFor="site_movements">Site movements</label>
          <Checkbox
            value={reports.site_movements}
            checked={reports?.site_movements}
            name="site_movements"
            id="site_movements"
            onChange={handleChangeReportType}
          />
        </div>
        <div className="content-item">
          <label htmlFor="emissions">Emissions</label>
          <Checkbox
            value={reports.emissions}
            checked={reports?.emissions}
            name="emissions"
            id="emissions"
            onChange={handleChangeReportType}
          />
        </div>
        <div className="content-item">
          <label htmlFor="waste_statistics">Waste Statistics</label>
          <Checkbox
            value={reports.waste_statistics}
            checked={reports?.waste_statistics}
            name="waste_statistics"
            id="waste_statistics"
            onChange={handleChangeReportType}
          />
        </div>
      </div>

      <Button
        classes="footer-btn"
        disabled={csvData?.length === 0}
        onClick={() => {
          exTest();
        }}
      >
        Download CSV
      </Button>
    </div>
  );
};
export default ReportFooter;
