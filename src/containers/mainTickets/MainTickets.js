import React, {useEffect, useState} from "react";
import TicketsTable from "../../components/tickets/TicketsTable";
import {connect} from "react-redux";
import {getTicketList} from "../../store/actions/ticket.action";
const MainTickets = (props) => {
    const [filters, setFilters] = useState({page: 1});
    const {ticketList, isLoading, error} = props.tickets;

    useEffect(() => {
        async function fetchData() {
            if (!ticketList) {
                await props.getTicketList(filters);
            }
        }
        fetchData();
    }, []);
    const handlePagination = (page) => {
        setFilters({...filters, page: page});
    };
  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Tickets </div>
      </div>
      <TicketsTable
          data={ticketList ? ticketList.data : []}
          pagination={ticketList}
          handlePagination={handlePagination}
      />
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
