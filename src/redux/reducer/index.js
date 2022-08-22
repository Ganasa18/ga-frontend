import { combineReducers } from "redux";
import { globalReducer } from "./global";
import { areaReducer } from "./area";
import { departementReducer } from "./departement";
import { carsReducer } from "./cars";
import { userReducer } from "./user";
import { locationReducer } from "./location";

const reducer = combineReducers({
  globalReducer,
  areaReducer,
  departementReducer,
  carsReducer,
  userReducer,
  locationReducer,
});

export default reducer;
