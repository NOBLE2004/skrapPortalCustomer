import React, { useState } from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { personImage, editIcon, showIcon } from "../../../assets/images";
import "./poDetail.scss";
import PoTable from "./poTable/PoTable";

const PoDetail = ({ data }) => {
  return (
    <div>
      <Card className="new-manager-detail-main">
        <CardContent>
          <div className="title">Purchase Order Detail</div>

          {data && data.length > 0 ? (
            <PoTable data={data} />
          ) : (
            "Purchase Order not found!"
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PoDetail;
