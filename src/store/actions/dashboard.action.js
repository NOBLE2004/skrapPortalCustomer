import * as Constants from "../constants/constants";
import dashboardService from "../../services/dashboard.service";
export const getDashboardsData = (year) => {
  return (dispatch) => {
    dispatch(dashboardStart());
    dashboardService
      .getDashboardData(year)
      .then((res) => {
        dispatch(dashboardSuccess(res.data));
      })
      .catch((err) => {
        dispatch(dashboardFailure(err.message));
      });
  };
};

export const dashboardStart = () => {
  return {
    type: Constants.DASHBOARD_DATA_START,
  };
};

export const dashboardSuccess = (data) => {
  return {
    type: Constants.DASHBOARD_DATA_SUCCESS,
    payload: data,
  };
};

export const dashboardFailure = (error) => {
  return {
    type: Constants.DASHBOARD_DATA_FAILURE,
    payload: error,
  };
};


export const getDashboardsMapData = (year) => {
  return (dispatch) => {
    dispatch(dashboardMapStart());
    dashboardService
      .getDashboardMapData(year)
      .then((res) => {
        dispatch(dashboardMapSuccess(res.data));
      })
      .catch((err) => {
        dispatch(dashboardMapFailure(err.message));
      });
  };
};

export const dashboardMapStart = () => {
  return {
    type: Constants.DASHBOARD_MAP_START,
  };
};

export const dashboardMapSuccess = (data) => {
  return {
    type: Constants.DASHBOARD_MAP_SUCCESS,
    payload: data,
  };
};

export const dashboardMapFailure = (error) => {
  return {
    type: Constants.DASHBOARD_MAP_FAILURE,
    payload: error,
  };
};

export const getDashboardServiceData = (year) => {
  return (dispatch) => {
    dispatch(dashboardServiceStart());
    dashboardService
      .getDashboardServiceData(year)
      .then((res) => {
        dispatch(dashboardServiceSuccess(res.data));
      })
      .catch((err) => {
        dispatch(dashboardServiceFailure(err.message));
      });
  };
};

export const dashboardServiceStart = () => {
  return {
    type: Constants.DASHBOARD_SERVICE_START,
  };
};

export const dashboardServiceSuccess = (data) => {
  return {
    type: Constants.DASHBOARD_SERVICE_SUCCESS,
    payload: data,
  };
};

export const dashboardServiceFailure = (error) => {
  return {
    type: Constants.DASHBOARD_SERVICE_FAILURE,
    payload: error,
  };
};

export const getDashboardSaleData = (year) => {
  return (dispatch) => {
    dispatch(dashboardSaleStart());
    dashboardService
      .getDashboardSaleData(year)
      .then((res) => {
        dispatch(dashboardSaleSuccess(res.data));
      })
      .catch((err) => {
        dispatch(dashboardSaleFailure(err.message));
      });
  };
};

export const dashboardSaleStart = () => {
  return {
    type: Constants.DASHBOARD_SALES_START,
  };
};

export const dashboardSaleSuccess = (data) => {
  return {
    type: Constants.DASHBOARD_SALES_SUCCESS,
    payload: data,
  };
};

export const dashboardSaleFailure = (error) => {
  return {
    type: Constants.DASHBOARD_SALES_FAILURE,
    payload: error,
  };
};