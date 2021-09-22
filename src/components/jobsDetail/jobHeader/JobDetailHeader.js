import React, {useState} from "react";
import "./jobDetailHeader.scss";
import JobService from "../../../services/job.service";
import { useHistory } from "react-router-dom";

const JobDetailHeader = ({job, redirectBack}) => {
    const history = useHistory();
    const [state, setState] = useState({
        notice: null,
        isLoading: false,
    });
    const cancelJob = () => {
        const data = {
            appointment_id: job?.appointment_id,
            user_id: job?.customer_user_id,
            cancel_reason: "",
            is_fee: 0,
            type: 1,
        };
        JobService.cancel(data).then((response) => {
            if (response.data.code === 0) {
                setState({
                    ...state,
                    isLoading: false,
                    notice: {
                        type: "success",
                        text: response.data.description,
                    },
                });
                setTimeout(() => {
                    history.push({ pathname: "/jobs" });
                }, 2000);
            } else {
                setState({
                    ...state,
                    isLoading: false,
                    notice: {
                        type: "error",
                        text: response.data.description,
                    },
                });
                setTimeout(() => {
                    setState({
                        ...state,
                        notice: null,
                    });
                }, 2000);
            }
        });
    };
  return (
    <div className="jobdetail-header-main">
      <div className="sites-header-title">Job: <span>SK{job?.job_id}</span></div>
      <div className="common-header-links-main">
        <div className="header-link" onClick={redirectBack}>{"Back to all Jobs"}</div>
        <button className="header-btn" onClick={cancelJob}>{"Cancel Job"}</button>
      </div>
    </div>
  );
};

export default JobDetailHeader;
