import { LocalShippingOutlined, LocationOnOutlined } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Divider, Typography } from "@mui/material";
import FindPostCode from "../jobsDetail/findPostCode/FindPostCode";

const EmissionDetails = ({ data }) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
        Emissions
      </Typography>

      <Typography variant="caption" mt={1}>
        This is a breakdown of emissions of shipment showing what was produced
        for leg.
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
            >
              <Typography variant="caption">CO2 equivalent C02e</Typography>
              <Divider
                sx={{ background: "#8080803b", height: "unset", my: 1 }}
              />
              <table style={{ width: "100%", marginTop: "10px" }}>
                <thead>
                  <td>
                    <Typography variant="caption">WTT</Typography>
                  </td>
                  <Typography variant="caption">TTW</Typography>
                  <td style={{ textAlign: "right" }}>
                    <Typography variant="caption">Total</Typography>
                  </td>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <Typography variant="caption">
                        {data?.WTT_co2e_value?.toFixed(2)} {data?.WTT_co2e_unit}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="caption">
                        {data?.TTW_co2e_value?.toFixed(2)} {data?.TTW_co2e_unit}
                      </Typography>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Typography variant="caption">
                        {Number(
                          data?.WTT_co2e_value + data?.TTW_co2e_value
                        )?.toFixed(2)}{" "}
                        {data?.WTT_co2e_unit}
                      </Typography>
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

export default EmissionDetails;
