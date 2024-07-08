import React, {useState} from "react";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";
import mapStyles from "./mapStyles";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const MainMap = ({ children }) => {
  const currency = localStorage.getItem("currency");
  const [zoom, setZoom] = useState(8)
  return (
      <>
          <GoogleMap
              defaultZoom={8}
              zoom={zoom}
              defaultCenter={{
                  lat: currency == "$" ? 37.17567 : 51.55063,
                  lng: currency == "$" ? -95.8467 : -0.0461,
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
