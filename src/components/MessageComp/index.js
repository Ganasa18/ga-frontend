import { message } from "antd";
import React from "react";
import "./style.less";

const MessageComp = (messageText, type) => {
  if (type == "success") {
    return message.success({
      content: `${messageText}`,
      className: "custom-class-success",
    });
  } else if (type == "warning") {
    return message.warning({
      content: `${messageText}`,
      className: "custom-class-warning",
    });
  } else {
    return message.error({
      content: `${messageText}`,
      className: "custom-class-error",
    });
  }
};

export default MessageComp;
