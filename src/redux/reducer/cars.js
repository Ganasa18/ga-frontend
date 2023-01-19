const initCars = {
  cars: [],
  carsImport: null,
  carSelected: null,
  isModalCarDetail: false,
  isModalCarActive: false,
  isModalCarFilter: false,
  isLocationOdoo: null,
  carsSearch: null,
};

export const carsReducer = (state = initCars, action) => {
  switch (action.type) {
    case "SET_CARS":
      return {
        ...state,
        cars: action.value,
      };
    case "SET_CARS_IMPORT":
      return {
        ...state,
        carsImport: action.value,
      };
    case "SET_CARS_SELECTED":
      return {
        ...state,
        carSelected: action.value,
      };
    case "SET_CARS_DETAIL":
      return {
        ...state,
        isModalCarDetail: action.value,
      };
    case "SET_CARS_ACTIVE":
      return {
        ...state,
        isModalCarActive: action.value,
      };
    case "SET_CARS_FILTER":
      return {
        ...state,
        isModalCarFilter: action.value,
      };
    case "SET_LOCATION_ODOO":
      return {
        ...state,
        isLocationOdoo: action.value,
      };
    case "SET_CARS_SEARCH":
      return {
        ...state,
        carsSearch: action.value,
      };
    default:
      return state;
  }
};
