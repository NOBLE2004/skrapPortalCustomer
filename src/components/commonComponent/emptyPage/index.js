import { Grid, Typography } from "@mui/material";
import BokkingIcon from "../../../assets/images/empty.svg";
import "./style.scss";
import React from "react";
import { Box } from "@mui/system";

const EmptyPage = () => {
  return (
    <Grid
      container
      className="empty-page-main"
      justifyContent="center"
      alignItems="center"
      height="60vh"
    >
      <Grid item md={4} xs={12} textAlign="center">
        <img src={BokkingIcon} alt="" />
        <Typography className="title" mt={2}>
          Assign a Purchase Order to get started!
        </Typography>
        <Box gap={2} display="flex" mt={4}>
          <button className="button-cancel">Assign Site Manager </button>
          <button className="button-save">Assign PO </button>
        </Box>
      </Grid>
    </Grid>
  );
};
export default EmptyPage;
