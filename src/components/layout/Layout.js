import React from "react";
import { useStyles } from "../../containers/sidebar/styles";
import SideBar from '../../containers/sidebar/MySidebar';

const Layout = (props) => {
  const classes = useStyles();
  return (
    <div className={[classes.root, " sidebar-container"]}>
      <SideBar />
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  )
}

export default Layout;