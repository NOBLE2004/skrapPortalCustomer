import {
  Box,
  Button,
  Divider,
  Drawer,
  LinearProgress,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Close,
  InfoOutlined,
  LineWeightOutlined,
  LocationCityOutlined,
  LocationSearchingOutlined,
  SocialDistanceOutlined,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";
import PladgeDetails from "./detail";
import plegeService from "../../services/plege.service";
import EmissionDetails from "./emissionDetail";
import AccuracyDetails from "./accurayDetail";
import ImpactImg from "../../assets/images/createimpact.webp";
import { calculator } from "../../assets/images";
import "./style.scss";
import DrawerComponent from "./drawerComponent";

const PledgeModal = ({ showDrawer, setShowDrawer }) => {
  const [value, setValue] = React.useState("1");
  const [data, setData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getData = () => {
    plegeService
      .getPledgeData(showDrawer?.row?.job_id)
      .then((res) => {
        setData(res?.data?.data);
        console.log({ res });
      })
      .catch((err) => {
        console.log("errr".err);
      });
  };
  useEffect(() => {
    if (showDrawer?.row?.job_id) {
      getData();
    }
  }, [showDrawer?.show]);

  const setComponentData = () => {
    setData(null);
    setShowDrawer({ show: false });
  };

  return (
    <Drawer
      anchor={"right"}
      open={showDrawer.show}
      className="right-side"
      sx={{
        width: "650px",
      }}
      onClose={setComponentData}
    >
      <Box width={650}>
        <DrawerComponent showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      </Box>
    </Drawer>
  );
};

export default PledgeModal;
