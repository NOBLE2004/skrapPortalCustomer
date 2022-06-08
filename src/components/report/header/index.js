import {OutlinedInput, Select, Switch} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, {useEffect} from "react";
import {getSites} from "../../../store/actions/sites.action";
import {connect} from "react-redux";
import {makeStyles} from "@mui/styles";
import './index.scss';

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

const ReportHeader = (props) =>{
    const { handleChange, selected } = props;
    const classes = useStyles();
    useEffect(() => {
        async function fetchData() {
            if (!props.allsites.data) {
                await props.getSites();
            }
        }

        fetchData();
    }, []);
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
                            return selected.length > 0 && (
                                <div className="text-sec">
                                    Viewing: Multiple sites{" "}
                                    <span>
                        {selected.length} of {props.allsites.data.length} sites
                      </span>
                                </div>
                            );
                        }}
                    >
                        {props.allsites.data && props.allsites?.data.map((site, index) => (
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
            <div className="report-grid-header">
                <div className="report-header-card">
                    <div className="text">
                        <span>6</span> Sites
                    </div>
                </div>
                <div className="report-header-card">
                    <div className="text">
                        <span>64</span> Bookings complete
                    </div>
                </div>
                <div className="report-header-card">
                    <div className="text">
                        <span>5</span> Hire Types
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = ({ allsites }) => {
    return { allsites };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getSites: () => dispatch(getSites()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportHeader);
