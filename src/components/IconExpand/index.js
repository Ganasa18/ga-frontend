import React from "react";
import "./style.less";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const IconExpand = ({ icon, onClick }) => {
  return (
    <>
      <div className="icon-container-expand" onClick={onClick}>
        {icon === "up" ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </div>
    </>
  );
};

export default IconExpand;
