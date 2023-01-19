import axios from "axios";
import { endPoint } from "../../assets/config";
import { MessageComp } from "../../components";
import filterByValue from "../../utils/useFilter";
import { setLoading } from "./global";

export const getDataReport = () => async (dispatch) => {
  dispatch(setLoading(true));
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/report/`;

  const URL_AREA = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/area/`;

  const URL_DPT = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/departement/`;

  const URL_CARS = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/cars/`;

  const requestOne = await axios.get(URL);
  const requestTwo = await axios.get(URL_AREA);
  const requestThree = await axios.get(URL_DPT);
  const requestFour = await axios.get(URL_CARS);

  axios
    .all([requestOne, requestTwo, requestThree, requestFour])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        const responseFour = responses[3];

        let newDataReport = responseOne.data.data.reports;
        let newDataArea = responseTwo.data.data.areas;
        let newDataDepartement = responseThree.data.data.departements;
        let newDataCar = responseFour.data.data.cars;

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

        const newArr1 = newDataArea.map((item) => ({
          value: item.id,
          label: item.area_name,
        }));

        let newArr2 = newDataDepartement.map((item) => ({
          value: item.departement_name,
          label: item.departement_name,
        }));

        newArr2 = newArr2.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) => t.value === value.value && t.label === value.label
            )
        );

        const newArr3 = newDataCar.map((item) => ({
          value: item.license_plate,
          label: item.license_plate + " / " + item.model_vehicle,
          pull_or_takehome: item.pull_or_takehome,
          ownership: item.ownership,
        }));

        dispatch({ type: "SET_REPORT", value: newDataReport });
        dispatch({
          type: "SET_REPORT_AREA_OPT",
          value: newArr1,
        });
        dispatch({
          type: "SET_REPORT_DEPART_OPT",
          value: newArr2,
        });
        dispatch({
          type: "SET_REPORT_CARS_OPT",
          value: newArr3,
        });

        setTimeout(() => {
          dispatch(setLoading(false));
        }, 3000);
      })
    )
    .catch((error) => {
      dispatch({ type: "SET_LOADING", value: false });
      console.log(error);
    });

  // await axios
  //   .get(URL)
  //   .then((response) => {
  //     let newDataReport = response.data.data.reports;
  //     newDataReport = newDataReport.map((item) => ({
  //       key: item.id,
  //       user_name: item.user_name,
  //       plate_car: item.plate_car,
  //       car_name: item.car_name,
  //       departement: item.departement,
  //       area: item.area,
  //       km_awal: item.km_awal,
  //       km_akhir: item.km_akhir,
  //       picture_1: item.picture_1,
  //       picture_2: item.picture_2,
  //       location: item.location,
  //       newLocation: item.newLocation,
  //       createdAt: item.createdAt,
  //       updatedAt: item.updatedAt,
  //       locationDate: item.locationDate,
  //     }));
  //     // console.log(newDataReport);
  //     dispatch({ type: "SET_REPORT", value: newDataReport });
  //     setTimeout(() => {
  //       dispatch(setLoading(false));
  //     }, 2000);
  //   })
  //   .catch((error) => {
  //     alert("Something went wrong");
  //     console.log(error);
  //   });
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

