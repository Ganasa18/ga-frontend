import { MessageComp } from "../../components";
import {
  accessUserMenuList,
  createDataUser,
  updateUser,
} from "../../redux/action";

const handleCarSelectUserPage = (e, setCarSelect) => {
  setCarSelect(e);
  document.getElementById("platNo").value = e.value;
  document.getElementById("pullTake").value = e.pull_or_takehome;
  document.getElementById("ownership").value = e.ownership;
};

const handleCheckedMenuUserPage = (
  dispatch,
  createUser,
  areaSelect,
  departSelect,
  carSelect,
  setForm
) => {
  var array = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value);
  }
  dispatch(
    createDataUser(createUser, array, areaSelect, departSelect, carSelect)
  );
};

const handleAreaUserPage = (e, dispatch, departement, setAreaSelect) => {
  setAreaSelect(e);
  const idDepart = departement.filter((item) => item.id_area === e.value);
  const newArr = idDepart.map((item) => ({
    value: item.id,
    label: item.departement_name,
  }));

  dispatch({
    type: "SET_USERS_DEPART_OPT",
    value: newArr,
  });
};

const handleRenderAccessUserPage = (dispatch, record) => {
  dispatch({
    type: "SET_USER_MENU_SELECT",
    value: [],
  });
  dispatch(accessUserMenuList(record.key));
  dispatch({ type: "SET_USER_ACCESS", value: record });
  dispatch({ type: "SET_USERS_MODAL_ACC", value: true });
  dispatch({ type: "SET_LOADING_PAGE", value: false });
};

const handleDefaultUserPage = (
  value,
  type,
  carDefault,
  setCarDefault,
  setCarSelect1,
  setCarSelect2,
  setCarSelect3,
  dispatch,
  userAccess
) => {
  switch (type) {
    case "car1":
      dispatch({ type: "SET_USERS_MODAL_ACC", value: false });
      MessageComp(
        `Succsess Change  ${
          !value ? "remove car default" : value?.label
        } But Not Submit `,
        "success"
      );
      dispatch({ type: "SET_LOADING_PAGE", value: true });
      if (!value) {
        setCarDefault({
          plate_car: null,
          model_vehicle: null,
        });

        setCarSelect1({
          value: null,
          label: null,
          model_vehicle: null,
        });

        setTimeout(() => {
          handleRenderAccessUserPage(dispatch, userAccess);
        }, 3000);

        return;
      }
      setCarDefault({
        plate_car: value.value,
        model_vehicle: value.model_vehicle,
      });
      setCarSelect1({
        value: carDefault.plate_car,
        label: carDefault.plate_car + " / " + carDefault.model_vehicle,
        model_vehicle: carDefault.model_vehicle,
      });
      setTimeout(() => {
        handleRenderAccessUserPage(dispatch, userAccess);
      }, 3000);

      return;
    case "car2":
      dispatch({ type: "SET_USERS_MODAL_ACC", value: false });
      MessageComp(`Succsess Change But Not Submit ${value.label}`, "success");
      dispatch({ type: "SET_LOADING_PAGE", value: true });
      setCarDefault({
        plate_car: value.value,
        model_vehicle: value.model_vehicle,
      });
      setCarSelect2({
        value: carDefault.plate_car,
        label: carDefault.plate_car + " / " + carDefault.model_vehicle,
        model_vehicle: carDefault.model_vehicle,
      });
      setTimeout(() => {
        handleRenderAccessUserPage(dispatch, userAccess);
      }, 3000);
      return;
    case "car3":
      dispatch({ type: "SET_USERS_MODAL_ACC", value: false });
      MessageComp(`Succsess Change But Not Submit ${value.label}`, "success");
      dispatch({ type: "SET_LOADING_PAGE", value: true });
      setCarDefault({
        plate_car: value.value,
        model_vehicle: value.model_vehicle,
      });
      setCarSelect3({
        value: carDefault.plate_car,
        label: carDefault.plate_car + " / " + carDefault.model_vehicle,
        model_vehicle: carDefault.model_vehicle,
      });
      setTimeout(() => {
        handleRenderAccessUserPage(dispatch, userAccess);
      }, 3000);
      return;
    default:
      return alert("something wrong");
  }
};

const handleMenuEditUserPage = (
  dispatch,
  userEdit,
  form,
  areaSelect,
  departSelect,
  carSelect
) => {
  var array = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value);
  }

  dispatch(
    updateUser(userEdit, form, array, areaSelect, departSelect, carSelect)
  );
};

export {
  handleCarSelectUserPage,
  handleCheckedMenuUserPage,
  handleAreaUserPage,
  handleRenderAccessUserPage,
  handleDefaultUserPage,
  handleMenuEditUserPage,
};
