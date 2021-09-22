import React, {useEffect, useState} from "react";
import JobDetail from "../../components/jobsDetail/JobDetail";
import JobDetailHeader from "../../components/jobsDetail/jobHeader/JobDetailHeader";
import { Grid } from "@material-ui/core";
import DriverDetail from "../../components/driver/DriverDetail";
import FindPostCode from "../../components/jobsDetail/findPostCode/FindPostCode";
import PaymentDetail from "../../components/jobsDetail/paymentDetail/PaymentDetail";
import SmallCard from "../../components/jobsDetail/smallCard/SmallCard";
import JobNotes from "../../components/jobsDetail/jobNote/JobNotes";
import JobStatus from "../../components/jobsDetail/jobStatus";
import JobService from '../../services/job.service';
import { useHistory, useParams } from "react-router-dom";

const MainJobDetail = () => {
    let { id } = useParams();
    const history = useHistory();
    const [job, setJob] = useState({});
    const [update, setUpdate] = useState(false);
    useEffect(()=>{
        JobService.show({job_id: id})
            .then((response) => {
                if(response.data.result.length > 0){
                    setJob(response.data.result[0]);
                }else{
                    setJob({});
                }
            }).catch((error)=>{
            console.log(error)
        });
    }, [update]);

const redirectBack = () =>{
    history.goBack();
};

  return (
    <>
      <JobDetailHeader job={job} redirectBack={redirectBack}/>
      <Grid container spacing={3}>
        <Grid item md={7}>
          <JobDetail job={job} />
          <FindPostCode lat={parseFloat(job?.latitude)} lng={parseFloat(job?.longitude)}/>
          <PaymentDetail job={job} updateJobs={()=>{setUpdate(!update)}}/>

          <JobStatus status={job?.appointment_status} />
          <JobNotes comments={job?.comments}/>
        </Grid>
        <Grid item md={5}>
            {job?.driver_number && <DriverDetail job={job}/>}
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

export default MainJobDetail;
