import { combineReducers } from "redux";
import { globalReducer } from "./global";
import { areaReducer } from "./area";
import { departementReducer } from "./departement";
import { carsReducer } from "./cars";
import { userReducer } from "./user";
import { locationReducer } from "./location";
import { reportReducer } from "./report";
const reducer = combineReducers({
  globalReducer,
  areaReducer,
  departementReducer,
  carsReducer,
  userReducer,
  locationReducer,
  reportReducer,
});

export default reducer;
