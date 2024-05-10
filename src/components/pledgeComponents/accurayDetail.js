import { LocalShippingOutlined, LocationOnOutlined } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Divider, LinearProgress, Typography } from "@mui/material";
import GaugeComponent from 'react-gauge-component'
import FindPostCode from "../jobsDetail/findPostCode/FindPostCode";

const AccuracyDetails = ({ data }) => {
  return (
    <Box>
      <GaugeComponent
          //type="radial"
          minValue={1}
          maxValue={4}
          value={3}
          arc={{
            width: 0.12,
            padding: 0.005,
            cornerRadius: 1,
            nbSubArcs: 4,
            subArcs: [{limit: 1}, {limit: 2},{limit: 3}, {limit: 4}],
            colorArray: ['red', 'orange', '#08bf08', 'green'],
          }}
          labels={{
            valueLabel:{
              hide: false,
              matchColorWithArc:true,
              formatTextValue: (value) => "2"
            },
            tickLabels: {
              hideMinMax: true,
            }
          }}
      />
      <Timeline sx={{ padding: "6px 0px 6px 6px", margin: 0 }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ background: "#d18ddb85" }}>
              <LocationOnOutlined sx={{ color: "#dd00fd" }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="caption">May 07 2024, 16:20</Typography>
            <Box>
              <Typography variant="caption">(51.40196,0.29279)</Typography>
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
            <Typography variant="caption">{data?.mode || "Road"}</Typography>
            <Box>
              <Typography variant="caption">
                {data?.type || "Main carriage"}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "12px",
                border: "1px solid #8080803b",
                borderRadius: "8px",
                background: "#80808017",
              }}
              mb={2}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="caption" fontWeight={600}>
                  Data Quality Indicator
                </Typography>
                <Typography variant="caption" fontWeight={600}>
                  2
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 0.2, mt: 1 }}>
                <Box flex={1} textAlign={"center"}>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      height: "10px",
                      borderRadius: "25px",
                      flex: 1,
                      "& .MuiLinearProgress-bar": {
                        background: "#10a96b",
                      },
                    }}
                  />
                  <Typography variant="caption" mt={1}>
                    Unsatisfactory
                  </Typography>
                </Box>
                <Box flex={1} textAlign={"center"}>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      height: "10px",
                      borderRadius: "25px",
                      flex: 1,
                      "& .MuiLinearProgress-bar": {
                        background: "#10a96b",
                      },
                    }}
                  />
                  <Typography variant="caption" mt={1}>
                    Sufficent
                  </Typography>
                </Box>
                <Box flex={1} textAlign={"center"}>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      height: "10px",
                      borderRadius: "25px",
                      flex: 1,
                      "& .MuiLinearProgress-bar": {
                        background: "#10a96b",
                      },
                    }}
                  />
                  <Typography variant="caption" mt={1}>
                    Good
                  </Typography>
                </Box>
                <Box flex={1} textAlign={"center"}>
                  <LinearProgress
                    variant="determinate"
                    value={0}
                    sx={{
                      height: "10px",
                      borderRadius: "25px",
                      flex: 1,
                      "& .MuiLinearProgress-bar": {
                        background: "#10a96b",
                      },
                    }}
                  />
                  <Typography variant="caption" mt={1}>
                    Excellent
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                padding: "12px",
                border: "1px solid #8080803b",
                borderRadius: "8px",
                background: "#80808017",
              }}
            >
              <table style={{ width: "100%" }}>
                <thead>
                  <td>
                    <Typography variant="caption">Input </Typography>
                  </td>
                  <Typography variant="caption">Level</Typography>
                  <td style={{ textAlign: "right" }}>
                    <Typography variant="caption"></Typography>
                  </td>
                </thead>

                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <Divider
                        sx={{ background: "#8080803b", height: "unset", my: 1 }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="caption">
                        Origin-destination
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="caption">post code</Typography>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Typography variant="caption">1</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="caption">Weight</Typography>
                    </td>
                    <td>
                      <Typography variant="caption">Actual</Typography>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Typography variant="caption">2-1</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="caption">
                        Emission intensity
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="caption">Molded</Typography>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Typography variant="caption">1</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
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
            <Typography variant="caption">May 07 2024, 16:45</Typography>
            <Box>
              <Typography variant="caption">(51.40196,0.29279)</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
};

export default AccuracyDetails;
