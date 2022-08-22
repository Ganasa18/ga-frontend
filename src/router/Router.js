import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import {
  Area,
  Cars,
  Departement,
  Home,
  Location,
  NotFound,
  Report,
  User,
} from "../pages";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const userRole = cookies.get("role");

const Router = () => {
  const { globalReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (globalReducer.menus.length === 0) {
    return (
      <Switch>
        <Route index path="/" element={<Home />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Switch>
    );
  } else {
    if (userRole == "ADMIN") {
      return (
        <Switch>
          <Route path="/report" element={<Report />} />
          <Route path="/area" element={<Area />} />
          <Route path="/departement" element={<Departement />} />
          <Route path="/users" element={<User />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/location" element={<Location />} />
          <Route index path="/" element={<Home />} />
          <Route path="*" exact={true} element={<NotFound />} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route index path="/" element={<Home />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Switch>
    );
  }
};

export default Router;
