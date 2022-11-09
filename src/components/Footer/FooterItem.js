import React from "react";
import { Button, Grid } from "@mui/material";
import { footerData } from "./staticdata";
import Container from "@mui/material/Container";
import "./footer.scss";

function Footer() {
  return (
    <Container>
      <div className="footer-main">
        <div className="footer-top-title">
          We are building the world’s first app dedicated to automating
          construction hire.
        </div>
        <Grid className="footer-item-main" container spacing={6} mt={6}>
          {footerData.map((footer, index) => (
            <Grid item xs={2.4} className="footer-item" key={index}>
              <img src={footer.icon} alt="footer-icon" />
              <div className="footer-title">{footer.title}</div>
              <div className="footer-description">{footer.descrition}</div>
            </Grid>
          ))}
        </Grid>
        <div className="footer-get-quote">
          <Button>Get a quote</Button>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
