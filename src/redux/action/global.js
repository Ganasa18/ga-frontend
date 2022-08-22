import axios from "axios";
import { message } from "antd";
import { endPoint } from "../../assets/config";
import Cookies from "universal-cookie";
import { MessageComp } from "../../components";

const cookies = new Cookies();

export const setLoading = (value) => {
  return { type: "SET_LOADING", value };
};
export const setLoadingMenu = (value) => {
  return { type: "SET_LOADING_MENU", value };
};
export const setError = (value) => {
  return { type: "SET_IS_ERROR", value };
};

export const setSelected = (value) => {
  return { type: "SET_SELECTED", value };
};

export const setToken = (form) => (dispatch) => {
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/user/login-web`;

  dispatch({ type: "SET_LOADING", value: true });

  (async () => {
    let apiRes = null;
    try {
      apiRes = await axios
        .post(`${URL}`, {
          username: form.username.target.value,
          password: form.password.target.value,
        })
        .then((response) => {
          console.log(response.data.data.user.username);
          cookies.set("token", response.data.token, {
            path: "/",
          });
          cookies.set("username", response.data.data.user.username);
          cookies.set("user_id", response.data.data.user.id);
          cookies.set("role", response.data.data.user.role);
          MessageComp("Login Succesfully", "success");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          MessageComp(error.response.data.message, "error");
          // alert(error.response.data.message);
          dispatch({ type: "SET_LOADING", value: false });
        });
    } catch (err) {
      console.log(err);
      dispatch({ type: "SET_LOADING", value: false });
    }
  })();
};

export const getMenu = (userId) => async (dispatch) => {
  dispatch({ type: "SET_LOADING_MENU", value: true });
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/menu/menu-access-user/${userId}`;
  await axios
    .get(URL)
    .then((response) => {
      dispatch(getAllMenu());
      dispatch({ type: "SET_MENU", value: response.data.data.menus });
      setTimeout(() => {
        dispatch({ type: "SET_LOADING_MENU", value: false });
      }, 1000);
    })
    .catch((error) => {
      dispatch({ type: "SET_LOADING_MENU", value: false });
    });
};

export const getAllMenu = () => async (dispatch) => {
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/menu`;
  await axios
    .get(URL)
    .then((response) => {
      dispatch({ type: "SET_ALL_MENU", value: response.data.data.menus });
    })
    .catch((error) => {
      console.log(error);
    });
};
