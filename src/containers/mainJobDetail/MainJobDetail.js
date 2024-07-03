import React, { useEffect, useState } from "react";
import JobDetail from "../../components/jobsDetail/JobDetail";
import JobDetailHeader from "../../components/jobsDetail/jobHeader/JobDetailHeader";
import { Grid } from "@mui/material";
import DriverDetail from "../../components/driver/DriverDetail";
import FindPostCode from "../../components/jobsDetail/findPostCode/FindPostCode";
import PaymentDetail from "../../components/jobsDetail/paymentDetail/PaymentDetail";
import SmallCard from "../../components/jobsDetail/smallCard/SmallCard";
import JobNotes from "../../components/jobsDetail/jobNote/JobNotes";
import JobStatus from "../../components/jobsDetail/jobStatus";
import JobService from "../../services/job.service";
import { useHistory, useParams } from "react-router-dom";
import { getJob } from "../../store/actions/jobs.action";
import FadeLoader from "react-spinners/FadeLoader";
import { connect } from "react-redux";
import DrawerComponent from "../../components/pledgeComponents/drawerComponent";

const MainJobDetail = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const { job, isLoading, error } = props.jobs;
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await props.getJob({ job_id: id });
    }
    fetchData();
  }, [update]);

  const redirectBack = () => {
    history.goBack();
  };

  return (
    <>
      <JobDetailHeader job={job} redirectBack={redirectBack} />
      <Grid container spacing={3}>
        <Grid item md={7}>
          <JobDetail job={job} />
          <FindPostCode
            lat={parseFloat(job?.latitude)}
            lng={parseFloat(job?.longitude)}
          />
          <PaymentDetail
            job={job}
            updateJobs={() => {
              setUpdate(!update);
            }}
          />

          <JobStatus status={job?.appointment_status} />
          <JobNotes comments={job?.comments} />
        </Grid>
        <Grid item md={5}>
          {job?.co2 != null &&
            <DrawerComponent showDrawer={{
              row: {
                job_id: id
              }
            }} icon={false} />
          }
          setShowCo={() => {}}
          {job?.driver_id && <DriverDetail job={job} />}
          {/* <SmallCard />*/}
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

const mapStateToProps = ({ jobs }) => {
  return { jobs };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getJob: (data) => dispatch(getJob(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainJobDetail);
