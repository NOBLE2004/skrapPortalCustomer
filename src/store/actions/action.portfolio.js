import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getPortfolio = (data) => {
  return (dispatch) => {
    dispatch(getPortfolioStart());
    ReportsService.getPortfolio(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(getPortfolioSuccess(siteBreakdown));
        } else {
          dispatch(getPortfolioFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(getPortfolioFailure(err.message));
      });
  };
};
export const getPortfolioStart = () => {
  return {
    type: Constants.GET_PORTFOLIO_START,
  };
};

export const getPortfolioSuccess = (data) => {
  return {
    type: Constants.GET_PORTFOLIO_SUCCESS,
    payload: data,
  };
};

export const getPortfolioFailure = (error) => {
  return {
    type: Constants.GET_PORTFOLIO_FAILURE,
    payload: error,
  };
};
