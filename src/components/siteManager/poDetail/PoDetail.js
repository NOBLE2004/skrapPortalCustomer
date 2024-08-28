import React from "react";
import {Card, CardContent, Grid} from "@mui/material";
import "./poDetail.scss";
import PoTable from "./poTable/PoTable";
import {personImage} from "../../../assets/images";

const PoDetail = ({ managerData, isManager }) => {
  const { purchase_orders, data } = managerData;
  return (
    <div>
        {data ? (<Card className="new-manager-detail-main">
        <CardContent>
          <div className="title">Purchase Order Details</div>
          {/*{isManager ? (*/}
          {/*  data && data?.[0]?.purchase_orders.length > 0 ? (*/}
          {/*    <PoTable data={data?.[0]?.purchase_orders} isManager={isManager} />*/}
          {/*  ) : (*/}
          {/*    "Purchase Order not found!"*/}
          {/*  )*/}
          {/*) : purchase_orders && purchase_orders.length > 0 ? (*/}
          {/*  <PoTable data={purchase_orders} />*/}
          {/*) : (*/}
          {/*  "Purchase Order not found!"*/}
          {/*)}*/}
          {data && purchase_orders ? <Grid container spacing={3} className="manager-sub-detail">
            <Grid item md={2}>
            </Grid>
            <Grid item md={3} className="new-personal-info">
              <div className="info">
                <div className="designation">PO Number</div>
                <div className="personal-title">
                  {purchase_orders?.po}
                </div>
              </div>
              <div className="change-info">
                <div className="info">
                  <div className="designation">Total</div>
                  <div className="personal-title">{purchase_orders?.total?.toFixed(2)?.toString()}</div>
                </div>
              </div>
            </Grid>
            <Grid item md={4} className="new-personal-info">
              <div className="info">
                <div className="designation">Used</div>
                <div className="personal-title">
                  {purchase_orders?.used?.toFixed(2)?.toString()}
                </div>
              </div>
              <div className="info">
                <div className="designation">Remaining</div>
                <div className="personal-title">
                  {purchase_orders?.remaining?.toFixed(2)?.toString()}
                </div>
              </div>
            </Grid>

            <Grid item md={3} className="new-personal-info">
              <div className="info">
                <div className="designation">Created On</div>
                <div className="personal-title">
                  {new Date(purchase_orders?.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="info">
                <div className="designation">Last Used</div>
                <div className="personal-title">
                  {new Date(purchase_orders?.updated_at).toLocaleDateString()}
                </div>
              </div>
            </Grid>
          </Grid> : 'Purchase Order not found!'}
        </CardContent>
      </Card>) : ''}
    </div>
  );
};

export default PoDetail;
