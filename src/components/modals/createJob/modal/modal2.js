/* eslint-disable import/no-anonymous-default-export */
import {
  Box,
  DialogContent,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Address from "./AsychronousAddress";

export default (props) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        color: "#0f2851",
      },
    },
  };
  const dispatch = useDispatch();
  const order = useSelector((state) => state?.order);
  const timeSlot = useSelector((state) => state?.timeSlot);
  const [error, setErrors] = useState(false);
  const { handleValue, setSelected, selected } = props;
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(1);
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

  const handleSelectedPostCode = (udprn) => {
    setErrors(false);
    if (udprn) {
      fetch(
        `https://api.ideal-postcodes.co.uk/v1/addresses/${udprn}/?api_key=ak_jc635mjv12swIsWCiEJWOAiDG0W84`
      )
        .then((response) => response.json())
        .then((response) => {
          const { line_1, line_2, county, postcode_outward } = response.result;
          const address = `${line_1}, ${line_2}, ${county}, ${postcode_outward}`;
          const data = {
            address,
            postcode: response.result.postcode,
            addressData: response.result,
          };

          let data2 = {
            service_type: order?.service?.service?.service_id,
            is_app: 0,
            post_code: response.result.postcode,
          };
        });
    } else {
    }
  };

  const handleDate = (date) => {
    // @ts-ignore
    let t_date = Date.parse(new Date());
    // @ts-ignore
    let d_date = Date.parse(date ? date : new Date());
  };

  return (
    <>
      <Grid container marginTop={2}>
        <Grid item xs={12}>
          <label className="img-caption">What type of hire do you need?</label>

          <FormControl
            fullWidth
            size="small"
            sx={{
              background: "#fff",
              borderRadius: "16px",
              marginTop: "10px",
            }}
          >
            <Select
              displayEmpty
              name="waste_types"
              defaultValue="one"
              MenuProps={MenuProps}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Waste Types</em>;
                }

                return `Waste management`;
              }}
              sx={{ width: "100%", color: "#677790" }}
              inputProps={{
                placeholder: "Waste Type",
                labelShrink: true,
              }}
              size={"small"}
            >
              <MenuItem
                sx={{
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                }}
                value="one"
              >
                Waste management
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container marginTop={2}>
        <Grid item xs={12}>
          <label className="img-caption">Select date</label>

          <FormControl
            fullWidth
            size="small"
            sx={{
              background: "#fff",
              borderRadius: "16px",
              marginTop: "10px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                inputFormat="MM/DD/YYYY"
                disableOpenPicker
                value={order?.date}
                style={{ color: "#677790" }}
                disablePast
                onChange={(e) => handleDate(e)}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    className="img-caption"
                    sx={{ color: "#677790" }}
                    onClick={(e) => setOpen(true)}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={12}>
          <label className="img-caption">Select timeslot </label>
          <Grid
            container
            sx={{
              background: "#fff",
              padding: "2px",
              borderRadius: "16px",
            }}
            marginTop={1}
          >
            <Grid
              item
              xs={6}
              padding={1}
              className="pointer"
              sx={{
                background: "linear-gradient(180deg, #73C6F9 0%, #5391F9 100%)",
                borderRadius: "16px",
              }}
              onClick={() => {}}
            >
              <p className="img-caption" style={{ color: "#fff" }}>
                08:00-12:00
              </p>
            </Grid>
            <Grid
              item
              xs={6}
              padding={1}
              className="pointer"
              sx={{
                background: "#fff",
                borderRadius: "16px",
              }}
              onClick={() => {}}
            >
              <p className="img-caption">08:00-12:00</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container marginTop={1}>
        <Grid item xs={12}>
          <label className="img-caption">Site location </label>
        </Grid>
        <Grid
          item
          xs={12}
          marginTop={1}
          sx={{
            background: "#FFFFFF",
            boxShadow: " 0px 17px 24px rgba(58, 58, 58, 0.05)",
            borderRadius: "16px",
            padding: 1,
          }}
        >
          {/* <Box display="flex" alignItems="center">
            <img
              style={{
                height: "20px",
              }}
              src="/images/modal/radio-unchecked.svg"
              alt=""
            />
            <label className="img-caption ml-10">Site location </label>
          </Box> */}
          <Box display="flex" alignItems="center">
            <img
              style={{
                height: "16px",
              }}
              src="/images/modal/plus.svg"
              alt=""
            />
            <FormControl
              fullWidth
              size="small"
              sx={{
                background: "#fff",
                borderRadius: "16px",
              }}
            >
              <Address
                handleSelectedPostCode={(value) =>
                  handleSelectedPostCode(value)
                }
                order={order}
              />
            </FormControl>

            {/* <label className="img-caption ml-10">Or add a new site </label> */}
          </Box>
        </Grid>
      </Grid>
      <Box>
        {error && (
          <FormHelperText sx={{ color: "red", mt: 1 }}>
            Thank you for your request, in order to proceed with your booking we
            need to confirm some details. Please call us on 0330 133 1561
          </FormHelperText>
        )}
      </Box>
      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={12}>
          <label className="img-caption">Instructions for your driver </label>
          <Box marginTop={1}>
            <TextField
              rows={3}
              multiline
              value={order?.message ? order?.message : ""}
              placeholder="Please tell us anything that may assist with your delivery..."
              sx={{
                background: "#FFFFFF",
                boxShadow: "0px 17px 24px rgba(58, 58, 58, 0.05)",
                borderRadius: " 16px",
                width: "100%",
              }}
              onChange={(e) => {}}
            />
          </Box>
        </Grid>
      </Grid>
      {order?.date && timeSlot?.data?.length === 0 && (
        <FormHelperText sx={{ color: "red", mt: 1 }}>
          Oops! Looks like we do not have any available slots for your chosen
          date, at the moment. Try another date?
        </FormHelperText>
      )}
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
              handleValue(3);
            }}
            disabled={
              order?.address === null ||
              order?.timeSlot === null ||
              timeSlot?.data?.length === 0 ||
              order?.date === null ||
              error
            }
          >
            Continue
          </button>
        </Grid>
      </Grid>
    </>
  );
};
