import * as constants from "../constants/constants";
const initialState = {
  isLoading: false,
  jobData: null,
  error: null,
  job: null,
};

const initialFilter = {
  status: "",
  date: "",
  service: "",
  address: "",
  page:1,
  search: "",
  show_on_app: [0, 1],
  currency: localStorage.getItem("currency")
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.JOB_LIST_DATA_START:
      return { ...state, isLoading: true, error: null, jobData: null };
    case constants.JOB_LIST_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        jobData: action.payload,
      };
    case constants.JOB_LIST_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        jobData: null,
      };
    case constants.JOB_DATA_START:
      return { ...state, isLoading: true, error: null, job: null };
    case constants.JOB_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        job: action.payload,
      };
    case constants.JOB_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        job: null,
      };
    default:
      return { ...state };
  }
};

export const jobFilterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case constants.JOBS_FILTER:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};
