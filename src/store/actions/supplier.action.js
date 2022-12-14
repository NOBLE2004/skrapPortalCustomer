import supplierService from "../../services/supplier.service";
import * as Constants from "../constants/constants";

export const getSupplierList = (filters) => {
  return (dispatch) => {
    dispatch(supplierListStart());
    const params = Object.entries(filters).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    supplierService
      .getAllSuppliers(params)
      .then((res) => {
        dispatch(supplierListSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(supplierListFailure(err.message));
      });
  };
};

export const supplierListStart = () => {
  return {
    type: Constants.ALL_SUPPLIERS,
  };
};

export const supplierListSuccess = (data) => {
  return {
    type: Constants.ALL_SUPPLIERS_SUCCESS,
    payload: data,
  };
};

export const supplierListFailure = (error) => {
  return {
    type: Constants.ALL_SUPPLIERS_FAILURE,
    payload: error,
  };
};
