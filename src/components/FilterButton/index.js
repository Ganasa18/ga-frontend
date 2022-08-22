import React from "react";
import "./style.less";
const FilterBtn = ({ onClickFilter, ...restProps }) => {
  return (
    <button className="filter-btn" onClick={onClickFilter} {...restProps}>
      <span className="iconify icon-btn" data-icon="cil:list-filter"></span>
      <span className="name-btn">Filter</span>
    </button>
  );
};

export default FilterBtn;
