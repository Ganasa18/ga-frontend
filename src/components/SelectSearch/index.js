import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

const SelectSearchComp = ({ option, ...props }) => {
  const { globalReducer } = useSelector((state) => state);
  const selectedOption = globalReducer.selectedValue;
  const dispatch = useDispatch();

  const handleSelected = async (e) => {
    // console.log(e);
    dispatch({ type: "SET_SELECTED", value: e });
  };

  return (
    <>
      <Select
        defaultValue={selectedOption}
        onChange={handleSelected}
        options={option}
        {...props}
      />
    </>
  );
};

export default SelectSearchComp;
