import React from "react";
import { craneIcon } from "../../assets/images";
import { Card, CardContent } from "@material-ui/core";
import { InfoWindow } from "react-google-maps";
import "./tipingcard.scss";
const TipingCrane = () => {
  return (
    <Card className="tiping-crane">
      <img src={craneIcon} alt="crane-icon" />
    </Card>
  );
};

export default TipingCrane;
