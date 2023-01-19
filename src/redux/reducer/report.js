const initReport = {
  report: null,
  reportLocation: false,
  selectedLocation: null,
  optionLocation: null,
  driverOff: null,
  createdLocation: false,
  selectedFromOption: null,
  reportFilter: false,
  reportAreaOption: [],
  reportAreaOptSelected: null,
  reportDepartementOption: [],
  reportDepartementOptSelected: null,
  reportCarsOption: [],
  reportCarOptSelected: null,
  selectedDateFrom: null,
  selectedDateTo: null,
};

export const reportReducer = (state = initReport, action) => {
  switch (action.type) {
    case "SET_REPORT":
      return {
        ...state,
        report: action.value,
      };
    case "SET_REPORT_OFFLINE":
      return {
        ...state,
        driverOff: action.value,
      };
    case "SET_REPORT_LOCATION":
      return {
        ...state,
        reportLocation: action.value,
      };
    case "SET_REPORT_LOCATION_SELECT":
      return {
        ...state,
        selectedLocation: action.value,
      };
    case "SET_REPORT_LOCATION_OPTION":
      return {
        ...state,
        optionLocation: action.value,
      };
    case "SET_REPORT_LOCATION_CREATE":
      return {
        ...state,
        createdLocation: action.value,
      };
    case "SET_SELECTED_OPT_LOCATION":
      return {
        ...state,
        selectedFromOption: action.value,
      };

    case "SET_REPORT_FILTER":
      return {
        ...state,
        reportFilter: action.value,
      };

    case "SET_REPORT_AREA_OPT":
      return {
        ...state,
        reportAreaOption: action.value,
      };
    case "SET_REPORT_AREA_OPT_SELECTED":
      return {
        ...state,
        reportAreaOptSelected: action.value,
      };

    case "SET_REPORT_DEPART_OPT":
      return {
        ...state,
        reportDepartementOption: action.value,
      };
    case "SET_REPORT_DEPART_OPT_SELECTED":
      return {
        ...state,
        reportDepartementOptSelected: action.value,
      };
    case "SET_REPORT_CARS_OPT":
      return {
        ...state,
        reportCarsOption: action.value,
      };

    case "SET_REPORT_CAR_OPT_SELECTED":
      return {
        ...state,
        reportCarOptSelected: action.value,
      };
    case "SET_REPORT_DATE_FROM":
      return {
        ...state,
        selectedDateFrom: action.value,
      };
    case "SET_REPORT_DATE_TO":
      return {
        ...state,
        selectedDateTo: action.value,
      };

    default:
      return state;
  }
};
