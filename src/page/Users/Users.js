import React, { useState, useEffect } from "react";
import { Spinner, Button, ButtonGroup } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";

import { getFollowsApi } from "../../api/follow";

import BasicLayout from "../../layouts/BasicLayout";

import "./Users.scss";
import ListUsers from "../../components/ListUsers";

function Users(props) {
  const { setRefreshCheckLogin, router } = props;
  const location = router.location;

  const [users, setusers] = useState(null);
  const params = useUsersQuery(location);
  const [typeUser, setTypeUser] = useState(params.type || "follow");
  const [btnLoading, setBtnLoading] = useState(false);

  const [onSearch] = useDebouncedCallback((value) => {
    setusers(null);
    router.navigate({
      search: queryString.stringify({
        ...params,
        search: value,
        page: 1,
      }),
    });
  }, 200);

  useEffect(() => {
    getFollowsApi(queryString.stringify(params))
      .then((res) => {
        if (params.page == 1) {
          if (isEmpty(res)) {
            setusers([]);
          } else {
            setusers(res);
          }
        } else {
          if (!res) {
            setBtnLoading(0);
          } else {
            setusers([...users, ...res]);
            setBtnLoading(false);
          }
        }
      })
      .catch(() => {
        setusers([]);
      });
  }, [router.location]);

  const onChangeType = (type) => {
    setusers(null);
    if (type === "new") {
      setTypeUser("new");
    } else {
      setTypeUser("follow");
    }

    router.navigate({
      search: queryString.stringify({ type: type, page: 1, search: "" }),
    });
  };

  const moreData = () => {
    setBtnLoading(true);
    const newPage = parseInt(params.page) + 1;
    router.navigate({
      search: queryString.stringify({ ...params, page: newPage }),
    });
  };

  return (
    <BasicLayout
      className="users"
      title="Usuarios"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="users__title">
        <h2>Usuarios</h2>
        <input
          type="text"
          placeholder="Busca un usuario..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <ButtonGroup className="users__options">
        <Button
          className={typeUser === "follow" && "active"}
          onClick={() => onChangeType("follow")}
        >
          Siguiendo
        </Button>
        <Button
          className={typeUser === "new" && "active"}
          onClick={() => onChangeType("new")}
        >
          Nuevos
        </Button>
      </ButtonGroup>

      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Cargando usuarios
        </div>
      ) : (
        <>
          <ListUsers users={users} />
          <Button onClick={moreData} className="load-more">
            {!btnLoading ? (
              btnLoading !== 0 && "Cargar mas usuarios"
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
        </>
      )}
    </BasicLayout>
  );
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function useUsersQuery(location) {
  const {
    page = 1,
    type = "follow",
    search,
  } = queryString.parse(location.search);
  return { page, type, search };
}

export default withRouter(Users);
