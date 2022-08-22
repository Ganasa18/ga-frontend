import React from "react";
import "./style.less";

const ModalComp = ({ show, onClose, title, content, widthModal }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div
        style={{ width: widthModal }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h1>{title}</h1>
          </div>
        )}

        <div className="modal-body">{content}</div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default ModalComp;
