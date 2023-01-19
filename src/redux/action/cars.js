import axios from "axios";
import { endPoint } from "../../assets/config";
import { MessageComp } from "../../components";
import filterByValue from "../../utils/useFilter";

export const getDataCars = () => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  dispatch({
    type: "SET_TAG_FILTER",
    value: null,
  });
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/cars/`;

  const URL_Location = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/cars/location`;

  const requestOne = await axios.get(URL);
  const requestTwo = await axios.get(URL_Location);

  axios
    .all([requestOne, requestTwo])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];

        let newDataCars = responseOne.data.data.cars;
        let newDataLocation = responseTwo.data.data.location;
        dispatch({ type: "SET_CARS", value: newDataCars });
        dispatch({ type: "SET_LOCATION_ODOO", value: newDataLocation });
        setTimeout(() => {
          dispatch({ type: "SET_LOADING", value: false });
        }, 3000);
      })
    )
    .catch((error) => {
      dispatch({ type: "SET_LOADING", value: false });
      console.log(error);
    });
};

export const importDataCars = (files) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/cars/import`;
  const fileFormData = new FormData();
  fileFormData.append("cars_data", files);
  await axios
    .post(URL, fileFormData)
    .then((response) => {
      dispatch({ type: "SET_MODAL", value: false });
      dispatch({ type: "SET_CARS_IMPORT", value: null });

      MessageComp("Succsess Import", "success");
      setTimeout(() => {
        dispatch(getDataCars());
      }, 2000);
    })
    .catch((err) => {
      if (err.response.status === 400) {
        dispatch({ type: "SET_LOADING", value: false });
        return MessageComp(`${err.response.data.message}`, "warning");
      }
      MessageComp("Something Wrong", "warning");
    });
};

export const searchCar = (value, carData) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  setTimeout(() => {
    if (value.length <= 0) {
      dispatch(getDataCars());
      return;
    }
    let searchRequest = filterByValue(carData, value);
    dispatch({ type: "SET_CARS", value: searchRequest });
    dispatch({ type: "SET_LOADING", value: false });
  }, 1000);
};

export const filterCar = (area, car, ownership, pool) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });

  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/cars/`;

  let filter = new Array(area, car, ownership, pool);
  filter = filter.filter(function (element) {
    return element !== undefined;
  });

  await axios
    .get(URL, {
      params: {
        location_odoo: area,
        model_vehicle: car,
        ownership: ownership,
        pull_or_takehome: pool,
      },
    })
    .then((response) => {
      dispatch({ type: "SET_CARS", value: response.data.data.cars });
      if (filter.length > 0) {
        dispatch({
          type: "SET_TAG_FILTER",
          value: { cars: filter },
        });
      } else {
        dispatch({
          type: "SET_TAG_FILTER",
          value: null,
        });
      }
      dispatch({ type: "SET_CARS_FILTER", value: false });
      setTimeout(() => {
        dispatch({ type: "SET_LOADING", value: false });
      }, 3000);
    })
    .catch((error) => {
      dispatch({ type: "SET_LOADING", value: false });
      console.log(error);
    });
};

export const updateActiveCar = (id, value) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  let valueSubmit;
  valueSubmit = value === false ? true : false;
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/cars/activecar/${id}`;

  await axios
    .patch(URL, {
      offline_car: valueSubmit,
    })
    .then((response) => {
      MessageComp("Succsess Update", "success");
      dispatch({ type: "SET_CARS_ACTIVE", value: false });
      setTimeout(() => {
        dispatch(getDataCars());
      }, 2000);
    })
    .catch((error) => {
      dispatch({ type: "SET_LOADING", value: false });
      console.log(error);
    });
};

export const filterNewCar = (value) => async (dispatch) => {
  // dispatch({ type: "SET_LOADING", value: true });
  dispatch({ type: "SET_CARS_SEARCH", value: value });
  // setTimeout(() => {
  // }, 1000);
  return;
};
