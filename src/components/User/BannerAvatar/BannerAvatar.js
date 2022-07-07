import React, { useState, useEffect } from "react";
import "./BannerAvatar.scss";
import { API_HOST } from "../../../utils/constants";

import AvatarNotFound from "../../../assets/png/default-avatar.png";
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal/ConfigModal";
import EditUserForm from "../EditUserForm/EditUserForm";
import {
  checkFollowApi,
  followUserApi,
  unfollowApi,
} from "../../../api/follow";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setfollowing] = useState(null);
  const [reloadFollow, setreloadFollow] = useState(false);

  const bannerUrl = user?.banner
    ? `${API_HOST}/obtenerBanner?id=${user.id}`
    : null;

  const avatarUrl = user?.avatar
    ? `${API_HOST}/obtenerAvatar?id=${user.id}`
    : AvatarNotFound;

  useEffect(() => {
    if (user) {
      checkFollowApi(user?.id).then((res) => {
        if (res?.status) {
          setfollowing(true);
        } else {
          setfollowing(false);
        }
      });
    }

    setreloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followUserApi(user.id).then(() => {
      setreloadFollow(true);
    });
  };

  const onUnfollow = () => {
    unfollowApi(user.id).then(() => {
      setreloadFollow(true);
    });
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          {loggedUser._id === user.id && (
            <Button onClick={() => setShowModal(true)}>Editar Perfil</Button>
          )}
          {/* Perfil del user logueado */}

          {loggedUser._id !== user.id &&
            following !== null &&
            (following ? (
              <Button onClick={onUnfollow} className="unfollow"><span>Siguiendo</span></Button>
            ) : (
              <Button onClick={onFollow}>Seguir</Button>
            ))}
        </div>
      )}

      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="Editar Perfil"
      >
        <EditUserForm user={user} setShowModal={setShowModal}></EditUserForm>
      </ConfigModal>
    </div>
  );
}
