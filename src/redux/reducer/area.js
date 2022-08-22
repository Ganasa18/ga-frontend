const initArea = {
  area: [],
  areaCreate: "",
  areaEdit: [],
  searchArea: null,
};

export const areaReducer = (state = initArea, action) => {
  switch (action.type) {
    case "SET_AREA":
      return {
        ...state,
        area: action.value,
      };
    case "SET_AREA_ADD":
      return {
        ...state,
        areaCreate: action.value,
      };
    case "SET_AREA_EDIT":
      return {
        ...state,
        areaEdit: action.value,
      };
    case "SET_AREA_SEARCH":
      return {
        ...state,
        searchArea: action.value,
      };

    default:
      return state;
  }
};
