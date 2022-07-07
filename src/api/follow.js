import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

//62617322ee81223a2d5d9d42 User Tomi
//62617331ee81223a2d5d9d43 ro
//6262b63d812d1193b4b7d355 dolo
export function checkFollowApi(idUser) {
  const url = `${API_HOST}/consultaRelacion?id=${idUser}`;
  const params = {
    //Tipo Get
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function followUserApi(idUser) {
  const url = `${API_HOST}/altaRelacion?id=${idUser}`;
  const params = {
    //Tipo Get
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function unfollowApi(idUser) {
  const url = `${API_HOST}/bajaRelacion?id=${idUser}`;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getFollowsApi(paramsUrl) {
  const url = `${API_HOST}/listaUsuarios?${paramsUrl}`;
  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}