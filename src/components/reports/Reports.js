import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSites } from "../../store/actions/sites.action";
import { getAllReports } from "../../store/actions/action.reports";
import { CircularProgress, MenuItem } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "./report.scss";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import DownLoadCSV from "./DownLoadCSV";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";


const Reports = (props) => {
  const { data } = props.allsites;
  const { reports, isLoading } = props.report;
  const [state, setState] = useState({
    reportType: [
      { reportId: 0, reportName: "Carbon footprint" },
      { reportId: 1, reportName: "Site movements" },
      { reportId: 2, reportName: "Waste report" },
      { reportId: 3, reportName: "Finance report" },
    ],
    report: "",
    site: "",
    show: false,
    startDate: "",
    endDate: "",
    isReportGenerated: false,
  });
  const [allReports, setAllReports] = useState([]);

  const {
    reportType,
    report,
    site,
    show,
    startDate,
    endDate,
    isReportGenerated,
  } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value, show: false });
  };

  useEffect(() => {
    async function fetchData() {
      if (!data) {
        await props.getSites();
      }
    }
    fetchData();
  }, []);

  
  const handleGenerateReport = () => {
    const rdata = {
      address_id: site,
      date: `${startDate},${endDate}`,
    };
    props.getReports(rdata);
    setTimeout(() => {
      setState({ ...state, show: true, isReportGenerated: true });
    }, 2000);
  };

  useEffect(() => {
    if (reports) {
      const newRow = {
        job_id: "",
        job_address: "",
        job_date: "",
        service_name: "",
        transaction_cost: reports.All_Transactions_Subtotal,
        first_name: "",
        last_name: "",
        EWC_Code: "Sub Total",
        WTN_Number: "",
        Disposal_Site: "",
        Tonnage: "",
        Diverted_Tonnage: "",
        Volume: "",
        Landfill_Diversion_Rate: "",
      };
      const totalData = reports.jobsRepost;
      totalData.push(newRow);
      setAllReports(totalData);
    }
  }, [isReportGenerated]);

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
        {allReports && allReports.length > 0 && !checkVisibility(state) && show  ? (
          <DownLoadCSV rdata={allReports} />
        ) : (
          ""
        )}
      </div>
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
