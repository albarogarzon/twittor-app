import React, { useState, useEffect } from "react";

import { getTweetsFollowersApi } from "../../api/tweet";
import BasicLayout from "../../layouts/BasicLayout";
import "./Home.scss";
import ListTweets from "../../components/ListTweets";
import { Button, Spinner } from "react-bootstrap";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [tweets, settweets] = useState(null);
  const [page, setpage] = useState(1);
  const [loadingTweets, setloadingTweets] = useState(false);

  useEffect(() => {
    getTweetsFollowersApi(page)
      .then((res) => {
        if (!tweets && res) {
          settweets(formatModel(res));
        } else {
          if (!res) {
            setloadingTweets(0);
          } else {
            const data = formatModel(res);
            settweets([...tweets, ...data]);
            setloadingTweets(false);
          }
        }
      })
      .catch((err) => {});
  }, [page]);

  const moreData = () => {
    setloadingTweets(true);
    setpage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>
      {tweets && <ListTweets tweets={tweets} />}
      <Button onClick={moreData} className="load-more">
        {!loadingTweets ? (
          loadingTweets !== 0 ? (
            "Obtener más tweets"
          ) : (
            "No hay más tweets"
          )
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}

function formatModel(tweets) {
  const tweetsTemp = [];

  tweets.forEach((tweet) => {
    tweetsTemp.push({
      _id: tweet._id,
      userid: tweet.userRelationId,
      mensaje: tweet.Tweet.mensaje,
      fecha: tweet.Tweet.fecha,
    });
  });
  return tweetsTemp;
}
