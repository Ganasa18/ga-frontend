import React from "react";
import "./style.less";

const ButtonComp = ({
  onClickBtn,
  name,
  icon,
  btnstyle = "btn",
  ...restProps
}) => {
  return (
    <button className={btnstyle} onClick={onClickBtn} {...restProps}>
      {icon && <span className="iconify icon-btn" data-icon={icon}></span>}
      {name}
    </button>
  );
};

export default ButtonComp;
