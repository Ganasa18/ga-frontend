import axios from "axios";
import { endPoint } from "../../assets/config";
import { MessageComp } from "../../components";
import filterByValue from "../../utils/useFilter";

export const getDataLocation = () => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/location/`;
  await axios
    .get(URL)
    .then((response) => {
      dispatch({ type: "SET_LOCATION", value: response.data.data.locations });
      setTimeout(() => {
        dispatch({ type: "SET_LOADING", value: false });
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: "SET_LOADING", value: false });
    });
};

export const createNewlocation = (name, select) => async (dispatch) => {
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/location/`;

  if (select?.length === 0 || select == null) {
    const error = {
      type_loc: "Must Select Location",
    };
    return dispatch({ type: "SET_IS_ERROR", value: error });
  } else if (!name || name === "") {
    const error = {
      location_name: "Must Fill Name",
    };
    return dispatch({ type: "SET_IS_ERROR", value: error });
  } else {
    dispatch({ type: "SET_IS_ERROR", value: null });
  }

  await axios
    .post(URL, {
      location_name: name,
      type_location: select?.value,
      tagLocation: "admin",
    })
    .then((response) => {
      dispatch({ type: "SET_MODAL", value: false });
      dispatch({ type: "SET_LOCATION_NAME", value: null });
      MessageComp("Succsess Create", "success");
      setTimeout(() => {
        dispatch(getDataLocation());
      }, 2000);
    })
    .catch((err) => {
      if (err.response.status === 400) {
        const error = {
          location_name: err.response.data.message,
        };
        return dispatch({ type: "SET_IS_ERROR", value: error });
      }
      MessageComp("Something Wrong", "warning");
    });
};
