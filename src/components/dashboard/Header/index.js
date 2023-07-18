/* eslint-disable react-hooks/exhaustive-deps */
import {Grid, OutlinedInput, Select, Switch} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, {useEffect, useState} from "react";
import {getSites} from "../../../store/actions/sites.action";
import {getJobsMeta} from "../../../store/actions/action.jobsMeta";
import {connect, useDispatch} from "react-redux";
import {makeStyles} from "@mui/styles";
import {FadeLoader, ClipLoader} from "react-spinners";
import {DateRangePicker} from "react-date-range";
import "./index.scss";
import reportsService from "../../../services/reports.service";
import {ArrowDownwardRounded, ArrowDropDown} from "@mui/icons-material";

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

const DashboardHeader = (props) => {
    const currency = localStorage.getItem("currency");
    const dispatch = useDispatch();
    const {handleChange, selected, sites, setSiteCurrency, setSelected} = props;
    const classes = useStyles();
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const handleStatement = () => {
        console.log(toggle)
        setToggle(!toggle);
    };
    useEffect(() => {
        async function fetchData() {
            if (!props.allsites.data) {
                await props.getSites({currency});
            }
        }

        fetchData();
    }, []);

    const handleDate = (item) => {
        setState([item.selection]);
        const start = item.selection.startDate.toISOString().split("T")[0];
        const end = item.selection.endDate.toISOString().split("T")[0];
        if (start === end) {
            console.log({date: `${start},${end}`});
        } else {
            console.log({date: `${start},${end}`});
            setToggle(false);
        }
        props.setDate(`${start},${end}`);
    };

    return (
            <Grid item lg={5} md={12}>
                <div className="report-header-card first">
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
                            setSiteCurrency(filterSite?.currency_symbol);
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
                </div>
                <div className="report-header-card first">
                    <div className="date-filter">
                        <div className="left-text" onClick={handleStatement}>
                            <span className="small-text">Filter By : </span> <span className="lg-text" style={{paddingLeft: '15px'}}> Date </span> <ArrowDropDown/>
                        </div>
                        <div className="right-text">
                            <h1>{`${currency?currency:'£'}${props.totalSpend ? props.totalSpend : "00.00"}`}</h1>
                        <span className="primary-title"> Total Spend </span>
                        </div>
                    </div>
                    {toggle && (
                        <DateRangePicker
                            editableDateInputs={false}
                            moveRangeOnFirstSelection={false}
                            direction="horizontal"
                            onChange={handleDate}
                            ranges={state}
                        />
                    )}
                </div>
            </Grid>
    );
};
const mapStateToProps = ({allsites, totalSites}) => {
    return {allsites, totalSites};
};
const mapDispatchToProps = (dispatch) => {
    return {
        getSites: (filters) => dispatch(getSites(filters)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
