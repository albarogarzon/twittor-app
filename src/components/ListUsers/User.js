import React, { useState, useEffect } from "react";
import { getUserApi } from "../../api/user";
import { Media, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST } from "../../utils/constants";
import AvatarDefault from "../../assets/png/default-avatar.png";

export default function User(props) {
  const { user } = props;

  const [userInfo, setuserInfo] = useState(null);

  useEffect(() => {
    getUserApi(user.id).then((res) => {
      setuserInfo(res);
    });
  }, [user]);

  return (
    <Media as={Link} to={`/${user.id}`} className="list-users__user">
      <Image
        width={64}
        height={64}
        roundedCircle
        className="mr-3"
        src={
          userInfo?.avatar
            ? `${API_HOST}/obtenerAvatar?id=${user.id}`
            : AvatarDefault
        }
        alt={`${user.nombre} ${user.apellidos}`}
      />
      <Media.Body>
        <h5>
          {user.nombre} {user.apellido}
        </h5>
        <p>{userInfo?.biografia}</p>
      </Media.Body>
    </Media>
  );
}
