import React, { useMemo } from "react";
import TableContainer from "../reactTable/TableContainer";
import Pagination from "../reactTable/pagination";
import "./sites-table.scss";
import { Download } from "@mui/icons-material";
import supplierService from "../../services/supplier.service";
import { toast } from "react-hot-toast";
import { saveAs } from "file-saver";
import { downloadSite } from "../../assets/images";

const SupplierTable = ({ data, pagination, handlePagination, reload }) => {
  const handleDownload = (value) => {
    supplierService
      .downloadFile(value?.user_id)
      .then((res) => {
        if (res?.data?.code === 0) {
          saveAs(res?.data?.result?.url);
        } else {
          toast.error(res?.data?.description);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
        disableFilters: true,
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        disableFilters: true,
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
      },
      {
        Header: "Phone Number",
        accessor: "mobile_number",
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "orignal",
        disableFilters: true,
        Cell: (props) => {
          const { row } = props;
          return (
            <div
              onClick={() => {
                handleDownload(row?.original);
              }}
            >
              <img src={downloadSite} alt="download-icon" />
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <TableContainer columns={columns} data={data} name={""} />
      <Pagination
        last={pagination?.last_page}
        current={pagination?.current_page}
        from={pagination?.from}
        to={pagination?.to}
        total={pagination?.total}
        handleNext={(page) => {
          handlePagination(page);
        }}
        handlePrevious={(page) => {
          handlePagination(page);
        }}
      />
    </>
  );
};

export default SupplierTable;
