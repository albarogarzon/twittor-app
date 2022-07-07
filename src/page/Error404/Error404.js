import React from "react";
import { Link } from "react-router-dom";
import Error404Image from "../../assets/png/1.1_error-404.png";
import Logo from "../../assets/png/Logo.png";

import "./Error404.scss";

export default function Error404() {
  return (
    <div className="error-404">
      <img src={Logo} alt="twittor" />
      <img src={Error404Image} alt="error404" />
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
