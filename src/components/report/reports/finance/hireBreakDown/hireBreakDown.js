import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { getHireBreakdown } from "../../../../../store/actions/action.hireBd";
import { useSelector, useDispatch } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import "../style.scss";
import Carousel, { consts } from 'react-elastic-carousel'

const breakPoints = [
  { width: 1, itemsToShow: 3, pagination: false },
  { width: 550, itemsToShow: 4, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3, pagination: false },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2, pagination: false },
  { width: 1450, itemsToShow: 4, pagination: false },
  { width: 1750, itemsToShow: 4, pagination: false },
]
const HireBreakDown = (props) => {
  const { sites } = props;
  const state = useSelector((state) => state?.hireBreakdown);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      //if (!state?.hire_breakdown?.result) {
      await dispatch(getHireBreakdown({ sites }));
      //}
    }
    fetchData();
  }, [sites]);

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? '<' : '>'
    return (
      <span className="span-for-arrows" onClick={onClick} disabled={isEdge}>
        {pointer}
      </span>
    )
  }
  return (
    <>
      {state?.isLoading ? (
        <div className="d-flex justify-center align-center">
          <FadeLoader color={"#518ef8"} loading={state?.isLoading} width={4} />
        </div>
      ) : (
        <>
          {state?.hire_breakdown?.result?.length > 0 ? (
            <Grid container spacing={1} marginTop={1} alignItems="center">
              <Grid item lg={12} md={12} sm={12} xs={12} className="main-for-carusal">
                <Carousel
                  itemsToShow={4}
                  renderPagination={false}
                  renderArrow={myArrow}
                  breakPoints={breakPoints}
                >
                  {state?.hire_breakdown?.result?.map((service, index) => {
                    return (
                      <div className="service-box p-2" key={index}>
                        <img
                          src={service?.url}
                          alt=""
                          style={{ height: "30px" }}
                        />
                        <div className="service-detail">
                          <div className="name">{service?.service_name}</div>
                          <div className="percentage">{service?.jobs}</div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </>
      )
      }
    </>
  );
};
export default HireBreakDown;
