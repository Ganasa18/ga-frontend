import axios from "axios";
import { endPoint } from "../../assets/config";
import { MessageComp } from "../../components";
import filterByValue from "../../utils/useFilter";

export const getDataArea = () => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/area/`;
  await axios
    .get(URL)
    .then((response) => {
      dispatch({ type: "SET_AREA", value: response.data.data.areas });
      setTimeout(() => {
        dispatch({ type: "SET_LOADING", value: false });
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: "SET_LOADING", value: false });
    });
};

export const createArea = (form) => async (dispatch) => {
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/area/`;

  if (form.length === 0) {
    const error = {
      area_name: "Must Fill Area Name",
    };
    return dispatch({ type: "SET_IS_ERROR", value: error });
  }

  dispatch({ type: "SET_IS_ERROR", value: null });

  await axios
    .post(URL, {
      area_name: form,
    })
    .then((response) => {
      dispatch({ type: "SET_MODAL", value: false });
      dispatch({ type: "SET_AREA_ADD", value: "" });
      MessageComp("Succsess Create", "success");
      setTimeout(() => {
        dispatch(getDataArea());
      }, 2000);
    })
    .catch((err) => {
      if (err.response.status === 400) {
        const error = {
          area_name: err.response.data.message,
        };

        return dispatch({ type: "SET_IS_ERROR", value: error });
      }
      MessageComp("Something Wrong", "warning");
    });
};

export const editArea = (form, id) => async (dispatch) => {
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/area/${id}`;

  if (form.length === 0) {
    const error = {
      area_name: "Must Fill Area Name",
    };
    return dispatch({ type: "SET_IS_ERROR", value: error });
  }

  dispatch({ type: "SET_IS_ERROR", value: null });

  await axios
    .patch(URL, {
      area_name: form,
    })
    .then((response) => {
      dispatch({ type: "SET_MODAL_EDIT", value: false });
      dispatch({ type: "SET_AREA_ADD", value: "" });
      MessageComp("Succsess Update Data", "success");
      setTimeout(() => {
        dispatch(getDataArea());
      }, 2000);
    })
    .catch((err) => {
      if (err.response.status === 400) {
        const error = {
          area_name: err.response.data.message,
        };

        return dispatch({ type: "SET_IS_ERROR", value: error });
      }
      MessageComp("Something Wrong", "warning");
    });
};

export const searchArea = (value, areaData) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  setTimeout(() => {
    if (value.length <= 0) {
      dispatch(getDataArea());
      return;
    }
    let searchRequest = filterByValue(areaData, value);
    dispatch({ type: "SET_AREA", value: searchRequest });
    dispatch({ type: "SET_LOADING", value: false });
  }, 3000);
};