export const getDataLocationReport = () => async (dispatch) => {
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/location/`;
  await axios
    .get(URL)
    .then((response) => {
      let option = response.data.data.locations;
      option = option.map((item) => ({
        value: item.location_name,
        label:
          item.location_name_rev !== null
            ? `${item.location_name}/${item.location_name_rev}`
            : item.location_name,
        type: item.type_location,
        rev: item.location_name_rev,
        id: item.id,
      }));
      dispatch({ type: "SET_REPORT_LOCATION_OPTION", value: option });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDataDriverOff = () => async (dispatch) => {
  dispatch(setLoading(true));
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/report/driver-off`;

  await axios
    .get(URL)
    .then((response) => {
      let newDataReport = response.data.data.offline;
      newDataReport = newDataReport.map((item) => ({
        key: item.id,
        user_name: item.user_name,
        departement: item.departement,
        area: item.area,
        remark: item.remark,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      // console.log(newDataReport);
      dispatch({ type: "SET_REPORT_OFFLINE", value: newDataReport });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 2000);
    })
    .catch((error) => {
      alert("Something went wrong");
      console.log(error);
    });
};

export const createOrUpdateLocation =
  (location, selectedReport, selectedLocation) => async (dispatch) => {
    // check new location
    const URL = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/location/`;

    const URL_UPDATE = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/report/update-location/${selectedReport}`;

    const URL_CHECK = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/report/update-location-report/${selectedReport}`;

    const URL_UPDATE_LOCATION = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/location/${location?.id}`;

    if (location?.__isNew__) {
      const data = {
        location_name: location?.label,
        location_name_rev: selectedLocation?.location,
        type_location: selectedLocation?.category,
        tagLocation: "user",
      };

      await axios
        .get(URL_CHECK)
        .then(async (response) => {
          if (response?.data?.count == 1) {
            await axios.patch(URL_UPDATE, {});
            dispatch(updateLocationStatus(URL_CHECK, selectedLocation));
          }

          if (response?.data?.count >= 2) {
            dispatch(updateLocationStatus(URL_CHECK, selectedLocation));
          }
          // Create Location
          await axios
            .post(URL, data)
            .then(() => {
              dispatch({ type: "SET_REPORT_LOCATION", value: false });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            })
            .catch((error) => {
              console.log(error);
              alert("Something Wrong", "warning");
            });
        })
        .catch((error) => {
          console.log("something went wrong");
        });

      return;
    }

    await axios
      .get(URL_CHECK)
      .then(async (response) => {
        if (response?.data?.count == 1) {
          await axios.patch(URL_UPDATE, {});
          dispatch(updateLocationStatus(URL_CHECK, selectedLocation));
        }

        if (response?.data?.count >= 2) {
          dispatch(updateLocationStatus(URL_CHECK, selectedLocation));
        }
        // Update Location
        await axios
          .patch(URL_UPDATE_LOCATION, {
            location_name_rev: selectedLocation?.location,
          })
          .then(() => {
            dispatch({ type: "SET_REPORT_LOCATION", value: false });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            console.log(error);
            alert("Something Wrong", "warning");
          });
      })
      .catch((error) => {
        console.log("something went wrong");
      });
  };

export const updateLocationStatus =
  (URL, selectedLocation) => async (dispatch) => {
    selectedLocation.newLoc = false;

    const data = { status_now: selectedLocation };

    await axios.patch(URL, data).catch((error) => {
      alert("Something Wrong", "warning");
    });

    console.log(selectedLocation, "after update");
  };

export const filterReport =
  (area, departement, car, dateFrom, dateTo) => async (dispatch) => {
    dispatch({ type: "SET_LOADING", value: true });
    const check = document.getElementById("option").checked;
    let newLoc = false;
    if (check) {
      newLoc = true;
    }

    const data = {
      area: area?.label,
      departement: departement?.label,
      car: car?.value,
      newlocation: newLoc,
      dateFrom,
      dateTo,
    };

    const URL = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/report/`;

    await axios
      .get(URL, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        let newData = response.data.data.reports;
        if (newData.length > 0) {
          newData = newData.map((item) => ({
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
          dispatch({ type: "SET_REPORT", value: newData });
          dispatch({ type: "SET_REPORT_FILTER", value: false });
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 1500);

          return;
        }
        dispatch({ type: "SET_REPORT_FILTER", value: false });
        setTimeout(() => {
          dispatch(setLoading(false));
          dispatch(getDataReport());
        }, 1500);
      })
      .catch((error) => {
        alert("Something Wrong");
      });
  };
