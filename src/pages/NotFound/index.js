import { Breadcrumb } from "antd";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}>
        <h1>Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;
