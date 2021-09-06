import React, { useMemo } from "react";
import "../reactTable/jobs-react-table.scss";
import TableContainer from "../reactTable/TableContainer"

const TicketsTable = () => {
 
  const columns = useMemo(
    () => [
      {
        Header: "Order #",
        accessor: "orderId",
        disableFilters: true,
      },
      {
        Header: "Booked",
        accessor: "booked",
        disableFilters: true,
      },
      {
        Header: "Customer",
        accessor: "customer",
        disableFilters: true,
      },
      {
        Header: "Service",
        accessor: "service",
        disableFilters: true,
      },
      {
        Header: "Address",
        accessor: "address",
        disableFilters: true,
      },
      {
        Header: "Driver",
        accessor: "driver",
        disableFilters: true,
      },
    ],
    []
  );

  const newData =[
    {orderId : 1 ,booked:"zeeshan", customer:"zeeshan akram", service:"Tcs" , address:"gujranwala", driver:"driver one" },
    {orderId : 2 ,booked:"zeeshan", customer:"zeeshan akram", service:"Tcs" , address:"gujranwala", driver:"driver one" },
    {orderId : 3 ,booked:"zeeshan", customer:"zeeshan akram", service:"Tcs" , address:"gujranwala", driver:"driver one" },
    {orderId : 4 ,booked:"affzaal", customer:"zeeshan akram", service:"Tcs" , address:"gujranwala", driver:"driver one" },
    {orderId : 5 ,booked:"jabran", customer:"zeeshan akram", service:"Tcs" , address:"gujranwala", driver:"driver one" },
    {orderId : 6 ,booked:"ahsen", customer:"zeeshan akram", service:"Tcs" , address:"gujranwala", driver:"driver one" }
  ]

  return (
    <div>
     <TableContainer columns={columns} data={newData}/>
    </div>
  );
};

export default TicketsTable;
