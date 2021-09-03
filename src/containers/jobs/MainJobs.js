import React from "react";
import CommonFilter from "../../components/commonComponent/commonfilter/CommonFilter";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import JobsTable from "../../components/reactTable/JobsTable"
const MainJobs = () => {
  return (
    <div>
      <CommonHeader bookSite={"Book Job"}>
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
            status: "Pending",
            price: "4",
            statusName: "pending",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Completed",
            price: "4",
            statusName: "completed",
            width: "115px",
            height: "84px",
          }}
        />
      </CommonHeader>  
      <JobsTable /> 
    </div>
  );
};

export default MainJobs;
