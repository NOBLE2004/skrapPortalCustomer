import React from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import SitesItem from "../../components/sites/sitesItem/SitesItem";
import { Grid } from "@material-ui/core";
import BookSite from "../../components/modals/bookSite/BookSite"
import "./sites.scss";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../../components/commonComponent/commonfilter/CommonFilter";

const Sites = () => {
  const [isSiteBooked , setSiteBooked] = React.useState(false)

  const handleBookSite = () => {
    setSiteBooked(true)
  }
  return (
    <>
      <CommonHeader isMap={true} handleBookJob={handleBookSite}>
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
        <div className="common-search-for-tables">
            <CommonSearch cname="sites" handleChangeSearch={()=>{}}/>
            <CommonFilter cname="sites" />
        </div>
      <Grid container>
        <Grid item md={10}>
          <SitesItem />
        </Grid>
        <Grid item md={2} style={{marginTop:"87px"}}>
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "194px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "16px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "194px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "16px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "194px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "16px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "194px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "16px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "194px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "16px"
            }}
          />
           <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "194px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "16px"
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Sales By Site",
              price: "£7,142.00",
              statusName: "primary",
              width: "194px",
              height: "62px",
              fontSize : "sales",
              marginBottom: "16px"
            }}
          />
        </Grid>
      </Grid>

      {
        isSiteBooked && <BookSite handleClose={() => setSiteBooked(!isSiteBooked)} />
      }
    </>
  );
};

export default Sites;
