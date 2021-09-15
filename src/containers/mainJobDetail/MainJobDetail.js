import React from "react";
import JobDetail from "../../components/jobsDetail/JobDetail";
import JobDetailHeader from "../../components/jobsDetail/jobHeader/JobDetailHeader";
import { Grid } from "@material-ui/core";
import ManagerDetail from "../../components/siteManager/managerDetail/ManagerDetail";
import DriverDetail from "../../components/driver/DriverDetail";
import FindPostCode from "../../components/jobsDetail/findPostCode/FindPostCode";
import PaymentDetail from "../../components/jobsDetail/paymentDetail/PaymentDetail";
import SmallCard from "../../components/jobsDetail/smallCard/SmallCard";
import JobNotes from "../../components/jobsDetail/jobNote/JobNotes";
import JobStatus from "../../components/jobsDetail/jobStatus";
import { chatIcon } from "../../assets/images";
import ChatWidget from "../../components/commonComponent/chatWidget/ChatWidget";
const MainJobDetail = () => {
  return (
    <>
      <JobDetailHeader />
      <Grid container spacing={3}>
        <Grid item md={7}>
          <JobDetail />
          <FindPostCode />
          <PaymentDetail />

          <JobStatus />
          <JobNotes />
        </Grid>
        <Grid item md={5}>
          <DriverDetail />
          <SmallCard />
        </Grid>
      </Grid>

      <Grid container>
        {/* <Grid item md={12} style={{textAlign:"right" , cursor:"pointer"}}>
         <img src={chatIcon} alt="chat-icon"/>
        </Grid> */}
        {/* <Grid item md={12}>
          <ChatWidget />
        </Grid> */}
      </Grid>
    </>
  );
};

export default MainJobDetail;
