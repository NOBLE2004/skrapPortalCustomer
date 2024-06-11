import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import "../style.scss";
import Carousel, { consts } from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 3, pagination: false },
  { width: 550, itemsToShow: 4, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3, pagination: false },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2, pagination: false },
  { width: 1450, itemsToShow: 4, pagination: false },
  { width: 1750, itemsToShow: 4, pagination: false },
];
const HireBreakDown = () => {
  const state = useSelector((state) => state?.hireBreakdown);
  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? "<" : ">";
    return (
      <span className="span-for-arrows" onClick={onClick} disabled={isEdge}>
        {pointer}
      </span>
    );
  };
  return (
    <>
      {state?.isLoading ? (
        <div className="d-flex justify-center align-center">
          <Stack spacing={1} px={2} sx={{ width: "100%" }} mt={1}>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            <Skeleton variant='rounded' height={20} />
             <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          </Stack>
        </div>
      ) : (
        <>
          {state?.hire_breakdown?.result?.length > 0 ? (
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
      )}
    </>
  );
};
export default HireBreakDown;
