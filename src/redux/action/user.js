import axios from "axios";
import { endPoint } from "../../assets/config";
import { MessageComp } from "../../components";
import { axiosFunc, axiosFuncMoreThanOne } from "../../lib/AxiosFunc";
import filterByValue from "../../utils/useFilter";

// Get Data
export const getDataUsers = () => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  dispatch({ type: "SET_TAG_FILTER", value: null });
  const URL_USER = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/user/cars`;

  const URL_AREA = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/area/`;

  const URL_DPT = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/departement/`;

  const URL_CARS = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/cars/`;

  const requestOne = await axiosFunc("get", URL_USER);
  const requestTwo = await axiosFunc("get", URL_AREA);
  const requestThree = await axiosFunc("get", URL_DPT);
  const requestFour = await axiosFunc("get", URL_CARS);

  const arrayData = [requestOne, requestTwo, requestThree, requestFour];

  const getAll = await axiosFuncMoreThanOne(arrayData);

  // Error Handling
  if (
    requestOne.status !== 200 ||
    requestTwo.status !== 200 ||
    requestThree.status !== 200 ||
    requestFour.status !== 200
  ) {
    MessageComp("Something went wrong", "warning");
    return;
  }

  let newDataUser = getAll[0].data.data.users;
  let newDataArea = getAll[1].data.data.areas;
  let newDataDepartement = getAll[2].data.data.departements;
  let newDataCar = getAll[3].data.data.cars;

  newDataUser = newDataUser.map((item) => ({
    key: item.id,
    uuid: item.uuid,
    username: item.username,
    firstName: item.firstName,
    lastName: item.lastName,
    phoneNumber: item.phoneNumber,
    address: item.address,
    area: item.area,
    area_name: item.area_name,
    departement: item.departement,
    model_vehicle: item.model_vehicle,
    role: item.role,
    plate_car: item.plate_car,
    departement_name: item.departement_name,
    car_1: item.car_1,
    car_2: item.car_2,
    car_3: item.car_3,
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
      self.findIndex((t) => t.value === value.value && t.label === value.label)
  );

  const newArr3 = newDataCar.map((item) => ({
    value: item.license_plate,
    label: item.license_plate + " / " + item.model_vehicle,
    pull_or_takehome: item.pull_or_takehome,
    ownership: item.ownership,
  }));

  const newArr4 = newDataCar.map((item) => ({
    value: item.license_plate,
    label: item.license_plate + " / " + item.model_vehicle,
    model_vehicle: item.model_vehicle,
  }));

  dispatch({
    type: "SET_USERS",
    value: newDataUser,
  });
  dispatch({
    type: "SET_USERS_AREA_OPT",
    value: newArr1,
  });
  dispatch({
    type: "SET_USERS_DEPART",
    value: newDataDepartement,
  });
  dispatch({
    type: "SET_USERS_CARS_OPT",
    value: newArr3,
  });
  dispatch({
    type: "SET_USERS_CARS_OPT_2",
    value: newArr4,
  });

  dispatch({
    type: "SET_USERS_DEPART_FILTER",
    value: newArr2,
  });

  setTimeout(() => {
    dispatch({ type: "SET_LOADING", value: false });
  }, 3000);
};

// Get Data
export const createDataUser =
  (form, menu, area, departement, car, useForm) => async (dispatch) => {
    if (form.firstName.length === 0 || form?.firstName?.target?.value === "") {
      const error = {
        firstName: "Must fill first name",
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    } else if (
      form.lastName.length === 0 ||
      form?.lastName?.target?.value === ""
    ) {
      const error = {
        lastName: "Must fill first name",
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    } else if (
      form.phoneNumber.length === 0 ||
      form?.phoneNumber?.target?.value === ""
    ) {
      const error = {
        phoneNumber: "Must fill phone number",
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    } else if (form.username.length === 0) {
      const error = {
        username: "Must fill username",
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    } else if (area === null) {
      const error = {
        areaSelect: "Must select 1 area",
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    } else if (departement === null) {
      const error = {
        departSelect: "Must select 1 departement",
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    } else if (car === null) {
      const error = {
        carSelect: "Must select 1 car",
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    } else {
      dispatch({ type: "SET_IS_ERROR", value: null });
    }

    const URL = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/user/`;
    const URL_ACC = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/menu/menu-acc`;

    await axios
      .post(URL, {
        username: form?.username?.target?.value,
        firstName: form?.firstName?.target?.value,
        lastName: form?.lastName?.target?.value,
        phoneNumber: form?.phoneNumber?.target?.value,
        address: form?.address?.target?.value,
        area: area.value,
        departement: departement.value,
        role: "DRIVER",
        plate_car: car === null ? null : car.value,
        password: form?.password.target?.value,
      })
      .then((response) => {
        dispatch({ type: "SET_LOADING_PAGE", value: true });
        const user_id = response.data.data.user.id;
        const data = {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          username: "",
          password: "",
        };
        dispatch({
          type: "SET_USERS_CREATE",
          value: data,
        });
        if (menu.length > 0) {
          menu.forEach((item) => {
            (async () => {
              await axios
                .post(URL_ACC, {
                  menu_id: item,
                  user_id: user_id,
                })
                .then((response) => {
                  console.log(response);
                });
            })();
          });
          dispatch({ type: "SET_MODAL", value: false });
          MessageComp("Succsess Create", "success");
          setTimeout(() => {
            window.location.reload();
          }, 3000);

          return;
        }
        dispatch({ type: "SET_MODAL", value: false });
        MessageComp("Succsess Create", "success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })

      .catch((err) => {
        alert("something wrong");
        console.log(err.response);
      });
  };

export const searchUser = (value, userData) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  setTimeout(() => {
    if (value.length <= 0) {
      dispatch(getDataUsers());
      return;
    }
    let searchRequest = filterByValue(userData, value);
    dispatch({ type: "SET_USERS", value: searchRequest });
    dispatch({ type: "SET_LOADING", value: false });
  }, 3000);
};

export const filterUser = (area, departement, car) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });

  // if (area === undefined && departement === undefined && car === undefined) {
  //   MessageComp("Must Fill Min 1 Field", "warning");
  //   dispatch({ type: "SET_LOADING", value: false });
  //   return;
  // }
  // console.log(area, departement, car);
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/user/cars`;

  const areaLab = area ? area.label : null;

  let filter = new Array(areaLab, departement, car);
  filter = filter.filter(function (element) {
    return element !== undefined;
  });

  filter = filter.filter(function (el) {
    return el != null;
  });

  await axios
    .get(URL, {
      params: {
        area: area?.value,
        departement: departement,
        car: car,
      },
    })
    .then((response) => {
      dispatch({
        type: "SET_USERS",
        value: response.data.data.users,
      });

      if (filter.length > 0) {
        dispatch({
          type: "SET_TAG_FILTER",
          value: { users: filter },
        });
      } else {
        dispatch({
          type: "SET_TAG_FILTER",
          value: null,
        });
      }

      dispatch({ type: "SET_USERS_FILTER", value: false });
      setTimeout(() => {
        dispatch({ type: "SET_LOADING", value: false });
      }, 3000);
    })
    .catch((error) => {
      dispatch({ type: "SET_LOADING", value: false });
      console.log(error);
    });
};

export const accessUserMenuList = (user) => async (dispatch) => {
  const URL = `${endPoint[0].url}${
    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
  }/api/v1/menu/menu-access-user/${user}`;

  await axios
    .get(URL)
    .then((response) => {
      dispatch({
        type: "SET_USER_MENU_SELECT",
        value: response.data.data.menus,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUser =
  (user, form, menu, area, departement, car) => async (dispatch) => {
    console.log(user, form, menu, area, departement, car);

    const URL = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/user/edit/${user.uuid}`;

    const URL_ACC = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/menu/menu-acc`;

    if (area !== null && departement === null) {
      const error = {
        departSelect: "Must select 1 departement",
      };
      return dispatch({ type: "SET_IS_ERROR", value: error });
    } else {
      dispatch({ type: "SET_IS_ERROR", value: null });
    }

    const dataUpdate = {
      firstName: !form.firstName
        ? user.firstName
        : form?.firstName?.target?.value,
      lastName: !form.lastName ? user.lastName : form?.lastName?.target?.value,
      phoneNumber: !form.phoneNumber
        ? user.phoneNumber
        : form?.phoneNumber?.target?.value,
      address: !form.address ? user.address : form?.address?.target?.value,
      area: !area ? user.area : area.value,
      departement: !departement ? user.departement : departement?.value,
      plate_car: !car ? user.plate_car : car.value,
      password: !form.password ? "123" : form?.password?.target?.value,
    };

    // const user_id = localStorage.setItem("id", user.key);

    await axios
      .patch(URL, dataUpdate)
      .then((response) => {
        dispatch({ type: "SET_LOADING_PAGE", value: true });

        if (menu.length > 0) {
          menu.forEach((item) => {
            (async () => {
              await axios
                .post(URL_ACC, {
                  menu_id: item,
                  user_id: user.key,
                })
                .then((response) => {
                  console.log(response);
                });
            })();
          });
        }

        const data = {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          username: "",
          password: "",
        };
        dispatch({
          type: "SET_USERS_CREATE",
          value: data,
        });
        dispatch({ type: "SET_MODAL_EDIT", value: false });
        MessageComp("Succsess Update", "success");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        alert("something wrong");
        dispatch({ type: "SET_LOADING_PAGE", value: false });
        // console.log(err.response);
      });
  };

export const updateCarUser =
  (user, carDefault, car1, car2, car3) => async (dispatch) => {
    const URL = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/user/edit/${user.uuid}`;
    const URL_CARS = `${endPoint[0].url}${
      endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
    }/api/v1/user/update-car/${user.uuid}`;

    dispatch({ type: "SET_LOADING_PAGE", value: true });

    const data = {
      car1: !car1 ? null : JSON.stringify(car1),
      car2: !car2 ? null : JSON.stringify(car2),
      car3: !car3 ? null : JSON.stringify(car3),
    };

    await axios
      .patch(URL_CARS, data)
      .then((response) => {
        dispatch({ type: "SET_USERS_MODAL_ACC", value: false });
        MessageComp("Succsess Update", "success");

        if (carDefault.plate_car !== user.plate_car) {
          (async () => {
            await axios
              .patch(URL, {
                plate_car: carDefault.plate_car,
              })
              .then((response) => {
                console.log("sucess");
              })
              .catch((err) => {
                alert("something wrong update default");
              });
          })();
        }

        setTimeout(() => {
          dispatch({ type: "SET_LOADING_PAGE", value: false });
          dispatch(getDataUsers());
        }, 2000);
      })
      .catch((err) => {
        alert("something wrong");
        dispatch({ type: "SET_LOADING_PAGE", value: false });
      });
  };
