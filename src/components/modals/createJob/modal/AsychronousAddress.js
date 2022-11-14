import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
 
export default function AsychronousAddress({
  handleSelectedPostCode,
  order,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const onChangeHandle = (search) => {
    if (search) {
      fetch(
        `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=ak_jc635mjv12swIsWCiEJWOAiDG0W84&query=${search}`
      )
        .then((response) => response.json())
        .then((data) => {
          setOptions(data.result.hits.map((data) => data));
        });
    }
    
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      // @ts-ignore
      margin="dense"
      size="small"
      noOptionsText="Not found"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      defaultValue={{
        suggestion: order?.address?.address ? order?.address?.address : "",
      }}
      getOptionLabel={(option) => (option.suggestion ? option.suggestion : "")}
      // @ts-ignore
      onChange={(event, value) => handleSelectedPostCode(value && value.udprn)}
      options={options}
      filterOptions={(options) => {
        return options;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          name="address"
          placeholder="Or add a new site "
          onChange={(ev) => {
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: <React.Fragment />,
          }}
        />
      )}
    />
  );
}
