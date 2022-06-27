import React, { useEffect, useState,useCallback } from "react";
import TicketsTable from "../../components/tickets/TicketsTable";
import { connect } from "react-redux";
import { getTicketList } from "../../store/actions/ticket.action";
import FadeLoader from "react-spinners/FadeLoader";
import {Grid} from "@mui/material";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import SiteFilters from "../../components/filters/SiteFilters";
import ticketService from "../../services/ticket.service";
import CircularProgress from "@mui/material/CircularProgress";
import {PORTAL_URL} from "../../environment";

const MainTickets = (props) => {
  const [filters, setFilters] = useState({ page: 1, search: '', date: '' });
  const { ticketList, isLoading, error } = props.tickets;
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
  const toDataURL = (url) => {
    return fetch(url)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          return URL.createObjectURL(blob);
        });
  };
  const download = async (url) => {
    var element = document.createElement("a");
    element.href = await toDataURL(url);
    element.download = url.substring(url.lastIndexOf("/") + 1, url.length);
    element.click();
      setLoading(false);
  };
  const downloadZip = () => {
    setLoading(true);
    const params = filters;
    params.user_id = localStorage.getItem("user_id");
    return fetch(PORTAL_URL + '/tickets/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.code === 0){
            download(responseJson.result.url);
          }else{
            console.log(responseJson)
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    // ticketService.download(params)
    //     .then((response)=>{
    //       if(response.data.code === 0){
    //         download(response.data.result.url);
    //       }else{
    //         console.log(response)
    //           setLoading(false);
    //       }
    //     }).catch(error => {
    //     setLoading(false);
    //       console.log(error);
    //     });
  }

  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Tickets </div>
          {filters.date &&(
              <>
                  {loading ? (
                      <CircularProgress />
                  ) : (
                  <button className="header-btn" onClick={downloadZip}>
                    Download Tickets
                  </button>
                )}
              </>
          )}
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
