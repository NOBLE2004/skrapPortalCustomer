// ** React Imports
import React, { MouseEvent, useState } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

const defaultValues = {
  email: "",
  lastName: "",
  password: "",
  firstName: "",
  confirmPassword: "",
};

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return "";
  }
};

const schema = yup.object().shape({
  email: yup.string().required(),
  lastName: yup
    .string()
    .min(3, (obj) => showErrors("lastName", obj.value.length, obj.min))
    .required(),
  password: yup
    .string()
    .min(6, (obj) => showErrors("password", obj.value.length, obj.min))
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  firstName: yup
    .string()
    .min(3, (obj) => showErrors("firstName", obj.value.length, obj.min))
    .required(),
});
const SignUpFormNew = (props) => {
  const { handleValue } = props;
  const state = useSelector((state) => state?.order);
  const login = useSelector((state) => state?.login);
  const dispatch = useDispatch();
  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    let newData = {
      device_type: 1,
      email: values?.email,
      first_name: values?.firstname,
      invitation_code: "",
      last_name: values?.lastname,
      marketing: false,
      mobile_number: state?.phone ? `+44${state?.phone}` : "",
      password: values?.password,
      referal: "",
      user_name: values?.firstname + values?.lastname,
      user_type: 1,
      vat_number: "",
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            sx={
              errors.firstName
                ? {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid red",
                  }
                : {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #fff",
                  }
            }
          >
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  margin="normal"
                  variant="outlined"
                  size="small"
                  name="firstName"
                  value={value}
                  onChange={onChange}
                  placeholder="First Name"
                  error={Boolean(errors.firstName)}
                  sx={{
                    margin: 0,
                  }}
                />
              )}
            />
          </FormControl>
          {errors.firstName && (
            <FormHelperText
              sx={{ color: "error.main", mt: 1, ml: 1 }}
              id="validation-schema-first-name"
            >
              {errors.firstName.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <FormControl
            fullWidth
            sx={
              errors.lastName
                ? {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid red",
                  }
                : {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #fff",
                  }
            }
          >
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  margin="normal"
                  variant="outlined"
                  size="small"
                  name="lastName"
                  value={value}
                  onChange={onChange}
                  placeholder="Last Name"
                  error={Boolean(errors.lastName)}
                  sx={{
                    margin: 0,
                  }}
                />
              )}
            />
          </FormControl>
          {errors.lastName && (
            <FormHelperText
              sx={{ color: "error.main", mt: 1, ml: 1 }}
              id="validation-schema-first-name"
            >
              {errors.lastName.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <FormControl
            fullWidth
            sx={
              errors.email
                ? {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid red",
                  }
                : {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #fff",
                  }
            }
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  margin="normal"
                  variant="outlined"
                  size="small"
                  name="email"
                  value={value}
                  onChange={onChange}
                  placeholder="Email"
                  error={Boolean(errors.email)}
                  sx={{
                    margin: 0,
                  }}
                />
              )}
            />
          </FormControl>
          {errors.email && (
            <FormHelperText
              sx={{ color: "error.main", mt: 1, ml: 1 }}
              id="validation-schema-first-name"
            >
              {errors.email.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            sx={
              errors.password
                ? {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid red",
                  }
                : {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #fff",
                  }
            }
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  margin="normal"
                  variant="outlined"
                  size="small"
                  name="password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  placeholder="Password"
                  error={Boolean(errors.password)}
                  sx={{
                    margin: 0,
                  }}
                />
              )}
            />
          </FormControl>
          {errors.password && (
            <FormHelperText
              sx={{ color: "error.main", mt: 1, ml: 1 }}
              id="validation-schema-first-name"
            >
              {errors.password.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            sx={
              errors.confirmPassword
                ? {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid red",
                  }
                : {
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #fff",
                  }
            }
          >
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  margin="normal"
                  variant="outlined"
                  size="small"
                  type="password"
                  name="confirmPassword"
                  value={value}
                  onChange={onChange}
                  placeholder="Confirm Password"
                  error={Boolean(errors.confirmPassword)}
                  sx={{
                    margin: 0,
                  }}
                />
              )}
            />
          </FormControl>
          {errors.confirmPassword && (
            <FormHelperText
              sx={{ color: "error.main", mt: 1, ml: 1 }}
              id="validation-schema-first-name"
            >
              {errors.confirmPassword.message}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      {login.error && (
        <FormHelperText
          sx={{ color: "error.main", mt: 1, ml: 1 }}
          id="validation-schema-first-name"
        >
          {login.error}
        </FormHelperText>
      )}
      <Grid container justifyContent="center" marginTop={2}>
        <Grid
          item
          xs={8}
          textAlign="center"
          className="sign-up-btn-order-modal pointer"
        >
          <button type="submit">Continue</button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpFormNew;
