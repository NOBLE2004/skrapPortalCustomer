import {
  Box,
  Button,
  Divider,
  Drawer,
  LinearProgress,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Close,
  InfoOutlined,
  LineWeightOutlined,
  LocationCityOutlined,
  LocationSearchingOutlined,
  SocialDistanceOutlined,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";
import PladgeDetails from "./detail";
import plegeService from "../../services/plege.service";
import EmissionDetails from "./emissionDetail";
import AccuracyDetails from "./accurayDetail";
import ImpactImg from "../../assets/images/createimpact.webp";
import { calculator } from "../../assets/images";
import "./style.scss";

const PledgeModal = ({ showDrawer, setShowDrawer, setShowCo }) => {
  const [value, setValue] = React.useState("1");
  const [data, setData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getData = () => {
    plegeService
      .getPledgeData(showDrawer?.row?.job_id)
      .then((res) => {
        setData(res?.data?.data);
        console.log({ res });
      })
      .catch((err) => {
        console.log("errr".err);
      });
  };
  useEffect(() => {
    if (showDrawer?.row?.job_id) {
      getData();
    }
  }, [showDrawer?.show]);

  const percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  };
  const setComponentData = () => {
    setData(null);
    console.log('modal closed');
    setShowDrawer({ show: false });
      setShowCo(false)
  };

  return (
    <Drawer
      anchor={"right"}
      open={showDrawer.show}
      className="right-side"
      sx={{
        width: "650px",
      }}
      onClose={setComponentData}
    >
      <Box width={650} className={"pledge-bar"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            borderBottom: "1px solid #8080803b",
            fontFamily: "Dm Sans",
          }}
          gap={2}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Dm Sans", fontSize: "20px" }}
          >
            Emissions Summary - SK{data?.job_id}
          </Typography>
          <div onClick={() => {
              setShowDrawer({ show: false })
              setShowCo(false)
          }}>
            <Close />
          </div>
        </Box>
        <Box sx={{ padding: "12px" }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              mb: 1,
              fontFamily: "Dm Sans",
            }}
          >
            Overview
          </Typography>
          <Box
            sx={{
              padding: "12px",
              border: "1px solid #8080803b",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "500",
                mt: 1,
                lineHeight: "2rem",
                fontFamily: "Dm Sans",
                fontSize: "20px",
              }}
            >
              <span
                style={{
                  background: "#ecdaff",
                  padding: "4px 6px",
                  borderRadius: "4px",
                  fontFamily: "Dm Sans",
                }}
              >
                {data?.em_co2e_value?.toFixed(2) || ""}{" "}
                <span
                  style={{
                    textTransform: "lowercase",
                    fontFamily: "Dm Sans",
                  }}
                >
                  {data?.em_co2e_unit}
                </span>{" "}
                CO<sub>2</sub>e
              </span>{" "}
              {data?.activity_value > 0 ? (
                <span>
                  from{" "}
                  <span
                    style={{
                      background: "#ecdaff",
                      padding: "4px 6px",
                      borderRadius: "4px",
                      textTransform: "lowercase",
                      fontFamily: "Dm Sans",
                    }}
                  >
                    {data?.activity_value?.toFixed(2) || ""}{" "}
                    {data?.activity_unit || ""}
                  </span>{" "}
                  of activity with the emissions intensity of{" "}
                  <span
                    style={{
                      background: "#ecdaff",
                      padding: "4px 6px",
                      borderRadius: "4px",
                      fontFamily: "Dm Sans",
                    }}
                  >
                    {data?.intensity_value?.toFixed(2) || ""} kg CO<sub>2</sub>
                    e/
                    {data?.intensity_unit || ""}
                  </span>{" "}
                  <span>
                    <Tooltip
                      placement="top"
                      title={
                        <div>
                          <Typography variant="body1" style={{fontFamily: "Dm Sans"}}>
                            Intensity ratio excludes non t-km values e.g.
                            logistics hubs emissions
                          </Typography>
                        </div>
                      }
                    >
                      <InfoOutlined sx={{ mb: "-5px", cursor: "pointer" }} />
                    </Tooltip>
                  </span>
                </span>
              ) : (
                "from this activity."
              )}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontFamily: "Dm Sans",
                  fontSize: "16px",
                }}
                variant="subtitle2"
              >
                Lifecycle analysis
              </Typography>
              <Box
                sx={{ mt: 1, display: "flex", gap: 6, fontFamily: "Dm Sans" }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      fontFamily: "Dm Sans",
                    }}
                  >
                    <div
                      style={{
                        background: "#1a4dc4",
                        width: "12px",
                        height: "12px",
                        borderRadius: "2px",
                        fontFamily: "Dm Sans",
                      }}
                    ></div>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Typography
                        variant="caption"
                        style={{ fontFamily: "Dm Sans", fontSize: '14px'}}
                      >
                        Well to tank
                      </Typography>
                      <Tooltip
                        placement="top"
                        title={
                          <div>
                            <Typography variant="body1" style={{fontFamily: "Dm Sans"}}>
                              Emissions released to atmosphere during the
                              process of producing, storing, processing, and
                              distributing an energy carrier for vehicle
                              operation.
                            </Typography>
                          </div>
                        }
                      >
                        <InfoOutlined
                          fontSize="14px"
                          sx={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: "600",
                      mt: 0.5,
                      lineHeight: "2rem",
                      textTransform: "lowercase",
                      fontFamily: "Dm Sans",
                    }}
                  >
                    {data?.WTT_co2e_value?.toFixed(2) || ""}{" "}
                    {data?.WTT_co2e_unit || ""}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    fontFamily: "Dm Sans",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        fontFamily: "Dm Sans",
                      }}
                    >
                      <div
                        style={{
                          background: "#518ef8",
                          width: "12px",
                          height: "12px",
                          borderRadius: "2px",
                          fontFamily: "Dm Sans",
                        }}
                      ></div>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Typography
                          variant="caption"
                          style={{ fontFamily: "Dm Sans", fontSize: '14px'}}
                        >
                          Tank to wheel
                        </Typography>
                        <Tooltip
                          placement="top"
                          title={
                            <div>
                              <Typography variant="body1" style={{fontFamily: "Dm Sans"}}>
                              Emissions released to atmosphere as a result of vehicle operation.
                              </Typography>
                            </div>
                          }
                        >
                          <InfoOutlined
                            fontSize="14px"
                            sx={{ cursor: "pointer" }}
                          />
                        </Tooltip>
                      </Box>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "600",
                        mt: 0.5,
                        lineHeight: "2rem",
                        textTransform: "lowercase",
                        fontFamily: "Dm Sans",
                      }}
                    >
                      {data?.TTW_co2e_value?.toFixed(2) || ""}{" "}
                      {data?.TTW_co2e_unit || ""}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }} className="pledge-progress-bar">
              <LinearProgress
                variant="determinate"
                value={percentage(
                  data?.WTT_co2e_value,
                  data?.WTT_co2e_value + data?.TTW_co2e_value
                )}
                sx={{
                  height: "30px",
                  borderRadius: "4px",
                  fontFamily: "Dm Sans",
                  "& .MuiLinearProgress-root": {
                    background: "red",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                padding: "16px",
                border: "1px solid #8080803b",
                borderRadius: "8px",
                  justifyContent: 'space-between',
                my: 3,
                display: "flex",
                gap: 4,
              }}
            >
              <Box>
                <Box>
                  <Typography variant="body1" style={{fontFamily: "Dm Sans"}}>
                    Offset your carbon emission.
                  </Typography>
                </Box>
                <Box>
                  {" "}
                  <Typography variant="caption" style={{fontFamily: "Dm Sans"}}>
                      By offsetting this, you are supporting Global Carbon Avoidance and Removals ’23 Q1. Click the offset button below for more information.
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{ mt: 2, textTransform: 'none', fontFamily: "Dm Sans"}}
                  onClick={() => {
                    window.open(
                      `https://impact.pledge.io/lnk_GwkTfqmp?selected_amount_in_kg=${data?.em_co2e_value}`,
                      "_blank"
                    );
                  }}
                >
                  Offset emission
                </Button>
              </Box>
              <Box>
                <img
                  style={{ height: "115px" }}
                  src={ImpactImg}
                  alt=""
                />
              </Box>
            </Box>

            <Divider
              sx={{
                background: "#8080803b",
                height: "unset",
                my: 2,
                fontFamily: "Dm Sans",
              }}
            />
            {data?.distance_value > 0 && (
              <Box>
                <Typography
                  sx={{ fontWeight: 600, fontFamily: "Dm Sans" }}
                  variant="subtitle2"
                >
                  Details
                </Typography>
                <Divider
                  sx={{
                    background: "#8080803b",
                    height: "unset",
                    my: 2,
                    fontFamily: "Dm Sans",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      lineHeight: "unset",
                      display: "flex",
                      fontFamily: "Dm Sans",
                    }}
                  >
                    <LocationSearchingOutlined sx={{ mr: 1 }} fontSize="14px" />{" "}
                    Distance
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      textTransform: "lowercase",
                      fontFamily: "Dm Sans",
                    }}
                    variant="subtitle2"
                  >
                    {data?.distance_value?.toFixed(2) || ""}{" "}
                    {data?.distance_unit || "Km"}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    background: "#8080803b",
                    height: "unset",
                    my: 2,
                    fontFamily: "Dm Sans",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Dm Sans",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      lineHeight: "unset",
                      display: "flex",
                      fontFamily: "Dm Sans",
                    }}
                  >
                    <LineWeightOutlined sx={{ mr: 1 }} fontSize="14px" /> Weight
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      textTransform: "lowercase",
                      fontFamily: "Dm Sans",
                    }}
                    variant="subtitle2"
                  >
                    {data?.weight_value || ""} {data?.weight_unit || "Kg"}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

            <Box
                sx={{
                    padding: "16px",
                    border: "1px solid #8080803b",
                    borderRadius: "8px",
                    justifyContent: 'space-between',
                    my: 3,
                    display: "flex",
                    gap: 4,
                }}
            >
                <Box>
                    <Box sx={{
                        paddingBottom: "10px",
                        display: "flex",
                    }}>
                        <Typography sx={{
                            background: 'rgb(236, 218, 255)',
                            padding: '3px 5px',
                            borderRadius: '5px',
                            marginRight: '5px',
                            fontSize: '12px',
                        }} variant="body4">
                            Measure
                        </Typography>
                        <Typography sx={{
                            background: 'rgb(169, 243, 255)',
                            padding: '3px 5px',
                            borderRadius: '5px',
                            fontSize: '12px',
                        }} variant="body4">
                            No code
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" style={{fontFamily: "Dm Sans"}}>
                            Explore different variables of emission
                        </Typography>
                    </Box>
                    <Box>
                        {" "}
                        <Typography variant="caption" style={{fontFamily: "Dm Sans"}}>
                            Open the freight calculator, and tweak the different variables to see their impact.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{ mt: 2, textTransform: 'none', fontFamily: "Dm Sans"}}
                        onClick={() => {
                            window.open(
                                `https://app.pledge.io/calculators/freight`,
                                "_blank"
                            );
                        }}
                    >
                        Open calculator
                    </Button>
                </Box>
                <Box sx={{marginTop: '17px'}}>
                    <img
                        style={{ height: "130px" }}
                        src={calculator}
                        alt=""
                    />
                </Box>
            </Box>

          <Box
            sx={{
              width: "100%",
              typography: "subtitle2",
              mt: 2,
              fontFamily: "Dm Sans",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  fontFamily: "Dm Sans",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{
                      fontSize: "15px",
                      fontWeight: 500,
                      fontFamily: "Dm Sans",
                        textTransform: 'none',
                    }}
                    label="Details"
                    value="1"
                  />
                  <Tab
                    label="Emission"
                    value="2"
                    sx={{
                      fontSize: "15px",
                      fontWeight: 500,
                      fontFamily: "Dm Sans",
                        textTransform: 'none',
                    }}
                  />
                  <Tab
                    label="Accuracy"
                    value="3"
                    sx={{
                      fontSize: "15px",
                      fontWeight: 500,
                      fontFamily: "Dm Sans",
                        textTransform: 'none',
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ fontFamily: "Dm Sans" }}>
                {data && <PladgeDetails data={data} />}
              </TabPanel>
              <TabPanel value="2">
                {data && <EmissionDetails data={data} />}
              </TabPanel>
              <TabPanel value="3">
                {value == 3 && data && <AccuracyDetails data={data} />}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PledgeModal;
