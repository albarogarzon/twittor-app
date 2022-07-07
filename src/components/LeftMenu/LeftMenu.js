import React, { useState } from "react";
import "./LeftMenu.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import TweetModal from "../Modal/TweetModal/TweetModal";

import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

import LogoW from "../../assets/png/LogoW.png";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setshowModal] = useState(false)
  const user = useAuth();

  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };

  return (
    <div className="left-menu">
      <img className="logo" src={LogoW} alt="Twittor" />
      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} />
        Usuarios
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} />
        Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} />
        Cerrar Sesion
      </Link>

      <Button onClick={()=>{setshowModal(true)}}>Twittoar</Button>
      <TweetModal show={showModal} setShow={setshowModal}/> 
    </div>
  );
}
