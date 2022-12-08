// ** React Imports
import { useMemo, useState } from "react";

// ** MUI Imports
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "./style.scss";

import Select from "@mui/material/Select";
import { InputAdornment, ListSubheader, Menu, TextField } from "@mui/material";
import React from "react";
import { KeyboardArrowDown } from "@mui/icons-material";

const SingleSelect = (props) => {
  const { data, value, handleChange, loading, name, error } = props;

  const containsText = (text, searchText) =>
    text?.toLowerCase()?.indexOf(searchText?.toLowerCase()) > -1;

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () =>
      data?.filter((option) => containsText(option.job_address, searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchText]
  );

  return (
    <FormControl
      // sx={{
      //   width: "300px",
      // }}
      size="small"
      fullWidth
      className="single-select-main"
    >
      <Select
        fullWidth
        name={name}
        className="filter-option"
        id="demo-simple-select-outlined"
        value={value ? value : ""}
        error={error}
        displayEmpty
        onChange={handleChange}
        IconComponent={() => (
          <KeyboardArrowDown
            sx={{
              color: "#518ef8",
              fontSize: "20px",
            }}
          />
        )}
        sx={{ width: "100%" }}
        size={"small"}
      >
        <ListSubheader>
          <TextField
            size="small"
            autoFocus
            fullWidth
            value={searchText}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position='start'>
            //       <SearchIcon />
            //     </InputAdornment>
            //   )
            // }}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        <MenuItem value=""> All Sites</MenuItem>
        {displayedOptions?.length > 0 ? (
          displayedOptions?.map((single) => (
            <MenuItem
              key={single.address_id}
              value={single.address_id}
              sx={{
                fontSize: "12px",
                minWidth: "250px",
                color: "#518ef8",
                fontWeight: "normal",
              }}
            >
              {single.job_address}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No options</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SingleSelect;
