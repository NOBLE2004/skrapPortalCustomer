import React from "react";
import { Card, CardContent } from "@material-ui/core";
import "./poDetail.scss";
import PoTable from "./poTable/PoTable";

const PoDetail = ({ managerData, isManager }) => {
  const { purchase_orders, data } = managerData;
  return (
    <div>
      <Card className="new-manager-detail-main">
        <CardContent>
          <div className="title">Purchase Order Details</div>
          {isManager ? (
            data && data.purchase_orders.length > 0 ? (
              <PoTable data={data.purchase_orders} isManager={isManager} />
            ) : (
              "Purchase Order not found!"
            )
          ) : purchase_orders && purchase_orders.length > 0 ? (
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
