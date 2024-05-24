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

const EmissionDetails = ({ data }) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 600, fontFamily: 'Dm Sans'}} variant="subtitle2">
        Emissions
      </Typography>

      <Typography variant="caption" mt={1} style={{fontFamily: 'Dm Sans'}}>
        This is a breakdown of emissions of shipment showing what was produced
        for leg.
      </Typography>

      <Timeline sx={{ padding: "6px 0px 6px 6px", margin: 0, fontFamily: 'Dm Sans' }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ background: "#d18ddb85" }}>
              <LocationOnOutlined sx={{ color: "#6900d7" }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
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
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>{data?.mode || "Road"}</Typography>
            <Box>
              <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>
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
            >
              <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>CO2 equivalent C02e</Typography>
              <Divider
                sx={{ background: "#8080803b", height: "unset", my: 1 }}
              />
              <table style={{ width: "100%", marginTop: "10px" }}>
                <thead>
                  <td>
                    <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>WTT</Typography>
                  </td>
                  <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>TTW</Typography>
                  <td style={{ textAlign: "right" }}>
                    <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>Total</Typography>
                  </td>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>
                        {data?.WTT_co2e_value?.toFixed(2)} {data?.WTT_co2e_unit}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>
                        {data?.TTW_co2e_value?.toFixed(2)} {data?.TTW_co2e_unit}
                      </Typography>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Typography variant="caption" style={{fontFamily: 'Dm Sans'}}>
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
              <LocationOnOutlined sx={{ color: "#6900d7" }} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
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
    </Box>
  );
};

export default EmissionDetails;
