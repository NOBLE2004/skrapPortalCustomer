import React, { createRef, useEffect } from "react";
import { Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import { getHireBreakdown } from "../../../../../store/actions/action.hireBd";
import { useSelector, useDispatch } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import FadeLoader from "react-spinners/FadeLoader";
import "../style.scss";
const HireBreakDown = (props) => {
  const {sites} = props;
  const state = useSelector((state) => state?.hireBreakdown);
  const dispatch = useDispatch();
  const ref = createRef();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    async function fetchData() {
      if (!state?.hire_breakdown?.result) {
        await dispatch(getHireBreakdown());
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      //if (!state?.hire_breakdown?.result) {
        await dispatch(getHireBreakdown({sites}));
      //}
    }
    fetchData();
  }, [sites]);
   return (
    <>
      {state?.isLoading ? (
        <div className="d-flex justify-center align-center">
          <FadeLoader color={"#29a7df"} loading={state?.isLoading} width={4} />
        </div>
      ) : (
        <>
          {state?.hire_breakdown?.result?.length > 0 ? (
            <Grid container spacing={1} marginTop={1} alignItems="center">
              <Grid
                item
                lg={0.5}
                md={0.5}
                sm={0.5}
                xs={0.5}
                onClick={() => {
                  ref?.current?.previous();
                }}
              >
                <span className="span-arrows-for-carusal"> {`<`}</span>
              </Grid>
              <Grid item lg={11} md={11} sm={11} xs={11}>
                <Carousel
                  responsive={responsive}
                  ref={ref}
                  arrows={false}
                  autoPlay={false}
                  className="main-for-carusal"
                >
                  {state?.hire_breakdown?.result?.map((service,index) => {
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
              <Grid
                item
                lg={0.5}
                md={0.5}
                xs={0.5}
                sm={0.5}
                onClick={() => {
                  ref?.current?.next();
                }}
              >
                <span className="span-arrows-for-carusal"> {`>`}</span>
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
