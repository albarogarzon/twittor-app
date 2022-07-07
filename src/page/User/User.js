import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserApi } from "../../api/user";
import BasicLayout from "../../layouts/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import useAuth from "../../hooks/useAuth";
import InfoUser from "../../components/User/InfoUser/InfoUser";

import "./User.scss";
import { getUserTweetsApi } from "../../api/tweet";
import ListTweets from "../../components/ListTweets/ListTweets";

function User(props) {
  const { router } = props;
  const [user, setuser] = useState(null);
  const [tweets, settweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);

  const loggedUser = useAuth();
  //console.log(router.params.id);

  useEffect(() => {
    getUserApi(router.params.id)
      .then((res) => {
        if (!res) toast.error("El usuario que has visitado no existe.");
        setuser(res);
      })
      .catch(() => {
        toast.error("El usuario que has visitado no existe/Error.");
      });
  }, [router.params]);

  useEffect(() => {
    getUserTweetsApi(router.params.id, 1)
      .then((res) => {
        settweets(res);
      })
      .catch(() => {
        settweets([]);
      });
  }, [router.params]);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingTweets(true);
    getUserTweetsApi(router.params.id, pageTemp).then((res) => {
      if (!res) {
        setLoadingTweets(0);
      } else {
        settweets([...tweets, ...res]);
        setPage(pageTemp)
        setLoadingTweets(false)
      }
    });
  };

  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>
          {user ? `${user.nombre} ${user.apellidos}` : "Este user no existe"}
        </h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser} />
      <InfoUser user={user}></InfoUser>
      <div className="user__tweets">
        <h3>Tweets</h3>
        {tweets && <ListTweets tweets={tweets} />}
        <Button onClick={moreData}>
          {!loadingTweets ? (
            loadingTweets !== 0 && "Obtener más Tweets"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              arian-hidden="true"
            ></Spinner>
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

export default withRouter(User);

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
