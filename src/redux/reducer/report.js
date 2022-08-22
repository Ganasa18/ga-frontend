const initReport = {
  report: null,
};

export const reportReducer = (state = initReport, action) => {
  switch (action.type) {
    case "SET_REPORT":
      return {
        ...state,
        report: action.value,
      };
    default:
      return state;
  }
};
