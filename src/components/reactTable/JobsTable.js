import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import "./jobs-react-table.scss";

const JobsTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const body = await response.json();
      const contacts = body.results;
      console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);

  const handleButtonClick = (e, row) => {
    console.log("row click", row);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Order #",
        accessor: "name.title",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Booked",
        accessor: "name.first",
        disableFilters: true,
       
      },
      {
        Header: "Delivery Date",
        accessor: "name.last",
        disableFilters: true,
      },
      {
        Header: "Site Contact",
        accessor: "email",
        disableFilters: true,
      },
      {
        Header: "Service",
        accessor: "location.city",
        disableFilters: true,
      },
      {
        Header: "Address",
        accessor: (values) => {
          const { latitude, longitude } = values.location.coordinates;
          const first = Number(latitude) > 0 ? "N" : "S";
          const second = Number(longitude) > 0 ? "E" : "W";
          return first + "/" + second;
        },
        disableSortBy: true,
        disableFilters: true,
        // Filter: SelectColumnFilter,
        // filter: 'equals',
        Cell: ({ cell }) => {
          const { value } = cell;

          const pickEmoji = (value) => {
            let first = value[0]; // N or S
            let second = value[2]; // E or W
            const options = ["⇖", "⇗", "⇙", "⇘"];
            let num = first === "N" ? 0 : 2;
            num = second === "E" ? num + 1 : num;
            return options[num];
          };

          return (
            <div style={{ textAlign: "center", fontSize: 18 }}>
              {pickEmoji(value)}
            </div>
          );
        },
      },
      {
        Header: "Cost",
        accessor: "gender",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Status",
        accessor: "location.state",
        disableFilters: true,
      },
      {
        Header: "Payment",
        accessor: "location.postcode",
        disableFilters: true,
      },
      {
        Header: "Booked By",
        accessor: "login.salt",
        disableFilters: true,
      },
      {
        Header: "PO",
        accessor: "login.password",
        disableFilters: true,
      },
      {
        Header: "",
        id: "edit-id",
        Cell: ({ rows }) => (
          <span
            onClick={(e) => handleButtonClick(e, rows)}
            style={{ padding: "0px", cursor: "pointer" }}
          >
            ooo
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <TableContainer columns={columns} data={data} />
    </div>
  );
};

export default JobsTable;
