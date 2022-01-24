import React from "react";
import { Card, CardContent } from "@material-ui/core";
import "./poDetail.scss";
import PoTable from "./poTable/PoTable";

const PoDetail = ({ managerData }) => {
  const { data } = managerData;
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
