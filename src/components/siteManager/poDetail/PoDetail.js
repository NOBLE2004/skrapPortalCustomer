import React from "react";
import { Card, CardContent } from "@material-ui/core";
import "./poDetail.scss";
import PoTable from "./poTable/PoTable";

const PoDetail = ({ managerData }) => {
  const { purchase_orders } = managerData;
  return (
    <div>
      <Card className="new-manager-detail-main">
        <CardContent>
          <div className="title">Purchase Order Detail</div>
          {purchase_orders && purchase_orders.length > 0 ? (
            <PoTable data={purchase_orders} />
          ) : (
            "Purchase Order not found!"
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PoDetail;
