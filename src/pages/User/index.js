import { Breadcrumb, Col, Input, Popconfirm, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardHeader,
  Gap,
  IconExpand,
  ModalComp,
  TableComp,
} from "../../components";

import {
  accessUserMenuList,
  getDataUsers,
  searchUser,
} from "../../redux/action";

import useFormUser from "../../utils/useFormUser";

import { NavLink } from "react-router-dom";
import {
  bodyModal,
  bodyModalAccess,
  bodyModalEdit,
  bodyModalFilter,
} from "./modal";
import "./style.less";
const { TextArea } = Input;

const User = () => {
  const { globalReducer, userReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [areaSelect, setAreaSelect] = useState(null);
  const [departSelect, setDepartSelect] = useState(null);
  const [carSelect, setCarSelect] = useState(null);

  const [areaFilter, setAreaFilter] = useState(null);
  const [departFilter, setDepartFilter] = useState(null);
  const [carFilter, setCarFilter] = useState(null);
  const [carDefault, setCarDefault] = useState(null);
  const [carSelect1, setCarSelect1] = useState(null);
  const [carSelect2, setCarSelect2] = useState(null);
  const [carSelect3, setCarSelect3] = useState(null);

  const [checked, setChecked] = useState(
    new Array(userReducer?.isUserMenuSelected.length).fill(true)
  );

  const optionArea = userReducer.userAreaOption;
  const departement = userReducer.userDepartement;
  const optionDepartement = userReducer.userDepartementOption;
  const optionDepartementFilter = userReducer.userDepartementFilter;
  const optionCar = userReducer.userCarsOption;
  const optionCar2 = userReducer.userCarsOption2;
  const allMenu = globalReducer.allMenus;
  const filterSelect = globalReducer.isTagFilter;
  const userAccess = userReducer.isUserAccess;

  const [form, setForm] = useFormUser(
    {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      username: "",
      password: "",
    },
    dispatch
  );

  // Column Header Table
  const columns = [
    {
      title: "Name",
      render: (_, record) =>
        userReducer.users.length >= 1 ? (
          <p>
            {record.firstName}
            <span> {record.lastName}</span>
          </p>
        ) : null,
    },

    {
      title: "Departement",
      dataIndex: "departement_name",
    },
    {
      title: "Area",
      dataIndex: "area_name",
    },

    {
      title: "Plat No",
      dataIndex: "plate_car",
    },
    {
      title: "Car",
      dataIndex: "model_vehicle",
    },
    {
      title: "Access",
      key: "access menu",
      render: (_, record) =>
        userReducer.users.length >= 1 ? (
          <div
            className="access-label"
            onClick={() => handleAccess(record, true)}>
            <p>Access</p>
          </div>
        ) : null,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        userReducer.users.length >= 1 ? (
          <Popconfirm
            title="Sure to edit?"
            onConfirm={() => handleEdit(record)}>
            <div className="edit-hover">Edit</div>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAccess = (record, type) => {
    dispatch({
      type: "SET_USER_MENU_SELECT",
      value: [],
    });
    dispatch(accessUserMenuList(record.key));
    if (type === true) {
      setCarDefault({
        plate_car: record.plate_car,
        model_vehicle: record.model_vehicle,
      });
    }

    if (record.car_1) {
      const record_car1 = JSON.parse(record.car_1);
      setCarSelect1(record_car1);
    }
    if (record.car_2) {
      const record_car2 = JSON.parse(record.car_2);
      setCarSelect2(record_car2);
    }
    if (record.car_3) {
      const record_car3 = JSON.parse(record.car_3);
      setCarSelect3(record_car3);
    }
    dispatch({ type: "SET_USER_ACCESS", value: record });
    dispatch({ type: "SET_USERS_MODAL_ACC", value: true });
  };

  const handleEdit = (record) => {
    dispatch({ type: "SET_MODAL_EDIT", value: true });
    // console.log(record);
    dispatch(accessUserMenuList(record.key));
    // dispatch({ type: "SET_USER_EDIT", value: record });
    dispatch({ type: "SET_USER_EDIT", value: record });
    // setCarSelect({ value: record.plat_car, label: record.plat_car });
  };

  let links = [
    {
      url: "/users",
      text: "Master User",
    },
    {
      url: "/control-driver",
      text: "Control Driver",
    },
    {
      url: "/notification-push",
      text: "Notifications",
    },
  ];

  useEffect(() => {
    dispatch(getDataUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}>
        {/* Tabs */}
        <Row>
          <Col span={12} order={4}>
            <div className="navigation-tabs-container">
              {links.map(({ url, text, index }) => (
                <NavLink
                  key={index}
                  to={url}
                  className={"navigation-tabs"}
                  activeClassName="selected">
                  {text}
                </NavLink>
              ))}
            </div>
          </Col>
        </Row>
        <Gap height={"30px"} />
        {/* Title */}
        <Row>
          <Col span={12} order={4}>
            <h1>Master User</h1>
          </Col>
        </Row>
        <Gap height={"30px"} />
        {/* Card Header */}
        <CardHeader
          btnFilter={true}
          onClickFilter={() =>
            dispatch({ type: "SET_USERS_FILTER", value: true })
          }
          icon={"fluent:add-12-regular"}
          nameBtn={"Create New"}
          onClickBtn={() => dispatch({ type: "SET_MODAL", value: true })}
          onSearch={(e) =>
            dispatch(searchUser(e.target.value, userReducer.users))
          }
        />
        <Gap height={"15px"} />
        {filterSelect?.users && (
          <p>{`Filter for “${filterSelect?.users.join(", ")}”`}</p>
        )}
        {/* Table */}
        <Row>
          <Col span={24} order={4}>
            {globalReducer.isLoading ? (
              <>
                {columns.map((index) => (
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
              <TableComp
                data={userReducer.users}
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      <div className="table-wrap">
                        <table className="table-custom">
                          <thead>
                            <tr>
                              <th>User Name</th>
                              <th>Phone No</th>
                              <th>Address</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{record.username}</td>
                              <td>{record.phoneNumber}</td>
                              <td>{record.address}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  ),
                  expandIcon: ({ expanded, onExpand, record }) =>
                    expanded ? (
                      <IconExpand
                        icon="up"
                        onClick={(e) => onExpand(record, e)}
                      />
                    ) : (
                      <IconExpand
                        icon="down"
                        onClick={(e) => onExpand(record, e)}
                      />
                    ),
                }}
              />
            )}
          </Col>
        </Row>
      </div>
      <ModalComp
        title="Create User"
        show={globalReducer.isModal}
        onClose={() => dispatch({ type: "SET_MODAL", value: false })}
        content={bodyModal(
          dispatch,
          userReducer,
          globalReducer,
          optionArea,
          areaSelect,
          setAreaSelect,
          departement,
          optionDepartement,
          departSelect,
          setDepartSelect,
          optionCar,
          carSelect,
          setCarSelect,
          allMenu,
          form,
          setForm
        )}
        widthModal="65%"
      />
      <ModalComp
        title="Edit User"
        show={globalReducer.isModalEdit}
        onClose={() => dispatch({ type: "SET_MODAL_EDIT", value: false })}
        content={bodyModalEdit(
          dispatch,
          form,
          setForm,
          userReducer,
          globalReducer,
          optionArea,
          areaSelect,
          setAreaSelect,
          departement,
          optionDepartement,
          departSelect,
          setDepartSelect,
          optionCar,
          carSelect,
          setCarSelect,
          allMenu,
          checked,
          setChecked
        )}
        widthModal="65%"
      />

      <ModalComp
        show={userReducer.isModalUserAccess}
        onClose={() => dispatch({ type: "SET_USERS_MODAL_ACC", value: false })}
        content={bodyModalAccess(
          dispatch,
          userAccess,
          userReducer,
          optionCar2,
          carDefault,
          setCarDefault,
          carSelect1,
          setCarSelect1,
          carSelect2,
          setCarSelect2,
          carSelect3,
          setCarSelect3
        )}
        widthModal="55%"
      />
      <ModalComp
        title="Filter Users"
        show={userReducer.isModalUserFilter}
        onClose={() => dispatch({ type: "SET_USERS_FILTER", value: false })}
        content={bodyModalFilter(
          dispatch,
          optionArea,
          optionDepartementFilter,
          optionCar,
          areaFilter,
          setAreaFilter,
          departFilter,
          setDepartFilter,
          carFilter,
          setCarFilter
        )}
        widthModal="30%"
      />
    </>
  );
};

export default User;
