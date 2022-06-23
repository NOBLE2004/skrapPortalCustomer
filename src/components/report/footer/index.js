import Checkbox from "@mui/material/Checkbox";
import {Button} from "@mui/material";
import React from "react";
import './index.scss';

const ReportFooter = (props) => {
    const {handleChangeReportType} = props;
    return (
        <div className="report-footer">
            <div className="label">Select reports to download</div>
            <div className="content">
                <div className="content-item">
                    <label htmlFor="finance">Finance</label>
                    <Checkbox
                        name="finance"
                        id="finance"
                        onChange={handleChangeReportType}
                    />
                </div>
                <div className="content-item">
                    <label htmlFor="site_movements">Site movements</label>
                    <Checkbox
                        name="site_movements"
                        id="site_movements"
                        onChange={handleChangeReportType}
                    />
                </div>
                <div className="content-item">
                    <label htmlFor="emissions">Emissions</label>
                    <Checkbox
                        name="emissions"
                        id="emissions"
                        onChange={handleChangeReportType}
                    />
                </div>
                <div className="content-item">
                    <label htmlFor="waste_statistics">Waste Statistics</label>
                    <Checkbox
                        name="waste_statistics"
                        id="waste_statistics"
                        onChange={handleChangeReportType}
                    />
                </div>
            </div>
            <Button classes="footer-btn">Download CSV</Button>
        </div>
    );
};
export default ReportFooter;
