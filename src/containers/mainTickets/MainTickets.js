import React, { useEffect, useState,useCallback } from "react";
import TicketsTable from "../../components/tickets/TicketsTable";
import { connect } from "react-redux";
import { getTicketList } from "../../store/actions/ticket.action";
import FadeLoader from "react-spinners/FadeLoader";
import {Grid} from "@mui/material";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import SiteFilters from "../../components/filters/SiteFilters";

const MainTickets = (props) => {
  const [filters, setFilters] = useState({ page: 1, search: '', date: '' });
  const { ticketList, isLoading, error } = props.tickets;
  const [search, setSearch] = useState("");

  const handlePagination = (page) => {
    setFilters({ ...filters, page: page });
  };

  useEffect(() => {
    async function fetchData() {
      if (!ticketList) {
        await props.getTicketList(filters);
      }
    }
    fetchData();
  }, [filters]);

  useEffect(() => {
    const newFilter = { page: null, search: "" };
    if (!compare(newFilter, filters)) {
      props.getTicketList(filters);
    }
  }, [filters]);

  const compare = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };
  const handleChangeSearch = useCallback(
      (search) => {
        setSearch(search);
        setFilters({ ...filters, search: search });
      },
      [search, filters]
  );

  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Tickets </div>
      </div>
      <Grid container>
        <Grid item md={12}>
          <div className="common-search-for-tables">
            <CommonSearch
                cname="ticket"
                handleChangeSearch={handleChangeSearch}
            />
            <SiteFilters handleChangeFilters={handleChangeFilters} />
          </div>
        </Grid>
      </Grid>
      {isLoading ? (
        <div className="tickets-main-div">
          <FadeLoader color={"#518ef8"} loading={isLoading} width={4} />
        </div>
      ) : ticketList && ticketList.data.length > 0 ? (
        <TicketsTable
          data={ticketList ? ticketList.data : []}
          pagination={ticketList}
          handlePagination={handlePagination}
        />
      ) : (
        <div className="site-error" style={{ textAlign: "center" }}>
          No tickets are available
        </div>
      )}
    </div>
  );
};
const mapStateToProps = ({ tickets }) => {
  return { tickets };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTicketList: (filters) => dispatch(getTicketList(filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainTickets);
