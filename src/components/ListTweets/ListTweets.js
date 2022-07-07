import React, { useState, useEffect } from "react";
import "./ListTweets.scss";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";

import { getUserApi } from "../../api/user";
import AvatarNotFound from "../../assets/png/default-avatar.png";
import { API_HOST } from "../../utils/constants";
import { replaceURLWithHTMLLinks } from "../../utils/functions";


export default function ListTweets(props) {
  const { tweets } = props;

  return (
    <div className="list-tweets">
      {map(tweets, (tweet, index) => (
        <Tweet key={index} tweet={tweet}></Tweet>
      ))}
    </div>
  );
}

function Tweet(props) {
  const { tweet } = props;
  const [userInfo, setuserInfo] = useState(null);
  const [avatarUrl, setavatarUrl] = useState(null);

  useEffect(() => {
    getUserApi(tweet.userid).then((res) => {
      setuserInfo(res);
      setavatarUrl(
        res?.avatar ? `${API_HOST}/obtenerAvatar?id=${res.id}` : AvatarNotFound
      );
    });
  }, [tweet]);

  return (
    <div className="tweet">
      <Image className="avatar2" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.nombre} {userInfo?.apellidos}
          <span>{moment(tweet.fecha).calendar()}</span>
        </div>
        <div dangerouslySetInnerHTML={{__html:replaceURLWithHTMLLinks(tweet.mensaje)}}></div>
      </div>
    </div>
  );
}
