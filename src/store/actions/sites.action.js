import sitesService from "../../services/sites.service";
import * as Constants from "../constants/constants";

//getSites
export const getSites = () => {
  return (dispatch) => {
    dispatch(sitesStart());
    sitesService
      .getAllSites()
      .then((res) => {
        const unique = [
          ...new Map(
            res?.data?.data.map((item) => [item?.job_address, item])
          ).values(),
        ];
        dispatch(sitesSuccess(unique));
      })
      .catch((err) => {
        dispatch(sitesFailure(err.message));
      });
  };
};

export const sitesStart = () => {
  return {
    type: Constants.SITES_DATA_START,
  };
};

export const sitesSuccess = (data) => {
  return {
    type: Constants.SITES_DATA_SUCCESS,
    payload: data,
  };
};

export const sitesFailure = (error) => {
  return {
    type: Constants.SITES_DATA_FAILURE,
    payload: error,
  };
};

// getSiteList

export const getSitesList = (filters) => {
  return (dispatch) => {
    dispatch(sitesListStart());
    const params = Object.entries(filters).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    sitesService
      .getSitesList(params)
      .then((res) => {
        dispatch(sitesListSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(sitesListFailure(err.message));
      });
  };
};

export const sitesListStart = () => {
  return {
    type: Constants.SITES_LIST_DATA_START,
  };
};

export const sitesListSuccess = (data) => {
  return {
    type: Constants.SITES_LIST_DATA_SUCCESS,
    payload: data,
  };
};

export const sitesListFailure = (error) => {
  return {
    type: Constants.SITES_LIST_DATA_FAILURE,
    payload: error,
  };
};
