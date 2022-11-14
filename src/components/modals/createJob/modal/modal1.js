/* eslint-disable import/no-anonymous-default-export */
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default (props) => {
  const { handleValue, service } = props;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      paritialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      paritialVisibilityGutter: 20,
    },
  };

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item xs={9}>
          <h1 className="title">Which type of hire do you need?</h1>
        </Grid>
        <Grid item xs={2}>
          <img
            className="mt-5   full-width"
            src="/images/modal/3D-icon.svg"
            alt=""
          />
        </Grid>
      </Grid>

      {service?.service?.data?.map((single) => (
        <Grid container marginTop={2} key={single?.service_id}>
          <Grid item xs={12}>
            <Accordion
              sx={{
                background: "transparent",
                borderRadius: "16px",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      margin: "0px!important",
                    }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  background: "#fff",
                  borderRadius: "16px",
                  minHeight: "unset!important",
                  margin: "0px!important",
                }}
              >
                <Typography className="skip-yard-title">
                  {single?.service_name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0px!important" }}>
                <Grid container spacing={1} marginTop={1}>
                  <Grid item xs={12}>
                    <Carousel
                      responsive={responsive}
                      partialVisbile
                      showDots={false}
                      arrows={false}
                    >
                      {single?.sub?.map((row) => (
                        <div
                          key={row?.service_id}
                          className="image-modal-main pointer"
                          style={{
                            background: "#60A0F8",
                          }}
                        >
                          <img
                            className="mt-5 h-40 full-width"
                            src={row?.full_url}
                            alt=""
                            style={{
                              filter: " drop-shadow(2px 4px 6px white)",
                            }}
                          />
                          <p
                            className="img-caption mt-5"
                            style={{
                              color: "#fff",
                            }}
                          >
                            {row?.service_name}
                          </p>
                        </div>
                      ))}
                    </Carousel>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      ))}

      <Grid
        container
        spacing={1}
        marginTop={1}
        justifyContent="center"
        className="btn-modal"
      >
        <Grid item xs={8}>
          <button
            onClick={() => {
              handleValue(2);
            }}
          >
            Get a quote
          </button>
        </Grid>
      </Grid>
    </>
  );
};
