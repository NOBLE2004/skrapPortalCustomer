import React, {useState} from "react";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";
import mapStyles from "./mapStyles";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const MainMap = ({ children, defaultCenter }) => {
  const currency = localStorage.getItem("currency");
  const [zoom, setZoom] = useState(10)
    console.log('childrens', defaultCenter);
  return (
      <>
          <GoogleMap
              defaultZoom={10}
              zoom={zoom}
              defaultCenter={{
                  lat: defaultCenter ? defaultCenter.job_location_lat : currency == "$" ? 37.17567 : 51.55063,
                  lng: defaultCenter ? defaultCenter.job_location_lng : currency == "$" ? -95.8467 : -0.0461,
              }}
              defaultOptions={{ styles: mapStyles, fullscreenControl: false, mapTypeControl: false, disableDefaultUI: true, zoomControl: false }}
          >
              {children}
          </GoogleMap>
          <div className="zoom-buttons">
              <AddIcon style={{fontSize: '30px'}}  onClick={() => setZoom(zoom + 1)}/>
              <span></span>
              <RemoveIcon style={{fontSize: '30px'}} onClick={() => setZoom(zoom - 1)}/>
          </div>
      </>
  );
};

export default withScriptjs(withGoogleMap(MainMap));
