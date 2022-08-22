const initUser = {
  users: [],
  userAreaOption: [],
  userDepartement: [],
  userDepartementOption: [],
  userDepartementFilter: [],
  userCarsOption: [],
  userCarsOption2: [],
  userEdit: null,
  menuSelection: null,
  userCreate: null,
  isModalUserAccess: false,
  isModalUserFilter: false,
  isUserMenuSelected: [],
  isUserAccess: [],
};

export const userReducer = (state = initUser, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.value,
      };
    case "SET_USERS_AREA_OPT":
      return {
        ...state,
        userAreaOption: action.value,
      };
    case "SET_USERS_DEPART":
      return {
        ...state,
        userDepartement: action.value,
      };
    case "SET_USERS_DEPART_OPT":
      return {
        ...state,
        userDepartementOption: action.value,
      };
    case "SET_USERS_CARS_OPT":
      return {
        ...state,
        userCarsOption: action.value,
      };
    case "SET_USERS_CARS_OPT_2":
      return {
        ...state,
        userCarsOption2: action.value,
      };
    case "SET_USERS_MENU_SELECT":
      return {
        ...state,
        menuSelection: action.value,
      };
    case "SET_USERS_CREATE":
      return {
        ...state,
        userCreate: action.value,
      };
    case "SET_USERS_MODAL_ACC":
      return {
        ...state,
        isModalUserAccess: action.value,
      };
    case "SET_USERS_FILTER":
      return {
        ...state,
        isModalUserFilter: action.value,
      };
    case "SET_USERS_DEPART_FILTER":
      return {
        ...state,
        userDepartementFilter: action.value,
      };
    case "SET_USER_EDIT":
      return {
        ...state,
        userEdit: action.value,
      };
    case "SET_USER_MENU_SELECT":
      return {
        ...state,
        isUserMenuSelected: action.value,
      };
    case "SET_USER_ACCESS":
      return {
        ...state,
        isUserAccess: action.value,
      };
    default:
      return state;
  }
};
