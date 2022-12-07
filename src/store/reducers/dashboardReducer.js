import * as constants from "../constants/constants";
const initialState = {
  loading: false,
  info: null,
  error: null,
};
const initialStateMap = {
  loading: false,
  info: null,
  error: null,
};

const initialStateService = {
  loading: false,
  info: null,
  error: null,
};

const initialStateSale = {
  loading: false,
  info: null,
  error: null,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.DASHBOARD_DATA_START:
      return { ...state, loading: true, error: null, info: null };
    case constants.DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        info: action.payload,
      };
    case constants.DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        info: null,
      };
    default:
      return { ...state };
  }
};

export const dashboardMapReducer = (state = initialStateService, action) => {
  switch (action.type) {
    case constants.DASHBOARD_MAP_START:
      return { ...state, loading: true, error: null, info: null };
    case constants.DASHBOARD_MAP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        info: action.payload,
      };
    case constants.DASHBOARD_MAP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        info: null,
      };
    default:
      return { ...state };
  }
};

export const dashboardServiceReducer = (state = initialStateSale, action) => {
  switch (action.type) {
    case constants.DASHBOARD_SERVICE_START:
      return { ...state, loading: true, error: null, info: null };
    case constants.DASHBOARD_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        info: action.payload,
      };
    case constants.DASHBOARD_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        info: null,
      };
    default:
      return { ...state };
  }
};

export const dashboardSaleReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.DASHBOARD_SALES_START:
      return { ...state, loading: true, error: null, info: null };
    case constants.DASHBOARD_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        info: action.payload,
      };
    case constants.DASHBOARD_SALES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        info: null,
      };
    default:
      return { ...state };
  }
};