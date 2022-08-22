const initLocation = {
  location: [],
  locationName: null,
};

export const locationReducer = (state = initLocation, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        location: action.value,
      };
    case "SET_LOCATION_NAME":
      return {
        ...state,
        locationName: action.value,
      };
    default:
      return state;
  }
};
