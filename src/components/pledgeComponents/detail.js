import { LocalShippingOutlined, LocationOnOutlined } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import React from "react";
import PolylineComp from "./polyline";

const PladgeDetails = ({ data }) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 600, fontFamily: 'Dm Sans' }} variant="subtitle2">
        Route
      </Typography>

      <Timeline sx={{ padding: "6px 0px 6px 6px", margin: 0 }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ background: "#d18ddb85", fontFamily: 'Dm Sans' }}>
              <LocationOnOutlined sx={{ color: "#dd00fd" }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2, fontFamily: 'Dm Sans' }}>
            <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>
              {data?.pledges_date || ""}
            </Typography>
            <Box>
              <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>
                ({data?.start_lat},{data?.start_lng})
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ background: "#7bbcf485" }}>
              <LocalShippingOutlined sx={{ color: "#0087fd" }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2, fontFamily: 'Dm Sans' }}>
            <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>{data?.mode || ""}</Typography>
            <Box>
              <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>Main carriage</Typography>
            </Box>
            <Box
              sx={{
                padding: "12px",
                border: "1px solid #8080803b",
                borderRadius: "8px",
                display: "flex",
                background: "#80808017", fontFamily: 'Dm Sans'
              }}
            >
              <Box flex={1} borderLeft={"2px solid #458dd5"}>
                <Box pl={1.5}>
                  <Typography variant="caption" fontWeight={600} style={{textTransform: 'lowercase', fontFamily: 'Dm Sans'}}>
                    {data?.em_co2e_value?.toFixed(2) || ""} {data?.em_co2e_unit || ""}
                  </Typography>
                  <Box>
                    <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>CO<sub>2</sub>e</Typography>
                  </Box>
                </Box>
              </Box>
              {data?.distance_value > 0 && <Box flex={1} borderLeft={"2px solid #458dd5"}>
                <Box pl={1.5}>
                  <Typography variant="caption" fontWeight={600} style={{textTransform: 'lowercase', fontFamily: 'Dm Sans'}}>
                    {data?.distance_value?.toFixed(2) || ""} {data?.distance_unit || ""}
                  </Typography>
                  <Box>
                    <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>Distance</Typography>
                  </Box>
                </Box>
              </Box>}
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ background: "#d18ddb85" }}>
              <LocationOnOutlined sx={{ color: "#dd00fd" }} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2, fontFamily: 'Dm Sans' }}>
            <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>
              {data?.pledges_date || ""}
            </Typography>
            <Box>
              <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>
                {" "}
                ({data?.destination_lat},{data?.destination_lng})
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <Box width={"100%"}>
        {data?.start_lat && <PolylineComp start_lat={data?.start_lat} start_lng={data?.start_lng} destination_lat={data?.destination_lat} destination_lng={data?.destination_lng} />}
      </Box>
    </Box>
  );
};

export default PladgeDetails;
