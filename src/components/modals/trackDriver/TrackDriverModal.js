import React, { useState } from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Card, CardContent } from "@material-ui/core";
import { InfoWindow } from "react-google-maps";
import "./trackDriver.scss";
import MainMap from "../../map/MainMap";
import NewMapDirectionsRenderer from "../../map/NewMapDirectionsRenderer";
import TipingCard from "../../tiping/TipingCard";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const TrackDriverModal = (props) => {
  const { handleClose, trackData } = props;
  const [showInfo, setShowInfo] = useState(false);
  const { driver } = trackData;

  const handleMarkerClick = () => {
    setShowInfo(true);
  };
  const places = [
    {
      latitude: Number(
        driver ? driver?.driver?.last_location?.lat : 51.5174246
      ),
      longitude: Number(
        driver ? driver?.driver?.last_location?.lng : -0.054686
      ),
    },
    {
      latitude: Number(trackData?.latitude),
      longitude: Number(trackData?.longitude),
    },
  ];

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        className="booksitemodal"
        maxWidth="md"
      >
        <DialogTitle onClose={handleClose}> Track Driver </DialogTitle>
        <DialogContent dividers>
          {driver ? (
            <Card className="track-mapCard">
              <CardContent>
                <MainMap
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA6AYxz5ok7Wkt3SOsquumACIECcH933ws`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={
                    <div style={{ height: `100%`, borderRadius: "12px" }} />
                  }
                >
                  {showInfo && (
                    <InfoWindow
                      position={{
                        lat: Number(trackData?.latitude),
                        lng: Number(trackData?.longitude),
                      }}
                    >
                      <TipingCard jobInfo={trackData} driverInfo={"driver"} />
                    </InfoWindow>
                  )}
                  {trackData && (
                    <NewMapDirectionsRenderer
                      places={places}
                      travelMode={window.google.maps.TravelMode.DRIVING}
                      onMarkerClick={handleMarkerClick}
                    />
                  )}
                </MainMap>
              </CardContent>
            </Card>
          ) : (
            "Driver Not Found Yet!"
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackDriverModal;
