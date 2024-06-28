import {
  Box,
  Drawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import plegeService from "../../services/plege.service";
import "./style.scss";
import DrawerComponent from "./drawerComponent";

const PledgeModal = ({ showDrawer, setShowDrawer, setShowCo }) => {
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
    console.log('modal closed');
    setShowDrawer({ show: false });
      setShowCo(false)
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
        <DrawerComponent showDrawer={showDrawer} setShowDrawer={setShowDrawer} setShowCo={setShowCo} />
      </Box>
    </Drawer>
  );
};

export default PledgeModal;
