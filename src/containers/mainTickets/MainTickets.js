import React, { useEffect, useState } from "react";
import TicketsTable from "../../components/tickets/TicketsTable";
import { connect } from "react-redux";
import { getTicketList } from "../../store/actions/ticket.action";
import FadeLoader from "react-spinners/FadeLoader";

const MainTickets = (props) => {
  const [filters, setFilters] = useState({ page: 1 });
  const { ticketList, isLoading, error } = props.tickets;

  useEffect(() => {
    async function fetchData() {
      if (!ticketList) {
        await props.getTicketList(filters);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const newFilter = { page: null, search: "" };
    if (!compare(newFilter, filters)) {
      props.getTicketList(filters);
    }
  }, [filters]);
  const compare = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  const handlePagination = (page) => {
    setFilters({ ...filters, page: page });
  };
  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Tickets </div>
      </div>
      {isLoading ? (
            <div className="tickets-main-div">
              <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
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
