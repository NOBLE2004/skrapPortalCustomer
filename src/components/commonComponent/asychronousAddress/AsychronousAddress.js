import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AsychronousAddress({
  handleSelectedPostCode,
  inputClass,
  error,
  address,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

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

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
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
      defaultValue={{ suggestion: address ?address :"" }}
      getOptionLabel={(option) => option.suggestion}
      onChange={(event, value) => handleSelectedPostCode(value && value.udprn)}
      options={options}
      filterOptions={(options, state) => {
        return options;
      }}
      // loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for an address"
          variant="outlined"
          name="address"
          // error={error.length > 0 ? true : false}
          onChange={(ev) => {
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {/* {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null} */}
                {/* {params.InputProps.endAdornment} */}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
