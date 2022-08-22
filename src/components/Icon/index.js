import React from "react";

const IconComponent = ({ name }) => {
  return (
    <span
      className="iconify anticon ant-menu-item-icon"
      data-icon={name}></span>
  );
};

export default IconComponent;
