import {
  Box,
  Divider,
  Drawer,
  LinearProgress,
  Tab,
  Typography,
} from "@mui/material";
import {
  Close,
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

const PledgeModal = ({ showDrawer, setShowDrawer }) => {
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

  console.log({ data });
  return (
    <Drawer
      anchor={"right"}
      open={showDrawer.show}
      className='right-side'
      sx={{
        width: "550px",
      }}
      onClose={() => setShowDrawer({ show: false })}
    >
      <Box width={550} className={'pledge-bar'}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            borderBottom: "1px solid #8080803b",
            fontFamily: 'Dm Sans'
          }}
          gap={2}
        >
          <Typography variant="subtitle1" style={{fontFamily: 'Dm Sans', fontSize: '20px'}}>Emissions Summary - SK{data?.job_id}</Typography>
          <div onClick={() => setShowDrawer({ show: false })}>
            <Close />
          </div>
        </Box>
        <Box sx={{ padding: "12px" }}>
          <Typography variant="subtitle2" sx={{ fontSize: '18px', fontWeight: "600", mb: 1, fontFamily: 'Dm Sans'}}>
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
              sx={{ fontWeight: "500", mt: 1, lineHeight: "2rem", fontFamily: 'Dm Sans', fontSize: '20px' }}
            >
              <span
                style={{
                  background: "#80008026",
                  padding: "4px 6px",
                  borderRadius: "4px",
                  fontFamily: 'Dm Sans'
                }}
              >
                {data?.em_co2e_value?.toFixed(2) || ""}{" "}
                <span style={{
                  textTransform: 'lowercase', fontFamily: 'Dm Sans'
                }}>{data?.em_co2e_unit}</span> CO<sub>2</sub>e
              </span>{" "}
              {data?.activity_value > 0 ? <span>
              from{" "}
              <span
                style={{
                  background: "#80008026",
                  padding: "4px 6px",
                  borderRadius: "4px",
                  textTransform: 'lowercase', fontFamily: 'Dm Sans'
                }}
              >
                {data?.activity_value?.toFixed(2) || ""}{" "}
                {data?.activity_unit || ""}
              </span>{" "}
              of activity with the emissions intensity of{" "}
              <span
                style={{
                  background: "#80008026",
                  padding: "4px 6px",
                  borderRadius: "4px",
                  fontFamily: 'Dm Sans'
                }}
              >
                {data?.intensity_value?.toFixed(2) || ""}{" "} kg CO<sub>2</sub>e/
                {data?.intensity_unit || ""}
              </span>
                </span> : 'from this activity.'}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontWeight: 600, fontFamily: 'Dm Sans', fontSize: '16px' }} variant="subtitle2">
                Lifecycle analysis
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 6, fontFamily: 'Dm Sans' }}>
                <Box>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center", fontFamily: 'Dm Sans' }}>
                    <div
                      style={{
                        background: "#1976d2",
                        width: "10px",
                        height: "10px",
                        borderRadius: "2px", fontFamily: 'Dm Sans'
                      }}
                    ></div>
                    <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>Well to tank</Typography>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "600", mt: 0.5, lineHeight: "2rem", textTransform: 'lowercase', fontFamily: 'Dm Sans' }}
                  >
                    {data?.WTT_co2e_value?.toFixed(2) || ""}{" "}
                    {data?.WTT_co2e_unit || ""}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", fontFamily: 'Dm Sans' }}>
                  <Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center", fontFamily: 'Dm Sans' }}>
                      <div
                        style={{
                          background: "#a7caed",
                          width: "10px",
                          height: "10px",
                          borderRadius: "2px", fontFamily: 'Dm Sans'
                        }}
                      ></div>
                      <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>Tank to wheel</Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "600", mt: 0.5, lineHeight: "2rem", textTransform: 'lowercase', fontFamily: 'Dm Sans' }}
                    >
                      {data?.TTW_co2e_value?.toFixed(2) || ""}{" "}
                      {data?.TTW_co2e_unit || ""}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <LinearProgress
                variant="determinate"
                value={percentage(
                  data?.WTT_co2e_value,
                  data?.WTT_co2e_value + data?.TTW_co2e_value
                )}
                sx={{
                  height: "24px",
                  borderRadius: "4px", fontFamily: 'Dm Sans'
                }}
              />
            </Box>

            <Divider sx={{ background: "#8080803b", height: "unset", my: 2, fontFamily: 'Dm Sans' }} />
            {data?.distance_value > 0 && <Box>
              <Typography sx={{ fontWeight: 600, fontFamily: 'Dm Sans' }} variant="subtitle2">
                Details
              </Typography>
              <Divider
                sx={{ background: "#8080803b", height: "unset", my: 2, fontFamily: 'Dm Sans' }}
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
                  sx={{ lineHeight: "unset", display: "flex", fontFamily: 'Dm Sans' }}
                >
                  <LocationSearchingOutlined sx={{ mr: 1 }} fontSize="14px" />{" "}
                  Distance
                </Typography>
                <Typography sx={{ fontWeight: 600, textTransform: 'lowercase', fontFamily: 'Dm Sans' }} variant="subtitle2">
                  {data?.distance_value?.toFixed(2) || ""}{" "}
                  {data?.distance_unit || "Km"}
                </Typography>
              </Box>
              <Divider
                sx={{ background: "#8080803b", height: "unset", my: 2, fontFamily: 'Dm Sans' }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", fontFamily: 'Dm Sans'
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ lineHeight: "unset", display: "flex", fontFamily: 'Dm Sans' }}
                >
                  <LineWeightOutlined sx={{ mr: 1 }} fontSize="14px" /> Weight
                </Typography>
                <Typography sx={{ fontWeight: 600, textTransform: 'lowercase', fontFamily: 'Dm Sans' }} variant="subtitle2">
                  {data?.weight_value || ""} {data?.weight_unit || "Kg"}
                </Typography>
              </Box>
            </Box>}
          </Box>

          <Box sx={{ width: "100%", typography: "subtitle2", mt: 2, fontFamily: 'Dm Sans' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider", fontFamily: 'Dm Sans' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{ fontSize: "12px", fontWeight: 600, fontFamily: 'Dm Sans' }}
                    label="Details"
                    value="1"
                  />
                  <Tab
                    label="Emission"
                    value="2"
                    sx={{ fontSize: "12px", fontWeight: 600, fontFamily: 'Dm Sans' }}
                  />
                  <Tab
                    label="Accuracy"
                    value="3"
                    sx={{ fontSize: "12px", fontWeight: 600, fontFamily: 'Dm Sans' }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ padding: "12px 0px", fontFamily: 'Dm Sans' }}>
                <PladgeDetails data={data} />
              </TabPanel>
              <TabPanel value="2">
                <EmissionDetails data={data} />
              </TabPanel>
              <TabPanel value="3">
                {value == 3 && <AccuracyDetails data={data} />}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PledgeModal;
