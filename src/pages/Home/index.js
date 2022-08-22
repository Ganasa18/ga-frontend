import { Breadcrumb, Layout } from "antd";
import React from "react";
import { Sidebar } from "../../components";
const { Content } = Layout;

const Home = () => {
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
        <h1>Home Page</h1>
      </div>
    </>
  );
};

export default Home;
