import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getReportEmissionVehicles = (data) => {
    return (dispatch) => {
        dispatch(reportEmissionVehicleStart());
        ReportsService.getReportEmissionVehicle(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const siteBreakdown = response.data;
                    dispatch(reportEmissionVehicleSuccess(siteBreakdown));
                } else {
                    dispatch(reportEmissionVehicleFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(reportEmissionVehicleFailure(err.message));
            });
    };
};
export const reportEmissionVehicleStart = () => {
    return {
        type: Constants.GET_REPORT_VEHICLE_START,
    };
};

export const reportEmissionVehicleSuccess = (data) => {
    return {
        type: Constants.GET_REPORT_VEHICLE_SUCCESS,
        payload: data,
    };
};

export const reportEmissionVehicleFailure = (error) => {
    return {
        type: Constants.GET_REPORT_VEHICLE_FAILURE,
        payload: error,
    };
};
