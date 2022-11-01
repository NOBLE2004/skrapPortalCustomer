import React from "react";
import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import "../../finance/style.scss";
import Carousel, {consts} from "react-elastic-carousel";

const breakPoints = [
    {width: 1, itemsToShow: 3, pagination: false},
    {width: 550, itemsToShow: 4, itemsToScroll: 2, pagination: false},
    {width: 850, itemsToShow: 3, pagination: false},
    {width: 1150, itemsToShow: 4, itemsToScroll: 2, pagination: false},
    {width: 1450, itemsToShow: 4, pagination: false},
    {width: 1750, itemsToShow: 4, pagination: false},
];
const ServiceBreakDown = (props) => {
    const {sites, currency} = props;
    const state = useSelector((state) => state?.hireBreakdown);
    const myArrow = ({type, onClick, isEdge}) => {
        const pointer = type === consts.PREV ? "<" : ">";
        return (
            <span className="span-for-arrows" onClick={onClick} disabled={isEdge}>
        {pointer}
      </span>
        );
    };
    return (
        <>
            <Grid container spacing={1} marginTop={1} alignItems="center">
                <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="main-for-carusal"
                >
                    <Carousel
                        itemsToShow={4}
                        renderArrow={myArrow}
                        breakPoints={breakPoints}
                    >
                        <div className="service-box p-2">
                            <div className="service-detail">
                                <div className="percentage">Wood waste price - {currency}{sites[0] == 3629 ? 10.00 : 11.62}/ton</div>
                                <div className="percentage">Total Tonnage - 850.50 {/*(6.3 ton per skip)*/}</div>
                                {/*<div className="percentage">Number of Skips - 135</div>*/}
                                <div className="name">{currency}{sites[0] == 3629 ? '8,505.00' : '9,882.81'}</div>
                            </div>
                        </div>
                      <div className="service-box p-2">
                        <div className="service-detail">
                          <div className="percentage">Paper waste price - {currency}{sites[0] == 3629 ? 2.00 : 2.32}/ton</div>
                          <div className="percentage">Total Tonnage - 472.50 {/*(3.5 ton per skip)*/}</div>
                          {/*<div className="percentage">Number of Skips - 135</div>*/}
                          <div className="name">{currency}{sites[0] == 3629 ? '945.00' : '1,103.16'}</div>
                        </div>
                      </div>
                      <div className="service-box p-2">
                        <div className="service-detail">
                          <div className="percentage">Plastic waste price - {currency}{sites[0] == 3629 ? 100.00 : 116.25}/ton</div>
                          <div className="percentage">Total Tonnage - 945.00 {/*(7.0 ton per skip)*/}</div>
                          {/*<div className="percentage">Number of Skips - 135</div>*/}
                          <div className="name">{currency}{sites[0] == 3629 ? '94,500.00' : '109,856.25'}</div>
                        </div>
                      </div>
                    </Carousel>
                </Grid>
            </Grid>
        </>
    );
};
export default ServiceBreakDown;
