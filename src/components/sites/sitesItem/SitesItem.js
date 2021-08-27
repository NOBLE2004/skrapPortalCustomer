import { Grid } from "@material-ui/core";
import React from "react";
import "./sites-item.scss";
import { downlaod } from "../../../assets/images";
const SitesItem = () => {
  return (
    <>
      <div className="item-header">
        <div className="header-title">Site Name</div>
        <div className="header-title">Address</div>
        <div className="header-title">Site Contact</div>
        <div className="header-title">Number of Jobs</div>
        <div className="header-title">Sales By Site</div>
      </div>
      <Grid container className="sites-item-main" >
        <div className="item">
          <div className="item-title">Hackney site</div>
          <div className="item-title">113 Ibsley, Gardens London, SW15 4NQ</div>
          <div className="item-title">Noble Eldhose +44 1234 567890</div>
          <div className="item-title">5</div>
          <div className="item-title">£3,432.00</div>
          <div className="items-more-option">
            <img src={downlaod} alt="download-icon" />
            <div>...</div>
          </div>
        </div>
      </Grid>
      <Grid container className="sites-item-main" >
        <div className="item">
          <div className="item-title">Hackney site</div>
          <div className="item-title">113 Ibsley, Gardens London, SW15 4NQ</div>
          <div className="item-title">Noble Eldhose +44 1234 567890</div>
          <div className="item-title">5</div>
          <div className="item-title">£3,432.00</div>
          <div className="items-more-option">
            <img src={downlaod} alt="download-icon" />
            <div>...</div>
          </div>
        </div>
      </Grid>
      <Grid container className="sites-item-main" >
        <div className="item">
          <div className="item-title">Hackney site</div>
          <div className="item-title">113 Ibsley, Gardens London, SW15 4NQ</div>
          <div className="item-title">Noble Eldhose +44 1234 567890</div>
          <div className="item-title">5</div>
          <div className="item-title">£3,432.00</div>
          <div className="items-more-option">
            <img src={downlaod} alt="download-icon" />
            <div>...</div>
          </div>
        </div>
      </Grid>
      <Grid container className="sites-item-main">
        <div className="item">
          <div className="item-title">Hackney site</div>
          <div className="item-title">113 Ibsley, Gardens London, SW15 4NQ</div>
          <div className="item-title">Noble Eldhose +44 1234 567890</div>
          <div className="item-title">5</div>
          <div className="item-title">£3,432.00</div>
          <div className="items-more-option">
            <img src={downlaod} alt="download-icon" />
            <div>...</div>
          </div>
        </div>
      </Grid>
      <Grid container className="sites-item-main" >
        <div className="item">
          <div className="item-title">Hackney site</div>
          <div className="item-title">113 Ibsley, Gardens London, SW15 4NQ</div>
          <div className="item-title">Noble Eldhose +44 1234 567890</div>
          <div className="item-title">5</div>
          <div className="item-title">£3,432.00</div>
          <div className="items-more-option">
            <img src={downlaod} alt="download-icon" />
            <div>...</div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default SitesItem;
