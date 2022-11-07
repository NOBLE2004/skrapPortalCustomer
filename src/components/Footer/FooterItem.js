import React from "react";
import { Button } from "@mui/material";
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
        <div className="footer-item-main">
          {footerData.map((footer, index) => (
            <div className="footer-item" key={index}>
              <img src={footer.icon} alt="footer-icon" />
              <div className="footer-title">{footer.title}</div>
              <div className="footer-description">{footer.descrition}</div>
            </div>
          ))}
        </div>
        <div className="footer-get-quote">
          <Button>Get a quote</Button>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
