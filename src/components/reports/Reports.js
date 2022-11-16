import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSites } from "../../store/actions/sites.action";
import { getAllReports } from "../../store/actions/action.reports";
import { CircularProgress, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Button, Grid } from "@mui/material";
import ReportTable from "../reports/ReportTable";
import "./report.scss";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import DownLoadCSV from "./DownLoadCSV";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

const Reports = (props) => {
  const { data } = props.allsites;
  const currency = localStorage.getItem("currency");

  const { reports, isLoading, error } = props.report;
  const [state, setState] = useState({
    reportType: [
      { reportId: "Carbon_footprint", reportName: "Carbon footprint" },
      { reportId: "Site_movements", reportName: "Site movements" },
      { reportId: "Waste_report", reportName: "Waste report" },
      { reportId: "Finance_report", reportName: "Finance report" },
    ],
    report: "",
    site: "",
    show: false,
    startDate: moment(new Date()).format("Y-MM-DD"),
    endDate: moment(new Date()).format("Y-MM-DD"),
    isReportGenerated: false,
  });

  const { reportType, report, site, show, startDate, endDate } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value, show: false, allReports: null });
  };

  useEffect(() => {
    async function fetchData() {
      if (!data) {
        await props.getSites();
      }
    }
    fetchData();
  }, []);

  const handleGenerateReport = async () => {
    const rdata = {
      report,
      address_id: site,
      date: `${startDate},${endDate}`,
    };
    await props.getReports(rdata);

    setState({ ...state, show: true });
  };

  const checkVisibility = (abc) => {
    if ((abc.site === undefined) | (abc.site === "")) {
      return true;
    }
    if ((abc.report === undefined) | (abc.report === "")) {
      return true;
    }

    return false;
  };

  const handleEvent = (event, picker) => {
    console.log(picker.startDate);
  };

  const handleDateCallback = (start, end) => {
    setState({
      ...state,
      startDate: moment(start._d).format("Y-MM-DD"),
      endDate: moment(end._d).format("Y-MM-DD"),
    });
  };

  const handleReset = () => {
    setState({
      ...state,
      report: "",
      site: "",
      show: false,
      isReportGenerated: false,
    });
  };

  let lastCalculatedReport = null;
  if (report === "Site_movements") {
    lastCalculatedReport =
      reports && reports.length > 0
        ? `${currency?currency:'£'}${reports.slice(-1)[0].transaction_cost}`
        : "n/a";
  } else if (report === "Carbon_footprint") {
    lastCalculatedReport =
      reports && reports.length > 0 && reports.slice(-1)[0].WTN_Number;
  }

  return (
    <div className="reports-component">
      <div className="reports-filter">
        <FormControl variant="outlined" margin="dense">
          <InputLabel>reports</InputLabel>
          <Select
            name="report"
            value={report}
            onChange={handleChange}
            className="reports"
            label="report"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {reportType.map((rpt) => {
              return (
                <MenuItem value={rpt.reportId} key={rpt.reportId}>
                  {rpt.reportName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <DateRangePicker
          className="date-range-picker"
          onCallback={handleDateCallback}
          onEvent={handleEvent}
          initialSettings={{ startDate: new Date(), endDate: new Date() }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Select Date"
          />
        </DateRangePicker>
        <FormControl variant="outlined" margin="dense">
          <InputLabel>site</InputLabel>
          <Select
            name="site"
            value={site}
            onChange={handleChange}
            className="sites"
            label="sites"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data &&
              data.map((site) => {
                return (
                  <MenuItem value={site.address_id} key={site.address_id}>
                    {site.job_address}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          disabled={checkVisibility(state)}
          className={
            checkVisibility(state)
              ? "generate-report-disable"
              : "generate-report"
          }
          onClick={handleGenerateReport}
        >
          Generate Reports
          {isLoading && <CircularProgress />}
        </Button>
      </div>
      <div className="download-reports">
        {reports && reports.length > 0 && !checkVisibility(state) && show ? (
          <div className="actions">
            <DownLoadCSV rdata={reports} />
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        ) : (
          show && error && <div>No Match Found!</div>
        )}
      </div>
      {reports && reports.length > 0 && !checkVisibility(state) && show && (
        <Grid container className="sites-table-loader">
          <Grid item md={12}>
            <ReportTable
              data={reports ? reports.slice(0, -1) : []}
              lastCalculatedReport={lastCalculatedReport}
              reportType={report}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = ({ allsites, report }) => {
  return { allsites, report };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSites: () => dispatch(getSites()),
    getReports: (data) => dispatch(getAllReports(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
