import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSites } from "../../store/actions/sites.action";
import { MenuItem } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { colors } from "@material-ui/core";
import "./report.scss";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { InputLabel } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { FormControl } from "@material-ui/core";

const materialTheme = createTheme({
  palette: {
    primary: colors.blue,
  },
});

const Reports = (props) => {
  const { data } = props.allsites;
  const [state, setState] = useState({
    reportType: [
      { reportId: 0, reportName: "Carbon footprint" },
      { reportId: 1, reportName: "Site movements" },
      { reportId: 2, reportName: "Waste report" },
      { reportId: 3, reportName: "Finance report" },
    ],
    report: "",
    startSelectedDate: new Date(),
    site: "",
  });
  const { reportType, report, startSelectedDate, site } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    async function fetchData() {
      if (!data) {
        await props.getSites();
      }
    }
    fetchData();
  }, []);

  const handleStartDateChange = (date) => {
    setState({ ...state, startSelectedDate: date });
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
            <KeyboardDatePicker
              margin="dense"
              inputVariant="outlined"
              format="MM/dd/yyyy"
              value={startSelectedDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              className="report-date"
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
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
      </div>
    </div>
  );
};

const mapStateToProps = ({ allsites }) => {
  return { allsites };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSites: () => dispatch(getSites()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
