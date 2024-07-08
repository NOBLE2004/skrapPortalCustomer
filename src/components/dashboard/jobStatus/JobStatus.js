import React from "react";
import { Paper, Grid, Box } from "@mui/material";
import "./jobStatus.scss";
import UnionIcon from "../../../assets/images/Union.svg"
import LocationIcon from "../../../assets/images/LocationDb.svg"
import VectorCheck from "../../../assets/images/VectorDb.svg"
import FilterCard from "../cardFilter";
import { ScaleOutlined } from "@mui/icons-material";

const JobStatus = (props) => {
    const { totalSpend, jobStatus } = props
    const currency = localStorage.getItem("currency");

    return (
        <Grid item container spacing={1} justifyContent={"space-between"}>
            <Grid item lg={3.4} md={4} xs={6}>
                <Paper className="box">
                    <Box>
                        <FilterCard />
                    </Box>
                    <h1 style={{ color: "#60A0F8" }}>{`${currency ? currency : "£"}${totalSpend ? totalSpend : "00.00"
                        }`}</h1>
                    <span style={{ color: "#60A0F8" }}>Total spent</span>
                </Paper>
            </Grid>
            <Grid item lg={2.1} md={4} xs={6}>
                <Paper className="box">
                    <div className="img-main">
                        <img src={UnionIcon} alt="" />
                    </div>
                    <h1>{jobStatus.NumberOfJobs}</h1>
                    <span>Total<br />Bookings</span>
                </Paper>
            </Grid>
            <Grid item lg={2.1} md={4} xs={6}>
                <Paper className="box">
                    <div className="img-main">
                        <img src={LocationIcon} alt="" />
                    </div>
                    <h1>{jobStatus.Delivered}</h1>
                    <span>Total<br />Delivered</span>
                </Paper>
            </Grid>
            <Grid item lg={2.1} md={4} xs={6}>
                <Paper className="box">
                    <div className="img-main">
                        <img src={VectorCheck} alt="" />
                    </div>
                    <h1>{jobStatus.Completed}</h1>
                    <span>Total<br />Completed</span>
                </Paper>
            </Grid>
            <Grid item lg={2.1} md={4} xs={6}>
                <div className="box">
                    <div className="img-main">
                        <ScaleOutlined sx={{ color: "#60a0f8", fontSize: "16px" }} />
                    </div>
                    <h1>{parseFloat(jobStatus.TotalTonnage).toFixed(2).toLocaleString()}<label style={{ fontSize: '20px', marginTop: '4%', lineHeight: '20px' }}>tn</label></h1>
                    <span>Total<br />Weight</span>
                </div>
            </Grid>
            {/* <Grid item lg={2.1} md={4} xs={6}>
                <div className="box">
                    <h1>{parseFloat(jobStatus.TotalCo2 > 500 ? jobStatus.TotalCo2 / 1000 : jobStatus.TotalCo2).toFixed(2).toLocaleString()}<label style={{ fontSize: '20px', marginTop: '4%', lineHeight: '20px' }}>{jobStatus.TotalCo2 > 500 ? 'tn' : 'kg'}</label></h1>
                    <span>Total<br />Co2</span>
                </div>
            </Grid> */}
        </Grid>
    );
};

export default JobStatus;
