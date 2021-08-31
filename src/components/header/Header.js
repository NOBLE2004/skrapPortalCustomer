import { Container } from "@material-ui/core";
import React from "react";
import "./header.scss";

const Header = ({ title, description }) => {
  return (
    <Container maxWidth="md">
      <div className="header-text-section">
        <div className="header-title">{title}</div>
        <div className="description">{description}</div>
      </div>
    </Container>
  );
};

export default Header;
