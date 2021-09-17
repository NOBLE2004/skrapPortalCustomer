import React from "react";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import TicketsTable from "../../components/tickets/TicketsTable";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../../components/commonComponent/commonfilter/CommonFilter";
const MainTickets = () => {
  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Tickets </div>
        <DashboardFilter title={"Tickets"} />
      </div>
        <div className="common-search-for-tables">
            <CommonSearch cname="tickets" handleChangeSearch={()=>{}}/>
            <CommonFilter cname="tickets" />
        </div>
      <TicketsTable />
    </div>
  );
};

export default MainTickets;
