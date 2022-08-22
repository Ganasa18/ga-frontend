import React from "react";
import "./style.less";

const SearchForm = ({ ...restProps }) => {
  return (
    <div className="input-container">
      <span className="iconify icon" data-icon="bx:bx-search"></span>
      <input
        className="input-field"
        type="text"
        placeholder="Search..."
        {...restProps}
      />
    </div>
  );
};

export default SearchForm;
