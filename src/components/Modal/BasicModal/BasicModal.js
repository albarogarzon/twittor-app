import React from "react";
import { Modal } from "react-bootstrap";
import LogoW from "../../../assets/png/LogoW.png";

import "./BasicModal.scss";

export default function BasicModal(props) {
  const { show, setShow, children } = props;
  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <img src={LogoW} alt="Twittor" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
