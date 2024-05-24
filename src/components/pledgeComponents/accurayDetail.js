import {
  InfoOutlined,
  LocalShippingOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Box,
  Divider,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useState } from "react";
import "./style.scss";

const AccuracyDetails = ({ data }) => {
  const [loadGuage, setLoadGuage] = useState(0);
  data.accuracy = data?.accuracy == null ? 2 : data?.accuracy;
  setTimeout(() => {
    setLoadGuage(
      data?.accuracy == 1
        ? 4
        : data?.accuracy == 2
        ? 3
        : data?.accuracy == 3
        ? 2
        : data?.accuracy >= 4
        ? 1
        : 1
    );
  }, 200);
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: "1px solid #8080803b",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "35%",
            marginTop: "20px",
            fontFamily: "Dm Sans",
          }}
        >
          <CircularProgressbar
            value={loadGuage}
            minValue={0}
            maxValue={4}
            text={`${data?.accuracy?.toFixed(2)}`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee",
              textColor: "#000000b3",
              fontFamily: "Dm Sans",
              pathColor:
                data?.accuracy == 1
                  ? "green"
                  : data?.accuracy == 2
                  ? "#32d583"
                  : data?.accuracy == 3
                  ? "orange"
                  : data?.accuracy >= 4
                  ? "red"
                  : "red",
            })}
          />
          <Typography
            varient="title"
            style={{
              fontSize: "18px",
              marginTop: "-50px",
              marginBottom: "20px",
              fontWeight: 400,
              fontFamily: "Dm Sans",
            }}
          >
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
        <Box display={"flex"} alignItems="center" gap={0.5} mb={3}>
          <Typography
            varient="title"
            style={{
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: "Dm Sans",
            }}
          >
            Overall Data Quality Indicator
          </Typography>
          <Tooltip
            placement="top"
            title={
              <div>
                <Typography variant="body1" style={{fontFamily: "Dm Sans"}}>
                  A weighted average of each transport chain element's Data
                  Quality Indicator.
                </Typography>
              </div>
            }
          >
            <InfoOutlined fontSize="14px" sx={{ cursor: "pointer" }} />
          </Tooltip>
        </Box>
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
              <LocationOnOutlined sx={{ color: "#6900d7" }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="caption" style={{ fontFamily: "Dm Sans" }}>
              {data?.pledges_date || ""}
            </Typography>
            <Box>
              <Typography variant="caption" style={{ fontFamily: "Dm Sans" }}>
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
            <Typography variant="caption" style={{ fontFamily: "Dm Sans" }}>
              {data?.mode || "Road"}
            </Typography>
            <Box>
              <Typography variant="caption" style={{ fontFamily: "Dm Sans" }}>
                Main carriage
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="caption"
                    style={{ fontFamily: "Dm Sans" }}
                    fontWeight={600}
                  >
                    Data Quality Indicator
                  </Typography>
                  <Tooltip
                    placement="top"
                    title={
                      <div>
                        <Typography variant="body1" style={{fontFamily: "Dm Sans"}}>
                          A tiered quality ranking indicator that can be applied
                          to transport chains or transport chain elements.
                        </Typography>
                      </div>
                    }
                  >
                    <InfoOutlined fontSize="14px" sx={{ cursor: "pointer" }} />
                  </Tooltip>
                </Box>
                <Box>
                  <p
                    variant="caption"
                    style={{
                      fontFamily: "Dm Sans",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#32d583",
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                    fontWeight={600}
                  >
                    {data?.accuracy}
                  </p>
                </Box>
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
                            ? "#32d583"
                            : data?.accuracy < 2
                            ? "green"
                            : data?.accuracy == 4
                            ? "red"
                            : "red",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    style={{ fontFamily: "Dm Sans" }}
                    mt={1}
                  >
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
                            ? "#32d583"
                            : data?.accuracy < 3 && data?.accuracy < 2
                            ? "green"
                            : data?.accuracy == 3
                            ? "orange"
                            : "#e9e8e6",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    style={{ fontFamily: "Dm Sans" }}
                    mt={1}
                  >
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
                            ? "#32d583"
                            : data?.accuracy > 2
                            ? "#e9e8e6"
                            : "green",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    style={{ fontFamily: "Dm Sans" }}
                    mt={1}
                  >
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
                        background: data?.accuracy == 1 ? "green" : "#e9e8e6",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    mt={1}
                    style={{ fontFamily: "Dm Sans" }}
                  >
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
              <table style={{ width: "100%" }} className="accuracy-table">
                <thead>
                  <td>
                    <Typography
                      variant="caption"
                      style={{ fontFamily: "Dm Sans" }}
                    >
                      Input{" "}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="caption"
                      style={{ fontFamily: "Dm Sans" }}
                    >
                      Level
                    </Typography>
                  </td>
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
                      <Typography
                        variant="caption"
                        style={{ fontFamily: "Dm Sans" }}
                      >
                        Origin-destination
                      </Typography>
                    </td>
                    <td style={{width:"50%"}}>
                      <Typography
                        variant="caption"
                        style={{ fontFamily: "Dm Sans" }}
                      >
                        Postal code/ coordinates/ planned distance
                      </Typography>
                    </td>
                    <td style={{ display: "flex", justifyContent: "flex-end" }}>
                      <p
                        variant="caption"
                        style={{
                          fontFamily: "Dm Sans",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "#0569ff",
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                        fontWeight={600}
                      >
                        1
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography
                        variant="caption"
                        style={{ fontFamily: "Dm Sans" }}
                      >
                        Weight
                      </Typography>
                    </td>
                    <td style={{width:"50%"}}>
                      <Typography
                        variant="caption"
                        style={{ fontFamily: "Dm Sans" }}
                      >
                        Actual
                      </Typography>
                    </td>
                    <td style={{ display: "flex", justifyContent: "flex-end" }}>
                      <p
                        variant="caption"
                        style={{
                          fontFamily: "Dm Sans",
                          width: "40px",
                          height: "22px",
                          borderRadius: "50px",
                          background: "#32d583",
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                        fontWeight={600}
                      >
                        2-1
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography
                        variant="caption"
                        style={{ fontFamily: "Dm Sans" }}
                      >
                        Emission intensity
                      </Typography>
                    </td>
                    <td style={{width:"50%"}}>
                      {data?.accuracy > 2 ? (
                        <Typography
                          variant="caption"
                          style={{ fontFamily: "Dm Sans" }}
                        >
                          Default value
                        </Typography>
                      ) : (
                        <Typography
                        variant="caption"
                          style={{ fontFamily: "Dm Sans" }}
                        >
                          {" "}
                          Modeled or carrier- specific annual emission intensity
                          factor
                        </Typography>
                      )}
                    </td>
                    <td style={{ display: "flex", justifyContent: "flex-end" }}>
                      <p
                        variant="caption"
                        style={{
                          fontFamily: "Dm Sans",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "#32d583",
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                        fontWeight={600}
                      >
                        {data?.accuracy}
                      </p>
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
              <LocationOnOutlined sx={{ color: "#6900d7" }} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="caption" style={{ fontFamily: "Dm Sans" }}>
              {data?.pledges_date || ""}
            </Typography>
            <Box>
              <Typography variant="caption" style={{ fontFamily: "Dm Sans" }}>
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
