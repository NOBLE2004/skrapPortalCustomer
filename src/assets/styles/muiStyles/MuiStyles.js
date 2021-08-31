
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