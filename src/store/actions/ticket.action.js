import TicketService from "../../services/ticket.service";
import * as Constants from "../constants/constants";

//getSites
export const getTicketList = (filters) => {
  return (dispatch) => {
    dispatch(ticketListStart());
    const params = Object.entries(filters).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    TicketService.list(params)
      .then((res) => {
        dispatch(ticketListSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(ticketListFailure(err.message));
      });
  };
};
export const ticketListStart = () => {
  return {
    type: Constants.TICKETS_LIST_DATA_START,
  };
};

export const ticketListSuccess = (data) => {
  return {
    type: Constants.TICKETS_LIST_DATA_SUCCESS,
    payload: data,
  };
};

export const ticketListFailure = (error) => {
  return {
    type: Constants.TICKETS_LIST_DATA_FAILURE,
    payload: error,
  };
};
