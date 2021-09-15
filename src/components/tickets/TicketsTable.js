import React, { useMemo } from "react";
import { downloadSite } from "../../assets/images";
import TableContainer from "../reactTable/TableContainer";
import "../reactTable/jobs-react-table.scss";

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
      {
        Header: "",
        id: "download_id",
        Cell: ({ rows }) => (
          <span className="normal-dsans-10-primary">
            Download Ticket
            <img
              src={downloadSite}
              alt="download-icon"
              style={{ marginLeft: "5px" }}
            />
          </span>
        ),
        disableFilters: true,
      },
      {
        Header: "",
        id: "submenu_id",
        Cell: ({ rows }) => (
          <span className="normal-dsans-10-primary">ooo</span>
        ),
        disableFilters: true,
      },
    ],
    []
  );

  const newData = [
    {
      orderId: "SN14662",
      booked: "2021-03-25 09:28:01",
      customer: "Noble Eldhose - +441234567890",
      service: "Mixed Waste (Grab Hire)",
      address: "113 Ibsley Gardens London,Sw15 4NQ",
      driver: "Terri Ongolo",
    },
    {
      orderId: "SN14662",
      booked: "2021-03-25 09:28:01",
      customer: "Noble Eldhose - +441234567890",
      service: "Mixed Waste (Grab Hire)",
      address: "113 Ibsley Gardens London,Sw15 4NQ",
      driver: "Terri Ongolo",
    },
    {
      orderId: "SN14662",
      booked: "2021-03-25 09:28:01",
      customer: "Noble Eldhose - +441234567890",
      service: "Mixed Waste (Grab Hire)",
      address: "113 Ibsley Gardens London,Sw15 4NQ",
      driver: "Terri Ongolo",
    },
    {
      orderId: "SN14662",
      booked: "2021-03-25 09:28:01",
      customer: "Noble Eldhose - +441234567890",
      service: "Mixed Waste (Grab Hire)",
      address: "113 Ibsley Gardens London,Sw15 4NQ",
      driver: "Terri Ongolo",
    },
    {
      orderId: "SN14662",
      booked: "2021-03-25 09:28:01",
      customer: "Noble Eldhose - +441234567890",
      service: "Mixed Waste (Grab Hire)",
      address: "113 Ibsley Gardens London,Sw15 4NQ",
      driver: "Terri Ongolo",
    },
    {
      orderId: "SN14662",
      booked: "2021-03-25 09:28:01",
      customer: "Noble Eldhose - +441234567890",
      service: "Mixed Waste (Grab Hire)",
      address: "113 Ibsley Gardens London,Sw15 4NQ",
      driver: "Terri Ongolo",
    },
    {
      orderId: "SN14662",
      booked: "2021-03-25 09:28:01",
      customer: "Noble Eldhose - +441234567890",
      service: "Mixed Waste (Grab Hire)",
      address: "113 Ibsley Gardens London,Sw15 4NQ",
      driver: "Terri Ongolo",
    },
    {
      orderId: "SN14662",
      booked: "2021-03-25 09:28:01",
      customer: "Noble Eldhose - +441234567890",
      service: "Mixed Waste (Grab Hire)",
      address: "113 Ibsley Gardens London,Sw15 4NQ",
      driver: "Terri Ongolo",
    },
  ];

  return (
    <div>
      <TableContainer columns={columns} data={newData} name={"tickets"} />
    </div>
  );
};

export default TicketsTable;
