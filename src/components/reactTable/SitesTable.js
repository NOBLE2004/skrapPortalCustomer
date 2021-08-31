import React, { useMemo, useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import Table from "./Table";
const SitesTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios("http://api.tvmaze.com/search/shows?q=girls")
      .then((res) => {
        console.log("data", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const columns = useMemo(() => [
    {
      Header: "TV Show",
      columns: [
        {
          Header: "Name",
          accessor: "show.name",
        },
        {
          Header: "Type",
          accessor: "show.type",
        },
        {
          Header: "Language",
          accessor: "show.language",
        },
        {
          Header: "Official Site",
          accessor: "show.officialSite",
          Cell: ({ cell: { value } }) =>
            value ? <a href={value}>{value}</a> : "-",
        },
        {
          Header: "Rating",
          accessor: "show.rating.average",
          Cell: ({ cell: { value } }) => value || "-",
        },
        {
          Header: "Status",
          accessor: "show.status",
        },
        {
          Header: "Premiered",
          accessor: "show.premiered",
          Cell: ({ cell: { value } }) => value || "-",
        },
        {
          Header: "Time",
          accessor: "show.schedule.time",
          Cell: ({ cell: { value } }) => value || "-",
        },
      ],
    },
  ]);

  return (
    <>
      {/* <CssBaseline /> */}
      <Table columns={columns} data={data} />
    </>
  );
};

export default SitesTable;
