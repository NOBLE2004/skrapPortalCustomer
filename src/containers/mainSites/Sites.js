import React from "react";
import CommonFilter from "../../components/commonComponent/commonfilter/CommonFilter";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import SitesItem from "../../components/sites/sitesItem/SitesItem";
import { Grid } from "@material-ui/core";
import "./sites.scss";

const Sites = () => {
  return (
    <>
      <CommonHeader>
        <CommonJobStatus
          jobStatus={{
            status: "Sales",
            price: "£7,142.00",
            statusName: "primary",
            width: "184px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Jobs",
            price: "10",
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Sites",
            price: "8",
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
      </CommonHeader>
      <Grid container>
        <Grid item md={10}>
          <div className="filter-outer">
            <CommonSearch />
            
          </div>
          <SitesItem />
        </Grid>
        <Grid item md={2} style={{marginTop:"82px"}}>
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "219px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "20px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "219px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "20px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "219px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "20px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "219px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "20px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "219px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "20px"
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Sites;
