import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "../mainSites/sites.scss";
import SupplierTable from "../../components/supplierTable";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierList } from "../../store/actions/supplier.action";
import { FadeLoader } from "react-spinners";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import SiteFilters from "../../components/filters/SiteFilters";
import { useCallback } from "react";

const Supplier = () => {
  const dispatch = useDispatch();
  const supplierData = useSelector((state) => state?.allSupplier);
  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    date: "",
    address: "",
  });
  const [search, setSearch] = useState("");
  const handleChangeSearch = useCallback(
    (postcode) => {
      setSearch(postcode);
      setFilters({ ...filters, search: postcode });
    },
    [search, filters]
  );
  const handlePagination = (page) => {
    setFilters((st) => ({
      ...st,
      page: page,
    }));
  };
  useEffect(() => {
    dispatch(getSupplierList(filters));
  }, [filters]);

  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };

  const handleReset = () => {
    setFilters({
      page: 1,
      search: "",
      date: "",
      address: "",
    });
  };

  return (
    <>
      <div className="header-main">
        <div className="sites-header-title">Supplier </div>
      </div>
      <Grid container>
        <Grid item md={12}>
          <div className="common-search-for-tables">
            <CommonSearch cname="" handleChangeSearch={handleChangeSearch} />
            <SiteFilters
              filters={filters}
              setFilters={setFilters}
              handleReset={handleReset}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container className="sites-table-loader">
        {supplierData?.isLoading ? (
          <FadeLoader
            color={"#518ef8"}
            loading={supplierData?.isLoading}
            width={4}
          />
        ) : supplierData?.data?.data?.length > 0 ? (
          <>
            <Grid item md={12} sm={12}>
              <SupplierTable
                data={supplierData?.data?.data ? supplierData?.data?.data : []}
                pagination={supplierData?.data}
                handlePagination={handlePagination}
                //   reload={() => setIsReload(!isReload)}
                searchData={"search"}
              />
            </Grid>
          </>
        ) : (
          <div className="sitenotfound">No Supplier found</div>
        )}
      </Grid>
    </>
  );
};

export default Supplier;
