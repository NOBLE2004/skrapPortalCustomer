import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { appIcon } from "../../assets/images/index";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./navbar.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#fff",
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(localStorage.getItem("user"));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload(false);
    handleClose();
  };
  useEffect(() => {
    console.log(props);
    setIsAuthenticated(localStorage.getItem("isAuthenticated"));
    setUser(localStorage.getItem("user"));
    console.log(localStorage.getItem("user"));
  }, []);
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className="top-nav-bar"
        color="transparent"
        elevation={0}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=> history.push("/")}>
            <img src={appIcon} alt="app-icon" />
          </IconButton>
          <div className={classes.title}></div>
          <Button color="inherit">For contractors</Button>
          <Button color="inherit">For enterprise</Button>
          <Button color="inherit">About us</Button>
          <Button color="inherit">Get started</Button>
          {localStorage.getItem("isAuthenticated") ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {localStorage.getItem("user") ? localStorage.getItem("user") : "abc"}
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={(e) => handleLogout(e)}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};


export default connect(mapStateToProps, null)(NavBar);
