import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import JobService from "../../../services/job.service";

export default function AsychronousAddress({
  handleSelectedPostCode,
  inputClass,
  error,
  address,
  sites
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [recentAddresses, setRecentAddresses] = React.useState([]);
  const loading = open && options.length === 0;
  const onChangeHandle = (search) => {
    if (search) {
      fetch(
        `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=ak_jc635mjv12swIsWCiEJWOAiDG0W84&query=${search}`
      )
        .then((response) => response.json())
        .then((data) => {
          setOptions(data.result.hits);
        });
    }
  };
    useEffect(()=>{
        JobService.getRecentAddresses({user_id: localStorage.getItem("user_id"), limit: 0})
            .then((response) => {
                if(response.data.code === 0){
                    const addresses = response.data.result.map((data) => {
                        data.suggestion = `${data.line_1}, ${data.post_town}, ${data.postcode}`;
                        return data;
                    });
                    setRecentAddresses(addresses);
                }
            }).catch(error => {
            console.log(error);
        })
    }, []);
  React.useEffect(() => {
    if (!open) {
      setOptions(recentAddresses);
    }
  }, [open, recentAddresses]);
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
      disabled={sites}
      defaultValue={{ suggestion: address ? address : '' }}
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
          placeholder={sites ? address : "Search for an address"}
          variant="outlined"
          name="address"
          error={error.length > 0 ? true : false}
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
