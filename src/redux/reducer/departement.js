const initDepartement = {
  departement: [],
  departementCreate: "",
  isModalFilterDepartement: false,
};

export const departementReducer = (state = initDepartement, action) => {
  switch (action.type) {
    case "SET_DEPARTEMENT":
      return {
        ...state,
        departement: action.value,
      };
    case "SET_DEPARTEMENT_ADD":
      return {
        ...state,
        areaCreate: action.value,
      };
    case "SET_DEPARTEMENT_FILTER":
      return {
        ...state,
        isModalFilterDepartement: action.value,
      };

    default:
      return state;
  }
};
