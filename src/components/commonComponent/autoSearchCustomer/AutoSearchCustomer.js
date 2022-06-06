import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// import CustomerService from "../../services/customer.service";
import axios from "axios";

export default function AutoSearchCustomer({handleSelectedCustomer}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    // const onChangeHandle = (value) => {
    //     if (value && value != "+") {
    //         CustomerService.list({search: value}).then((response) => {
    //             setOptions(response.data.data);
    //         });
    //     }
    // };

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
            getOptionLabel={(option) =>
                // option.user_name
                `${option.info.first_name} ${option.info.last_name} (${option.user_name})`
            }
            onChange={(event, value) => handleSelectedCustomer(value && value.user_id)}
            options={options}
            filterOptions={(options, state) => {
                const fOptions = options.filter((val) => {
                    if (val.info == null) {
                        return;
                    }
                    const inputValue = state.inputValue.toLowerCase();
                    const firstName = val.info.first_name ? val.info.first_name : "";
                    const lastName = val.info.last_name ? val.info.last_name : "";
                    const userName = val.user_name ? val.user_name : "";
                    const email = val.info.email ? val.info.email : "";
                    const mobNumber = val.info.mobile_number
                        ? val.info.mobile_number
                        : "";
                    return (
                        firstName.toLowerCase().includes(inputValue) ||
                        lastName.toLowerCase().includes(inputValue) ||
                        userName.toLowerCase().includes(inputValue) ||
                        email.toLowerCase().includes(inputValue) ||
                        mobNumber.toLowerCase().includes(inputValue)
                    );
                });
                return fOptions;
                // return options
            }}
            // loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="search customer"
                    variant="outlined"
                    // onChange={(ev) => {
                    //     if (ev.target.value !== "" || ev.target.value !== null) {
                    //         onChangeHandle(ev.target.value);
                    //     }
                    // }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {/* {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null} */}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        )
                    }}
                />
            )}
        />
    );
}
