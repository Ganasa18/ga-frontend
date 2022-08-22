import { Breadcrumb, Layout } from "antd";
import React from "react";
import { Sidebar } from "../../components";
const { Content } = Layout;

const Report = () => {
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}>
        <h1>Report Page</h1>
      </div>
    </>
  );
};

export default Report;
