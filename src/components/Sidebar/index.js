import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Grid,
  Skeleton,
} from "antd";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { IconComponent } from "../../components";
import Router from "../../router/Router";
import "./style.less";
import logoOpen from "../../assets/side-open.svg";
import logoClose from "../../assets/side-close.svg";
import { useDispatch, useSelector } from "react-redux";
import Gap from "../Gap";
import { getMenu } from "../../redux/action";
import { Loading } from "../../components";
const cookies = new Cookies();
const userName = cookies.get("username");
const userId = cookies.get("user_id");
const { useBreakpoint } = Grid;

const { Header, Content, Sider } = Layout;

const Sidebar = () => {
  const { globalReducer } = useSelector((state) => state);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(null);

  const screensCheck = useBreakpoint();
  const dispatch = useDispatch();

  // console.log(activeItem.key, window.location.pathname, current);

  const onCollapse = () => {
    setCollapsed((prevcollapse) => !prevcollapse);
  };

  const onClick = (e) => {
    const activeItem = globalReducer.menus.find((item) => item.id == e.key);
    setCurrent(activeItem);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getFirstLetter(string) {
    var matches = string.match(/\b(\w)/g);
    var acronym = matches.join("").toUpperCase();
    return acronym;
  }

  const clickTopbar = ({ key }) => {
    if (key === "1") return alert("profile");
    if (key === "2") alert("logout");
    handleLogOut();
    return;
  };

  const menu = (
    <Menu
      onClick={clickTopbar}
      items={[
        {
          key: "1",
          label: "Profile",
        },
        {
          key: "2",
          danger: true,
          label: "Log Out",
        },
      ]}
    />
  );

  const handleLogOut = () => {
    cookies.remove("token", { path: "/" });
    cookies.remove("username", { path: "/" });

    setTimeout(() => {
      window.location.assign("/");
    }, 1500);
  };

  useEffect(() => {
    dispatch(getMenu(userId));
  }, []);

  return (
    <BrowserRouter>
      <Layout
        style={{
          minHeight: "100vh",
        }}>
        <Sider
          breakpoint="lg"
          {...(screensCheck.xs && { collapsedWidth: "0" })}
          // collapsedWidth={screensCheck.xs ? "0" : null}
          className="sidebar-style"
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}>
          <div className="logo">
            {collapsed ? (
              <img
                className="logo-img"
                src={logoClose}
                alt="Logo"
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              />
            ) : (
              <img
                className="logo-img"
                src={logoOpen}
                alt="Logo"
                style={{
                  marginTop: "20px",
                  marginLeft: "20px",
                  width: "150px",
                  height: "60px",
                }}
              />
            )}
          </div>

          <Menu
            onClick={onClick}
            theme="light"
            defaultSelectedKeys={[current]}
            mode="inline">
            {globalReducer.isLoadingMenu ? (
              <>
                {globalReducer.menus.map((index) => (
                  <>
                    <Skeleton.Input
                      active
                      style={{ width: "100%" }}
                      size="default"
                      block={true}
                    />
                    <Gap height={"10px"} />
                  </>
                ))}
              </>
            ) : (
              <>
                {globalReducer.menus.map((item, index) => (
                  <Menu.Item key={index}>
                    <IconComponent name={item.menu_icon} />
                    <span>{item.menu_name}</span>
                    <Link to={item.menu_url} />
                  </Menu.Item>
                ))}
              </>
            )}
          </Menu>
          {/* 
          <Menu
            onClick={onClick}
            theme="light"
            defaultSelectedKeys={[current]}
            mode="inline"
            items={items}
          /> */}
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}>
            <Space>
              <Button
                type="text"
                onClick={onCollapse}
                style={{
                  marginBottom: 16,
                  color: "white",
                }}>
                {collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: 20 }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: 20 }} />
                )}
              </Button>
            </Space>
            <Space style={{ float: "right", marginRight: "20px" }}>
              <Avatar>{getFirstLetter(userName)}</Avatar>
              <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="labelName">
                    {capitalizeFirstLetter(userName)}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Space>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}>
            {globalReducer.isLoadingPage && (
              <div className="overlay">
                <Loading />
              </div>
            )}
            <Router />
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default Sidebar;
