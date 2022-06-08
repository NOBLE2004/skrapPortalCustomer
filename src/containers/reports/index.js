import React, { useState } from "react";
import { Masonry } from "@mui/lab";
import "chart.js/auto";
import "./report.scss";
import {connect} from "react-redux";
import ReportHeader from "../../components/report/header";
import ReportFooter from "../../components/report/footer";
import FinanceReport from "../../components/report/reports/finance";
import EmissionReport from "../../components/report/reports/emission";
import Co2breakdownReport from "../../components/report/reports/co2breakdown";
import SiteMovementsReport from "../../components/report/reports/sitemovements";
import ReportFilters from "../../components/report/filters";

const NewReports = (props) => {
  const [selected, setSelected] = useState([]);
  const [reports, setReports] = useState({
    finance: false,
    site_movements: false,
    emissions: false,
    waste_statistics: false,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelected(value);
  };
  const handleChangeReportType = (event) => {
    const { name, value } = event.target;
    setReports({ ...reports, [name]: value });
  };
  return (
    <>
      <div className="main-report">
        <ReportHeader handleChange={handleChange} selected={selected}/>
        <ReportFilters />
        <div className="report-grid">
          <Masonry container columns={2} spacing={4}>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Finance report</div>
              <FinanceReport sites={selected} />
            </div>
            <div className="report-chart-card-outer">
              <div className="report-card-title">Emissions</div>
              <EmissionReport sites={selected} />
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
      <ReportFooter handleChangeReportType={handleChangeReportType}/>
    </>
  );
};
const mapStateToProps = ({ }) => {
  return { };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //getSites: () => dispatch(getSites()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewReports);

