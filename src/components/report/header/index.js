/* eslint-disable react-hooks/exhaustive-deps */
import { OutlinedInput, Select, Switch } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { getSites } from "../../../store/actions/sites.action";
import { getJobsMeta } from "../../../store/actions/action.jobsMeta";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { FadeLoader, ClipLoader } from "react-spinners";
import { DateRangePicker } from "react-date-range";
import "./index.scss";
import reportsService from "../../../services/reports.service";
import { downloadSite } from "../../../assets/images";
import { ArrowDropDown } from "@mui/icons-material";
import RangeDatePicker from "../../RangePicker/index";
import moment from "moment";

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
  const {
    handleChange,
    selected,
    sites,
    setSiteCurrency,
    setSelected,
    currency,
  } = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      //if (!props.allsites.data) {
      //console.log('currency', {currency});
      await props.getSites({ currency });
      //}
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (props?.allsites?.data) {
  //     setSelected(props?.allsites?.data?.[0]?.address_id);
  //   }
  // }, [props.allsites.data]);

  useEffect(() => {
    // if (sites !== "") {
    dispatch(getJobsMeta({ sites: sites, currency }));
    // }
  }, [sites, currency]);

  const handleDateFull = (item) => {
    setState([item.selection]);
  };

  const handleDate = (item) => {
    setState([item.selection]);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElDate, setAnchorElDate] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickDate = (event) => {
    setAnchorElDate(event.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOk = () => {
    const newStartDate = moment(state?.[0]?.startDate).format("DD-MM-YYYY");
    const newEndDate = moment(state?.[0]?.endDate).format("DD-MM-YYYY");
    setLoading(true);
    reportsService
      .getAccountStatement({ from: newStartDate, to: newEndDate })
      .then((response) => {
        if (response.data.code == 0) {
          window.open(response.data.result.Url, "_blank");
          setLoading(false);
          handleClose();
        } else {
          alert(response.data.description);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        handleClose();
      });
  };

  const handleOkDate = () => {
    const newStartDate = moment(state?.[0]?.startDate).format("DD-MM-YYYY");
    const newEndDate = moment(state?.[0]?.endDate).format("DD-MM-YYYY");
    props.setDate(`${newStartDate},${newEndDate}`);
    handleCloseDate();
  };

  return (
    <div className="report-header">
      <div
        className="report-grid-header"
        style={{ width: "50%", justifyContent: "flex-start" }}
      >
        <div className="report-header-card first">
          <div className="text" style={{ width: "20%" }}>
            <span>Reporting</span>
          </div>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selected}
            displayEmpty
            multiple
            onChange={(e) => {
              handleChange(e);
              const filterSite = props.allsites.data?.find(
                (x) => x.address_id === e.target.value
              );
              //setSiteCurrency(filterSite?.currency_symbol);
            }}
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
          <div
            className="report-header-card"
            style={{ width: "40%", justifyContent: "flex-start" }}
          >
            <div
              className="text"
              style={{ fontSize: "14px", cursor: "pointer" }}
            >
              <label
                onClick={handleClickDate}
                style={{ fontWeight: "lighter" }}
              >
                {" "}
                Filter By :{" "}
              </label>{" "}
              <span onClick={handleClickDate}> Date </span>{" "}
              <RangeDatePicker
                anchorEl={anchorElDate}
                handleClose={() => {
                  handleCloseDate();
                }}
                handleOk={() => {
                  handleOkDate();
                }}
                onChange={handleDateFull}
                name="si_date"
                dateState={state}
              />
              <ArrowDropDown onClick={handleClickDate} />
              <label
                style={{ cursor: "pointer" }}
                onClick={() => props.setDate(null)}
              >
                reset
              </label>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ width: "50%" }}
        className={
          props?.totalSites?.isLoading
            ? "report-grid-header justify-center"
            : "report-grid-header"
        }
      >
        {props?.totalSites?.isLoading ? (
          <div className="d-flex justify-center align-center">
            <FadeLoader
              color={"#518ef8"}
              loading={props?.totalSites?.isLoading}
              width={4}
            />
          </div>
        ) : (
          <>
            <div className="report-header-card">
              <div
                onClick={handleClick}
                className="text"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                Financial Statement{" "}
                {!loading ? (
                  <img
                    src={downloadSite}
                    alt="download-icon"
                    style={{ marginLeft: "5px" }}
                  />
                ) : (
                  <ClipLoader
                    color={"#518ef8"}
                    loading={true}
                    width={5}
                    size={20}
                  />
                )}
              </div>
              <RangeDatePicker
                anchorEl={anchorEl}
                handleClose={() => {
                  handleClose();
                }}
                handleOk={() => {
                  handleOk();
                }}
                onChange={handleDate}
                name="si_date"
                dateState={state}
              />
            </div>
            <div className="report-header-card">
              <div className="text">
                <span>{props?.totalSites?.data?.result?.sites} </span> Sites
              </div>
            </div>
            <div className="report-header-card">
              <div className="text">
                <span>{props?.totalSites?.data?.result?.total_jobs} </span>{" "}
                Bookings complete
              </div>
            </div>
            <div className="report-header-card">
              <div className="text">
                <span>{props?.totalSites?.data?.result?.hires} </span> Hire
                Types
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
    getSites: (filters) => dispatch(getSites(filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportHeader);
