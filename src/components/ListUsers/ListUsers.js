import React, { useState, useEffect } from "react";
import "./ListUsers.scss";
import { Image } from "react-bootstrap";
import { map, isEmpty } from "lodash";
import User from "./User";

export default function ListUsers(props) {
  const { users } = props;

  if (isEmpty(users)) {
    return <h2>No hay resultados</h2>;
  }
  return (
    <ul className="list-users">
      {map(users, (user, index) => (
        <User key={index} user={user} />
      ))}
    </ul>
  );
}
