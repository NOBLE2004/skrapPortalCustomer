import React, {useEffect, useState} from "react";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import TicketsTable from "../../components/tickets/TicketsTable";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../../components/commonComponent/commonfilter/CommonFilter";
import {getTippingList} from "../../store/actions/tipping.action";
import {connect} from "react-redux";
import {getTicketList} from "../../store/actions/ticket.action";
import SitesTable from "../../components/sites/sitesTable/SitesTable";
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
        {/*<DashboardFilter handelSearch={()=>{}} title={"Tickets"} />*/}
      </div>
       {/* <div className="common-search-for-tables">
            <CommonSearch cname="tickets" handleChangeSearch={()=>{}}/>
            <CommonFilter cname="tickets" />
        </div>*/}
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
