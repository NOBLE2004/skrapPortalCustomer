import { makeStyles } from "@material-ui/core";
export const dashboardServiceStyle = makeStyles((theme) => ({
  toggle: {
    "& .Mui-checked": {
      color: "#52a9dd",
      transform: "translateX(25px) !important",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#52a9dd",
    },
  },
}));

// table ui design
export const jobsUseStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    background: "#FFFFFF",
    border: "1px solid #ECECEC",
    boxSizing: " border-box",
    borderRadius: "11.6836px",
    boxShadow:"none",

    "& > *": {
      height: theme.spacing(8),
    },
  },
}));

export const textFieldStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29a7df",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29a7df",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29a7df",
    },
  },

  error: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
  },
});