import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { jobHeadCells, data } from "../utlils/constants";
import "./jobTable.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    padding: 10,
    color: "#0D0D39",
  },
  tableHead: {
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "bold",
    color: "#0D0D39",
    textTransform: "capitalize",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 20,
  },
  tableCell: {
    border: "none",
    opacity: 0.9,
    fontSize: 12,
    color: "#4B686E",
    textTransform: "capitalize",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function EnhancedTableHead(props) {
  const { classes } = props;

  return (
    <TableHead>
      <TableRow>
        {jobHeadCells.map((headCell, index) => {
          let width1 = "7%";
          switch (headCell.id) {
            case 'service':
            case "address":
            case "deliveryDate":
            case "siteContact":
              width1 = "10%";
              break;
            default:
              width1 = "7%";
          }
          return (
            <TableCell
              key={headCell.id + index}
              align="left"
              padding={headCell.disablePadding ? "none" : "default"}
              className={classes.tableHead}
              style={{ width: width1 }}
            >
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

const checkstatus = (app) => {
  switch (app) {
    case 0:
      return "Delivery";
      break;
    case 1:
      return "Assigned";
      break;
    case 2:
      return "En Route";
      break;
    case 3:
      return "Completed";
      break;
    case 4:
      return "Delivered";
      break;
    case 5:
      return "Pickup heading";
      break;
    case 6:
      return "Pickup ongoing";
      break;
    case 7:
      return "Exchange";
      break;
    case 8:
      return "Collection";
      break;
    case 9:
      return "Pickup Booked";
      break;
    case 10:
      return "Collection ongoing";
      break;
    default:
      return "Cancel";
  }
};

const pending = "pending";
const pendingColor = "#FF0000";
const assigned = "assigned";
const assignedColor = "#FF9013";
const enRoute = "ongoing";
const enRouteColor = "#FFA626";
const delivered = "delivered";
const deliveredColor = "#FFBC39";
const completed = "completed";
const completedColor = "#00B25D";

const JobTable = (props) => {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState();
  const [status, setStatus] = React.useState("");

  const detail = (id) => {
    props.history.push({ pathname: `/job/${id}` });
  };
  
  return (
    <TableContainer className="tableWp jobTableWp">
      <Table
        className={[classes.table, "datatable-body"]}
      >
        <EnhancedTableHead
          classes={classes}
        />
        <TableBody>
          {
            data.map((row, index) => {
              row.status = "Not exist";
              if (row.appointment) {
                row.status = checkstatus(
                  row?.appointment?.appointment_status
                );
              }
              let statusColor =
                row.status === "Delivery"
                  ? pendingColor
                  : row.status === "Assigned"
                    ? assignedColor
                    : row.status === "En Route"
                      ? enRouteColor
                      : row.status === "Delivered"
                        ? deliveredColor
                        : row.status === "Completed"
                          ? completedColor
                          : "lightgray";
              if (row.status == "Exchange") {
                statusColor = "#1963b7";
                row.status = "Exchange by sk" + (row.exchanged_by || "");
              }
              if (row.status == "Collection") statusColor = "#20f74e";
              if (row.status == "Cancel") statusColor = pendingColor;
              return (

                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.job_id}
                  className={
                    row.service?.service_id ===
                      row.updated_service?.service_id
                      ? "table-row-wp"
                      : "cursor-pointer"
                  }
                >
                  <TableCell
                   onClick={() => {
                    detail(row.job_id);
                  }}
                    className={[classes.tableCell, "text-capitalize"]}
                  >
                    {row.ref}
                  </TableCell>
                  <TableCell
                   onClick={() => {
                    detail(row.job_id);
                  }}
                    className={classes.tableCell}
                  >
                    {row.job_date}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      detail(row.job_id);
                    }}
                    className={classes.tableCell}
                  >
                    {new Date(row.job_start_time).toLocaleString()}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      detail(row.job_id);
                    }}
                    className={classes.tableCell}
                  >
                    {row?.customer?.first_name +
                      " " +
                      row?.customer?.last_name}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      detail(row.job_id);
                    }}
                    className={classes.tableCell}
                  >
                    {row?.service?.Service_name || row.service_name}
                    {row?.service?.parent_id === 2 && (
                      <span className="serviceLocType">
                        {`(${row?.skip_loc_type === 1
                          ? "Skip Delivery"
                          : row?.skip_loc_type === 2
                            ? "Wait and Load"
                            : "On Road"
                          })`}
                      </span>
                    )}

                  </TableCell>
                  <TableCell
                    onClick={() => {
                      detail(row.job_id);
                    }}
                    className={classes.tableCell}
                  >
                    {row.job_address}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      detail(row.job_id);
                    }}
                    className={classes.tableCell}
                  >
                    {parseFloat(row.transaction_cost)}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedRow(row);
                      setStatus(row.status);
                      // jobStatusModalHandler(true);
                    }}
                    className={[classes.tableCell, "statusCell"]}
                    style={{ color: statusColor }}
                  >
                    <div>
                      <span
                        className="status-circle"
                        style={{ backgroundColor: statusColor }}
                      >
                        .
                      </span>
                      <span>
                        {(row.job_status_type === "Exchange" || row.job_status_type === "Collection") && row.job_status_string === "Completed" && `Completed`}
                        {row.job_status_type === "Delivery" && row.job_status_string === "Completed" && `Delivered`}
                        {(row.job_status_type === "Exchange" && row.job_status_string !== "Completed") &&
                          `${row.job_status_type} ${row.exchanged_by && ` - (SK${row.exchanged_by}) - `}${row.job_status_string}`}
                        {(row.job_status_type === "Collection" || row.job_status_type === "Delivery")
                          && row.job_status_string !== "Completed" &&
                          `${row.job_status_type} - ${row.job_status_string}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      detail(row.job_id);
                    }}
                    className={classes.tableCell}
                  >
                    Pending - manual
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      detail(row.job_id);
                    }}
                    className={classes.tableCell}
                  >
                    {row.bookedby?.first_name
                      ? row.bookedby?.first_name
                      : row.customer?.first_name}
                    {row.bookedby?.last_name
                      ? row.bookedby?.last_name
                      : row.customer?.last_name}
                  </TableCell>
                  <TableCell
                    className={[classes.tableCell, " cursor-pointer"]}
                  >
                    0006
                  </TableCell>

                  <TableCell
                    className={classes.tableCell}
                    onClick={() => {
                      setSelectedRow(row);
                      // setModal(!modal);
                    }}
                    
                  >
                    <span style={{ fontSize: "20px", position: "relative", top:"-4px" }}>
                      ...
                    </span>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default JobTable;