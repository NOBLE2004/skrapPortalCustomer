import React from "react";
import { useStyles } from "../../containers/sidebar/styles";
import SideBar from "../../containers/sidebar/MySidebar";
import useWindowDimensions from "../../hooks/useWindowDimension";

const Layout = (props) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  return (
    <div className={[classes.root, " sidebar-container"]}>
      <SideBar />
      <div className={width < 768 ? classes.contents : classes.content}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
