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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import GaugeComponent from "react-gauge-component";
import {useState} from "react";

const AccuracyDetails = ({ data }) => {
  const [loadGuage, setLoadGuage] = useState(0)
  setTimeout(() => {
    setLoadGuage(data?.accuracy == 1
        ? 4
        : data?.accuracy == 2
            ? 3
            : data?.accuracy == 3
                ? 2
                : data?.accuracy >= 4
                    ? 1
                    : 1);
  }, 200)
  return (
    <Box>
      <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '1px solid #e6e4e4', borderRadius: '5px'}}>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '50%', marginTop: '20px'}}>
          <CircularProgressbar
        value={
          loadGuage
        }
        minValue={0}
        maxValue={4}
        text={`${data?.accuracy?.toFixed(2)}`}
        circleRatio={0.75}
        styles={buildStyles({
          rotation: 1 / 2 + 1 / 8,
          strokeLinecap: "butt",
          trailColor: "#eee",
          textColor: "#000000b3",
          pathColor:
            data?.accuracy == 1
              ? "green"
              : data?.accuracy == 2
              ? "#10a96b"
              : data?.accuracy == 3
              ? "orange"
              : data?.accuracy >= 4
              ? "red"
              : "red",
        })}
      />
        <Typography varient="title" style={{fontSize: '18px', marginTop: '-50px', marginBottom: '20px', fontWeight: 400}}>
          {data?.accuracy == 1
              ? "Excellent"
              : data?.accuracy == 2
                  ? "Good"
                  : data?.accuracy == 3
                      ? "Sufficient"
                      : data?.accuracy >= 4
                          ? "Unsatisfactory"
                          : "Unsatisfactory"}
        </Typography>
        </div>
        <Typography varient="title" style={{fontSize: '14px', marginBottom: '20px', fontWeight: 400}}>
          Overall Data Quality Indicator
        </Typography>
      </Box>
      {/* <GaugeComponent
         minValue={1}
        maxValue={4}
        value={3}
        arc={{
          width: 0.12,
          padding: 0.005,
          cornerRadius: 1,
          nbSubArcs: 4,
          subArcs: [{ limit: 1 }, { limit: 2 }, { limit: 3 }, { limit: 4 }],
          colorArray: ["red", "orange", "#08bf08", "green"],
        }}
        labels={{
          valueLabel: {
            hide: false,
            matchColorWithArc: true,
            formatTextValue: (value) => "2",
          },
          tickLabels: {
            hideMinMax: true,
          },
        }}
      /> */}
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
                  {data?.accuracy}
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
                        background:
                          data?.accuracy < 4 && data?.accuracy > 2
                            ? "orange"
                            : data?.accuracy < 4 && data?.accuracy > 1
                            ? "#10a96b"
                            : data?.accuracy < 2
                            ? "green"
                            : data?.accuracy == 4
                            ? "red"
                            : "red",
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
                        background:
                          data?.accuracy < 3 && data?.accuracy > 1
                            ? "#10a96b"
                            : data?.accuracy < 3 && data?.accuracy < 2
                            ? "green"
                            : data?.accuracy == 3
                            ? "orange"
                            : "#a7caed",
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
                        background:
                          data?.accuracy == 2
                            ? "#10a96b"
                            : data?.accuracy > 2
                            ? "#a7caed"
                            : "green",
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
                    value={100}
                    sx={{
                      height: "10px",
                      borderRadius: "25px",
                      flex: 1,
                      "& .MuiLinearProgress-bar": {
                        background: data?.accuracy == 1 ? "green" : "#a7caed",
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
    </Box>
  );
};

export default AccuracyDetails;
