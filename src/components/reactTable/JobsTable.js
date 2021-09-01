import React from "react";
import Table from "./Table";
import { jobsTableData } from "../../environment";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import CommonFilter from "../commonComponent/commonfilter/CommonFilter";

const JobsTable = () => {
  const handleButtonClick = (e , row)=>{
    console.log('row click',row)
  }
  const columns = React.useMemo(
    () => [
      {
        Header: "Order #",
        accessor: "name",
      },
      {
        Header: "Booked",
        accessor: "title",
      },
      {
        Header: "Delivery Date",
        accessor: "status",
      },
      {
        Header: "Site Contact",
        accessor: "role",
      },
      {
        Header: "Service",
        accessor: "service",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Cost",
        accessor: "cost",
      },
      {
        Header: "Status",
        accessor: "statuss",
        Cell: (props) => <CommonStatus status={props.value} />,
        // Filter: CommonFilter ,
        // filter:"includes"
      },
      {
        Header: "Payment",
        accessor: "payment",
      },
      {
        Header: "Booked By",
        accessor: "bookedby",
      },
      {
        Header: "PO",
        accessor: "po",
      },
      {
        Header: "",
        id:"edit-id",
        Cell: ({rows}) => (
          <span onClick={(e) => handleButtonClick(e, rows)} style={{padding:"0px" , cursor:"pointer"}}>
            ooo 
          </span>
        ),
      },
    ],
    []
  );
  const data = React.useMemo(() => jobsTableData(), []);
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default JobsTable;
