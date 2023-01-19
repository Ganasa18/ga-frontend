import axios from "axios";
import { endPoint } from "../../assets/config";
import { MessageComp } from "../../components";
import { axiosFunc } from "../../lib/AxiosFunc";
import filterByValue from "../../utils/useFilter";

export const getDataArea = () => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/area/`;

  const getArea = await axiosFunc("get", URL);

  if (getArea.status !== 200) {
    console.log(getArea, "Something went wrong");
    dispatch({ type: "SET_LOADING", value: false });
    return;
  }

  let newDataArea = getArea?.data?.data?.areas;
  newDataArea = newDataArea.map((item) => ({
    key: item.id,
    area_name: item.area_name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  dispatch({ type: "SET_AREA", value: newDataArea });
  setTimeout(() => {
    dispatch({ type: "SET_LOADING", value: false });
  }, 3000);
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

  const data = { area_name: form };

  const createArea = await axiosFunc("post", URL, data);

  // Handling Error
  if (createArea.status !== 201) {
    if (createArea.status === 400) {
      const error = {
        area_name: createArea.data.message,
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    }
    console.log(createArea);
    MessageComp("Something Wrong", "warning");

    return;
  }

  dispatch({ type: "SET_MODAL", value: false });
  dispatch({ type: "SET_AREA_ADD", value: "" });
  MessageComp("Succsess Create", "success");
  setTimeout(() => {
    dispatch(getDataArea());
  }, 2000);
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

  const data = { area_name: form };
  const editArea = await axiosFunc("patch", URL, data);

  // Handling Error
  if (editArea.status !== 200) {
    if (editArea.status === 400) {
      const error = {
        area_name: editArea.data.message,
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    }
    MessageComp("Something Wrong", "warning");
    return;
  }

  dispatch({ type: "SET_MODAL_EDIT", value: false });
  dispatch({ type: "SET_AREA_ADD", value: "" });
  MessageComp("Succsess Update Data", "success");
  setTimeout(() => {
    dispatch(getDataArea());
  }, 2000);
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
