import { OutlinedInput, Select, Switch } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect } from "react";
import { getSites } from "../../../store/actions/sites.action";
import { getJobsMeta } from "../../../store/actions/action.jobsMeta";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import FadeLoader from "react-spinners/FadeLoader";
import "./index.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      padding: "0%",
      borderRadius: "16px",
    },
  },
};
const useStyles = makeStyles((theme) => ({
  selected: {},
  rootMenuItem: {
    margin: "2% !important",
    padding: "2% !important",
    "&$selected": {
      background: `linear-gradient(135deg, #76CCF8 27.99%, #518EF8 68.87%, #4981F8 77.07%)`,
      borderRadius: "8px",
      color: "white",
    },
  },
}));

const ReportHeader = (props) => {
  const dispatch = useDispatch();
  const { handleChange, selected, sites } = props;
  const classes = useStyles();
  useEffect(() => {
    async function fetchData() {
      if (!props.allsites.data) {
        await props.getSites();
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getJobsMeta({ sites: sites }));
  }, [sites]);

  return (
    <div className="report-header">
      <div className="report-grid-header">
        <div className="report-header-card first">
          <div className="text">
            <span>Management Reporting</span>
          </div>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple={true}
            value={selected}
            displayEmpty
            onChange={handleChange}
            input={
              <OutlinedInput
                notched={false}
                notchedOutline={false}
                label="Name"
              />
            }
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Sites</em>;
              }
              return (
                selected.length > 0 && (
                  <div className="text-sec">
                    Viewing: Multiple sites{" "}
                    <span>
                      {selected.length} of {props.allsites.data.length} sites
                    </span>
                  </div>
                )
              );
            }}
          >
            {props.allsites.data &&
              props.allsites?.data.map((site, index) => (
                <MenuItem
                  classes={{
                    selected: classes.selected,
                    root: classes.rootMenuItem,
                  }}
                  key={index}
                  value={site.address_id}
                  //style={getStyles(name, personName, theme)}
                >
                  {site.job_address}
                </MenuItem>
              ))}
          </Select>
        </div>
      </div>
      <div
        className={
          props?.totalSites?.isLoading
            ? "report-grid-header justify-center"
            : "report-grid-header"
        }
      >
        {props?.totalSites?.isLoading ? (
          <div className="d-flex justify-center align-center">
            <FadeLoader
              color={"#29a7df"}
              loading={props?.totalSites?.isLoading}
              width={4}
            />
          </div>
        ) : (
          <>
            <div className="report-header-card">
              <div className="text">
                <span>{props?.totalSites?.data?.result?.sites}</span> Sites
              </div>
            </div>
            <div className="report-header-card">
              <div className="text">
                <span>{props?.totalSites?.data?.result?.total_jobs}</span>{" "}
                Bookings complete
              </div>
            </div>
            <div className="report-header-card">
              <div className="text">
                <span>{props?.totalSites?.data?.result?.hires}</span> Hire Types
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ allsites, totalSites }) => {
  return { allsites, totalSites };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSites: () => dispatch(getSites()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportHeader);
