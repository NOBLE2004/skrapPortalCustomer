import React, {useEffect, useState} from "react";
import { useStyles } from "../../containers/sidebar/styles";
import SideBar from "../../containers/sidebar/MySidebar";
import useWindowDimensions from "../../hooks/useWindowDimension";
import Header from "./Header";

const Layout = (props) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  let currency = localStorage.getItem("currency");
  const [curr, setCurr] = useState(currency);
  useEffect(()=>{
      localStorage.setItem("currency", curr);
      currency = localStorage.getItem("currency");
  }, [curr])
    console.log(props.children);
  return (
    <div className={[classes.root, " sidebar-container"]}>
      <SideBar />
        {curr && <div className={width < 768 ? classes.contents : classes.content}>
          <Header currency={curr} setCurrency={setCurr} />
        {props.children}
      </div>}
    </div>
  );
};

export default Layout;
