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
import FindPostCode from "../jobsDetail/findPostCode/FindPostCode";

const PladgeDetails = ({ data }) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
        Route
      </Typography>

      <Timeline sx={{ padding: "6px 0px 6px 6px", margin: 0 }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ background: "#d18ddb85" }}>
              <LocationOnOutlined sx={{ color: "#dd00fd" }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="caption">
              {data?.pledges_date || ""}
            </Typography>
            <Box>
              <Typography variant="caption">
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
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="caption">{data?.mode || ""}</Typography>
            <Box>
              <Typography variant="caption">{data?.type || ""}</Typography>
            </Box>
            <Box
              sx={{
                padding: "12px",
                border: "1px solid #8080803b",
                borderRadius: "8px",
                display: "flex",
                background: "#80808017",
              }}
            >
              <Box flex={1} borderLeft={"2px solid #458dd5"}>
                <Box pl={1.5}>
                  <Typography variant="caption" fontWeight={600}>
                    {data?.em_co2e_value || ""} {data?.em_co2e_unit || ""}
                  </Typography>
                  <Box>
                    <Typography variant="caption">Co2e</Typography>
                  </Box>
                </Box>
              </Box>
              <Box flex={1} borderLeft={"2px solid #458dd5"}>
                <Box pl={1.5}>
                  <Typography variant="caption" fontWeight={600}>
                    {data?.distance_value || ""} {data?.distance_unit || ""}
                  </Typography>
                  <Box>
                    <Typography variant="caption">Distance</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ background: "#d18ddb85" }}>
              <LocationOnOutlined sx={{ color: "#dd00fd" }} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="caption">
              {data?.pledges_date || ""}
            </Typography>
            <Box>
              <Typography variant="caption">
                {" "}
                ({data?.destination_lat},{data?.destination_lng})
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <Box width={"100%"}>
        <FindPostCode lat={51.40196} lng={0.29227} />
      </Box>
    </Box>
  );
};

export default PladgeDetails;
