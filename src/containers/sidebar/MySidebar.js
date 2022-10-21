import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import { Drawer, IconButton, List } from "@mui/material";
import { useHistory, useLocation } from "react-router";
import clsx from "clsx";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sidebarTabsList, ENV, USER } from "../../environment";
import { getUserDataFromLocalStorage } from "../../services/utils";
import { useStyles } from "./styles";
import { appIcon, personImage } from "../../assets/images";
import useWindowDimensions from "../../hooks/useWindowDimension";
import "./mySidebar.scss";

const drawerWidth = 240;
const MySidebar = (props) => {
  const { width } = useWindowDimensions();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(width < 700 ? false : true);
  const [subMenu, setSubMenu] = useState(0);
  const [userData, setUserData] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const _useEffect = () => {
    let userData = getUserDataFromLocalStorage();

    if (userData) {
      let username =
        userData?.personal_detail.first_name +
        " " +
        userData?.personal_detail.last_name;
      username = username.replace(/\b\w/g, (l) => l.toUpperCase());
      document.title = username;
      setUserData(userData);
      highlightActiveTab();
    }
  };

  const highlightActiveTab = () => {
    let pathname = props.history.location.pathname.split("/");
    let activeTab = pathname[pathname.length - 1];
    if (activeTab) {
      setActiveTab(activeTab);
      /*if (activeTab !== 'dashboard')
              props.history.push(`/${activeTab}`);*/
    }
    // else {
    //     props.history.push('/dashboard/buybtc')
    // }
  };
  useEffect(_useEffect, []);

  const _useEffectActiveTab = () => {
    let pathname = props.history.location.pathname.split("/");
    let activeTab = pathname[pathname.length - 1];
    const param = location.pathname.slice(1, 6);
    if (!param) {
      setActiveTab("dashboard");
    } else if (param === "sites") {
      setActiveTab("sites");
    } else if (param === "job-d") {
      setActiveTab("jobs");
    } else if (param === "site-") {
      setActiveTab("site-managers");
    } else if (param === "new-report") {
      setActiveTab("new-report");
    } else {
      setActiveTab(activeTab);
    }
  };
  useEffect(_useEffectActiveTab, [location.pathname]);

  const handleDrawer = () => {
    if (width < 768) {
      setOpen(false);
    } else {
      setOpen(!open);
    }
  };

  const onTabHandler = (e, tab) => {
    e.preventDefault();
    setSubMenu(0);
    let tabKey = tab.key.toLowerCase();
    if (tabKey !== activeTab) {
      if (tabKey === "login") {
        props.history.push({ pathname: `/login` });
      }
      if (tabKey === "dashboard") {
        props.history.replace("/dashboard");
      } else {
        props.history.push({ pathname: `/${tabKey}` });
      }
      setActiveTab(tabKey);
    } else {
      props.history.push({ pathname: `/${tabKey}` });
    }
  };
  const onTabHandlerSub = (e, tab) => {
    e.preventDefault();
    let tabKey = tab.key.toLowerCase();
    if (tabKey !== activeTab) {
      if (tabKey === "login") {
        props.history.push({ pathname: `/login` });
      }
      if (tabKey === "dashboard") {
        props.history.replace("/dashboard");
      } else {
        props.history.push({ pathname: `/${tabKey}` });
      }
      setActiveTab(tabKey);
    }
  };
  const [openCollapse, setOpenCollapse] = React.useState(false);

  const handleOpenSub = (e, index) => {
    if (subMenu !== index) {
      setOpenCollapse(true);
    } else {
      setOpenCollapse(!openCollapse);
    }
    setSubMenu(index);
  };
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload(false);
  };

  return (
    <Drawer
      variant="permanent"
      className={
        width < 768
          ? clsx(
              classes.drawer,
              { [classes.drawerClose]: true },
              "drawerClose1"
            )
          : clsx(
              classes.drawer,
              {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              },
              open ? "drawerOpen1" : "drawerClose1"
            )
      }
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <IconButton onClick={handleDrawer} className="sidebar-handler-arrow">
        <img className="skrapLogin" src={appIcon} alt="Skrap-Logo" />
      </IconButton>
      <List
        className="menuList"
        style={{ height: "100%", paddingLeft: 10, paddingRight: 10 }}
      >
        {sidebarTabsList.map((obj, index) => {
          if ((userData.role_id === 12) | (userData.role_id === 13)) {
            if (index === 3) {
              return null;
            }
          }

          // if (userData.user_count <= 0) {
          //   if (index === 3) {
          //     return null;
          //   }
          // }
          let [textClass, iconColor] = ["sidebar-tab-text", "black_icon"];
          if (!obj.sub) {
            [textClass, iconColor] =
              activeTab === obj.key.toLowerCase()
                ? ["active-tab", "white_icon"]
                : ["sidebar-tab-text", "black_icon"];
          }
          return (
            <React.Fragment key={`tabList ${index}`}>
              {
                <>
                  <ListItem
                    button
                    onClick={
                      obj.sub
                        ? (e) => handleOpenSub(e, index)
                        : (e) => onTabHandler(e, obj)
                    }
                    className={textClass}
                  >
                    <ListItemIcon>
                      <img src={obj.icon} className={iconColor} alt={""} />
                    </ListItemIcon>
                    <ListItemText
                      primary={obj.text}
                      className="text-capitalize"
                    />
                  </ListItem>
                </>
              }
            </React.Fragment>
          );
        })}
      </List>
      <div className="toolbar">
        <ListItem key={"Dashboard"}>
          <div
            className="display-flex align-items-center driver-icon-section"
            style={{
              color: "#86869C",
              marginRight: 5,
              borderRadius: "50%",
            }}
          >
            {userData.logo && userData.logo != "" ? (
              <img
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                src={userData.logo}
                alt={""}
              />
            ) : (
              <img src={personImage} alt={""} />
            )}
          </div>
          <ListItemText
            primary={
              (userData.hasOwnProperty("personal_detail") &&
                (userData.personal_detail.hasOwnProperty("first_name") &&
                  userData.personal_detail?.first_name) +
                  " " +
                  (userData.personal_detail.hasOwnProperty("last_name") &&
                    userData.personal_detail?.last_name)) ||
              "Test"
            }
            className="current-user"
          />
          <br />
          <ListItemText
            primary={
              (userData.hasOwnProperty("company") && userData?.company) || ""
            }
            className="current-user"
          />
        </ListItem>
        <button className="sidebar-signout-btn" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </Drawer>
  );
};

export default withRouter(connect(null, null)(MySidebar));
