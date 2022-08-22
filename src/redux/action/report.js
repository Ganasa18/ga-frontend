import axios from "axios";
import { endPoint } from "../../assets/config";
import filterByValue from "../../utils/useFilter";
import { setLoading } from "./global";

export const getDataReport = () => async (dispatch) => {
  dispatch(setLoading(true));
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/report/`;

  await axios
    .get(URL)
    .then((response) => {
      let newDataReport = response.data.data.reports;
      newDataReport = newDataReport.map((item) => ({
        key: item.id,
        user_name: item.user_name,
        plate_car: item.plate_car,
        car_name: item.car_name,
        departement: item.departement,
        area: item.area,
        km_awal: item.km_awal,
        km_akhir: item.km_akhir,
        picture_1: item.picture_1,
        picture_2: item.picture_2,
        location: item.location,
        newLocation: item.newLocation,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        locationDate: item.locationDate,
      }));
      // console.log(newDataReport);
      dispatch({ type: "SET_REPORT", value: newDataReport });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 2000);
    })
    .catch((error) => {
      alert("Something went wrong");
      console.log(error);
    });
};

export const searchReport = (value, reportData) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  setTimeout(() => {
    if (value.length <= 0) {
      dispatch(getDataReport());
      return;
    }
    let searchRequest = filterByValue(reportData, value);
    dispatch({ type: "SET_REPORT", value: searchRequest });
    dispatch({ type: "SET_LOADING", value: false });
  }, 3000);
};
