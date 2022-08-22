import { Breadcrumb, Col, Form, Input, Popconfirm, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonComp,
  CardHeader,
  Gap,
  IconExpand,
  MessageComp,
  ModalComp,
  TableComp,
} from "../../components";

import Select from "react-select";

import {
  accessUserMenuList,
  createDataUser,
  filterUser,
  getDataUsers,
  searchUser,
  updateCarUser,
  updateUser,
} from "../../redux/action";

import useFormUser from "../../utils/useFormUser";

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

const splitText = (text) => {
  if (text === "Import Odoo") {
    return text;
  }
  var stringArray = text.split(/(\s+)/);
  stringArray = stringArray.filter(function (str) {
    return /\S/.test(str);
  });
  if (stringArray.length > 1) {
    return stringArray[0].charAt(0) + ". " + stringArray[1];
  }
  return text;
};

const handleArea = (e, dispatch, departement, setAreaSelect) => {
  setAreaSelect(e);
  const idDepart = departement.filter((item) => item.id_area === e.value);
  const newArr = idDepart.map((item) => ({
    value: item.id,
    label: item.departement_name,
  }));

  dispatch({
    type: "SET_USERS_DEPART_OPT",
    value: newArr,
  });
};

const handleCarSelect = (e, setCarSelect) => {
  setCarSelect(e);
  document.getElementById("platNo").value = e.value;
  document.getElementById("pullTake").value = e.pull_or_takehome;
  document.getElementById("ownership").value = e.ownership;
};

const handleCheckedMenu = (
  dispatch,
  createUser,
  areaSelect,
  departSelect,
  carSelect,
  setForm
) => {
  var array = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value);
  }
  dispatch(
    createDataUser(createUser, array, areaSelect, departSelect, carSelect)
  );
};

// Comp Modal Create
const bodyModal = (
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
) => (
  <>
    <div className="content-wrapper-2">
      <Form layout="vertical">
        <Row>
          <Col span={10}>
            <Form.Item label="First Name *">
              <Input
                value={userReducer.userCreate?.firstName?.target?.value}
                placeholder="First Name"
                onChange={(value) => setForm("firstName", value)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.firstName}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Last Name *">
              <Input
                placeholder="Last Name"
                value={userReducer.userCreate?.lastName?.target?.value}
                onChange={(value) => setForm("lastName", value)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.lastName}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Phone No *">
              <Input
                value={userReducer.userCreate?.phoneNumber?.target?.value}
                placeholder="Phone No"
                onChange={(value) => setForm("phoneNumber", value)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.phoneNumber}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Address">
              <TextArea
                rows={4}
                placeholder="Address"
                onChange={(value) => setForm("address", value)}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Area *">
              <Select
                defaultValue={areaSelect}
                options={optionArea}
                onChange={(e) =>
                  handleArea(e, dispatch, departement, setAreaSelect)
                }
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.areaSelect}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}></Col>
          <Col span={10}>
            <Form.Item label="Department *">
              <Select
                options={optionDepartement}
                defaultValue={departSelect}
                onChange={(e) => setDepartSelect(e)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.departSelect}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Col span={10}></Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="User Name *">
              <Input
                value={userReducer.userCreate?.username?.target?.value}
                placeholder="User Name..."
                onChange={(value) => setForm("username", value)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.username}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Password *">
              <Input
                value={userReducer.userCreate?.password?.target?.value}
                placeholder="Password..."
                type="password"
                onChange={(value) => setForm("password", value)}
              />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="Car *">
              <Select
                options={optionCar}
                defaultValue={carSelect}
                onChange={(e) => handleCarSelect(e, setCarSelect)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.carSelect}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Pull/Take Home">
              <input
                type="text"
                id="pullTake"
                className="form-custom"
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Plat No">
              <input type="text" id="platNo" className="form-custom" disabled />
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Ownership">
              <input
                type="text"
                id="ownership"
                className="form-custom"
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Gap height={"20px"} />
        <Row>
          <Col span={24}>
            <h1>Menu Choose</h1>
            <hr />
            <Gap height={"10px"} />
          </Col>
          <Col span={16}>
            <div className="wrapper-checkbox">
              {allMenu.map((item) => (
                <div className="inputGroup">
                  <input
                    id={`option${item.id}`}
                    name="optionmenu"
                    type="checkbox"
                    value={item.id}
                  />
                  <label htmlFor={`option${item.id}`}>
                    {splitText(item.menu_name)}
                  </label>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
    <Gap height={"80px"} />
    <div className="button-wrapper-2">
      <ButtonComp
        btnstyle="btn-danger"
        name="Cancel"
        style={{ width: "15%" }}
        onClickBtn={() => dispatch({ type: "SET_MODAL", value: false })}
      />
      <Gap width={"20px"} />
      <ButtonComp
        name="Submit"
        style={{ width: "15%" }}
        onClickBtn={() =>
          handleCheckedMenu(dispatch, form, areaSelect, departSelect, carSelect)
        }
      />
      <Gap width={"20px"} />
    </div>
  </>
);

const handleMenuEdit = (
  dispatch,
  userEdit,
  form,
  areaSelect,
  departSelect,
  carSelect
) => {
  var array = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value);
  }

  dispatch(
    updateUser(userEdit, form, array, areaSelect, departSelect, carSelect)
  );
};

// Comp Modal Edit
const bodyModalEdit = (
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
) => (
  <>
    <div className="content-wrapper-2">
      <Form layout="vertical">
        <Row>
          <Col span={10}>
            <Form.Item label="First Name *">
              <Input
                defaultValue={userReducer?.userEdit?.firstName?.toString()}
                value={userReducer.userCreate?.firstName?.target?.value}
                placeholder="First Name"
                onChange={(value) => setForm("firstName", value)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.firstName}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Last Name *">
              <Input
                placeholder="Last Name"
                defaultValue={userReducer?.userEdit?.lastName?.toString()}
                value={userReducer.userCreate?.lastName?.target?.value}
                onChange={(value) => setForm("lastName", value)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.lastName}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Phone No *">
              <Input
                defaultValue={userReducer?.userEdit?.phoneNumber?.toString()}
                value={userReducer.userCreate?.phoneNumber?.target?.value}
                placeholder="Phone No"
                onChange={(value) => setForm("phoneNumber", value)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.phoneNumber}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Address">
              <TextArea
                defaultValue={userReducer?.userEdit?.address?.toString()}
                rows={4}
                placeholder="Address"
                onChange={(value) => setForm("address", value)}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Area *">
              <Select
                placeholder={userReducer?.userEdit?.area_name?.toString()}
                defaultValue={areaSelect}
                options={optionArea}
                onChange={(e) =>
                  handleArea(e, dispatch, departement, setAreaSelect)
                }
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.areaSelect}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}></Col>
          <Col span={10}>
            <Form.Item label="Department *">
              <Select
                placeholder={userReducer?.userEdit?.departement_name?.toString()}
                options={optionDepartement}
                defaultValue={departSelect}
                onChange={(e) => setDepartSelect(e)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.departSelect}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Col span={10}></Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="User Name *">
              <Input
                disabled
                defaultValue={userReducer?.userEdit?.username?.toString()}
                value={userReducer.userCreate?.username?.target?.value}
                placeholder="User Name..."
                onChange={(value) => setForm("username", value)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.username}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Password *">
              <Input
                value={userReducer.userCreate?.password?.target?.value}
                placeholder="Password..."
                type="password"
                onChange={(value) => setForm("password", value)}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Car *">
              <Select
                placeholder={`${userReducer?.userEdit?.plate_car?.toString()} / ${userReducer?.userEdit?.model_vehicle?.toString()}`}
                options={optionCar}
                defaultValue={carSelect}
                onChange={(e) => handleCarSelect(e, setCarSelect)}
              />
              {/* Validation */}
              {globalReducer.isError && (
                <>
                  <Gap height={"8px"} />
                  <p style={{ marginLeft: "2px", color: "red" }}>
                    {globalReducer.isError?.carSelect}
                  </p>
                </>
              )}
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Pull/Take Home">
              <input
                type="text"
                id="pullTake"
                className="form-custom"
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Plat No">
              <input type="text" id="platNo" className="form-custom" disabled />
            </Form.Item>
          </Col>
          <Gap width="80px" />
          <Col span={10}>
            <Form.Item label="Ownership">
              <input
                type="text"
                id="ownership"
                className="form-custom"
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Gap height={"20px"} />
        <Row>
          <Col span={24}>
            <h1>Menu Choose</h1>
            <hr />
            <Gap height={"10px"} />
          </Col>
          <Col span={16}>
            <div className="wrapper-checkbox">
              {allMenu.map((item, index) => (
                <div className="inputGroup">
                  <input
                    id={`option${item.id}`}
                    name="optionmenu"
                    type="checkbox"
                    value={item.id}
                  />
                  {/* {userReducer?.isUserMenuSelected.map((menu, index) => (
                    <input
                      id={`option${item.id}`}
                      name="optionmenu"
                      type="checkbox"
                      value={item.id}
                      // checked={checked[index]}
                      // defaultChecked={menu.menu_id === item.id ? true : false}
                      // {...(menu.menu_id === item.id ? { checked: true } : null)}
                      // onChange={(e) =>
                      //   handleMenuEdit(
                      //     e,
                      //     dispatch,
                      //     item.id,
                      //     userReducer?.isUserMenuSelected,
                      //     allMenu
                      //   )
                      // }
                      // onClick={() => setChecked(!checked)}
                    />
                  ))} */}
                  <label htmlFor={`option${item.id}`}>
                    {splitText(item.menu_name)}
                  </label>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
    <Gap height={"80px"} />
    <div className="button-wrapper-2">
      <ButtonComp
        btnstyle="btn-danger"
        name="Cancel"
        style={{ width: "15%" }}
        onClickBtn={() => dispatch({ type: "SET_MODAL_EDIT", value: false })}
      />
      <Gap width={"20px"} />
      <ButtonComp
        name="Update"
        style={{ width: "15%" }}
        onClickBtn={() =>
          handleMenuEdit(
            dispatch,
            userReducer?.userEdit,
            form,
            areaSelect,
            departSelect,
            carSelect
          )
        }
      />
      <Gap width={"20px"} />
    </div>
  </>
);

const handleRenderAccess = (dispatch, record) => {
  dispatch({
    type: "SET_USER_MENU_SELECT",
    value: [],
  });
  dispatch(accessUserMenuList(record.key));
  dispatch({ type: "SET_USER_ACCESS", value: record });
  dispatch({ type: "SET_USERS_MODAL_ACC", value: true });
  dispatch({ type: "SET_LOADING_PAGE", value: false });
};

const handleDefault = (
  value,
  type,
  carDefault,
  setCarDefault,
  setCarSelect1,
  setCarSelect2,
  setCarSelect3,
  dispatch,
  userAccess
) => {
  switch (type) {
    case "car1":
      dispatch({ type: "SET_USERS_MODAL_ACC", value: false });
      MessageComp(
        `Succsess Change  ${
          !value ? "remove car default" : value?.label
        } But Not Submit `,
        "success"
      );
      dispatch({ type: "SET_LOADING_PAGE", value: true });
      if (!value) {
        setCarDefault({
          plate_car: null,
          model_vehicle: null,
        });

        setCarSelect1({
          value: null,
          label: null,
          model_vehicle: null,
        });

        setTimeout(() => {
          handleRenderAccess(dispatch, userAccess);
        }, 3000);

        return;
      }
      setCarDefault({
        plate_car: value.value,
        model_vehicle: value.model_vehicle,
      });
      setCarSelect1({
        value: carDefault.plate_car,
        label: carDefault.plate_car + " / " + carDefault.model_vehicle,
        model_vehicle: carDefault.model_vehicle,
      });
      setTimeout(() => {
        handleRenderAccess(dispatch, userAccess);
      }, 3000);

      return;
    case "car2":
      dispatch({ type: "SET_USERS_MODAL_ACC", value: false });
      MessageComp(`Succsess Change But Not Submit ${value.label}`, "success");
      dispatch({ type: "SET_LOADING_PAGE", value: true });
      setCarDefault({
        plate_car: value.value,
        model_vehicle: value.model_vehicle,
      });
      setCarSelect2({
        value: carDefault.plate_car,
        label: carDefault.plate_car + " / " + carDefault.model_vehicle,
        model_vehicle: carDefault.model_vehicle,
      });
      setTimeout(() => {
        handleRenderAccess(dispatch, userAccess);
      }, 3000);
      return;
    case "car3":
      dispatch({ type: "SET_USERS_MODAL_ACC", value: false });
      MessageComp(`Succsess Change But Not Submit ${value.label}`, "success");
      dispatch({ type: "SET_LOADING_PAGE", value: true });
      setCarDefault({
        plate_car: value.value,
        model_vehicle: value.model_vehicle,
      });
      setCarSelect3({
        value: carDefault.plate_car,
        label: carDefault.plate_car + " / " + carDefault.model_vehicle,
        model_vehicle: carDefault.model_vehicle,
      });
      setTimeout(() => {
        handleRenderAccess(dispatch, userAccess);
      }, 3000);
      return;
    default:
      return alert("something wrong");
  }
};

// Comp Modal Access
const bodyModalAccess = (
  dispatch,
  userAccess,
  userReducer,
  optionCar,
  carDefault,
  setCarDefault,
  carSelect1,
  setCarSelect1,
  carSelect2,
  setCarSelect2,
  carSelect3,
  setCarSelect3
) => (
  <>
    <h3 style={{ marginLeft: "20px", marginTop: "10px" }}>Access User</h3>
    <div className="tabs">
      <div className="tab-2">
        <label htmlFor="tab2-1">Cars</label>
        <input id="tab2-1" name="tabs-two" type="radio" checked="checked" />
        <div style={{ padding: "30px 40px 0px 40px" }}>
          <Row>
            <Col span={11}>
              <h4>Name</h4>
              <p>
                {userAccess.firstName} <span>{userAccess.lastName}</span>
              </p>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <h4>Area</h4>
              <p>{userAccess.area_name}</p>
            </Col>
          </Row>
          <Gap height={"24px"} />
          <Row>
            <Col span={11}>
              <h4>Departement</h4>
              <p>{userAccess.departement_name}</p>
            </Col>
          </Row>
          <Gap height={"24px"} />
          <h4>Car</h4>

          <Row>
            <Col span={11}>
              <h4>Main Car</h4>
              <Input
                value={`${carDefault?.plate_car} / ${carDefault?.model_vehicle}`}
                disabled
              />
              <Gap height={"15px"} />
              <div className="button-wrapper-access">
                <ButtonComp
                  btnstyle="btn-default"
                  name="Default"
                  style={{ width: "25%" }}
                />
                <Gap width={"10px"} />
              </div>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <h4>Car 1</h4>
              <Select
                options={optionCar}
                isClearable={true}
                defaultValue={carSelect1}
                onChange={(e) => setCarSelect1(e)}
              />
              <Gap height={"15px"} />
              <div className="button-wrapper-access">
                <ButtonComp
                  btnstyle="btn-success"
                  name="Set Default"
                  style={{ width: "30%" }}
                  onClickBtn={() =>
                    handleDefault(
                      carSelect1,
                      "car1",
                      carDefault,
                      setCarDefault,
                      setCarSelect1,
                      setCarSelect2,
                      setCarSelect3,
                      dispatch,
                      userAccess
                    )
                  }
                />
                <Gap width={"10px"} />
              </div>
            </Col>
          </Row>
          <Gap height={"24px"} />
          <Row>
            <Col span={11}>
              <h4>Car 2</h4>
              <Select
                options={optionCar}
                isClearable={true}
                defaultValue={carSelect2}
                onChange={(e) => setCarSelect2(e)}
              />
              <Gap height={"15px"} />
              <div className="button-wrapper-access">
                <ButtonComp
                  btnstyle="btn-success"
                  name="Set Default"
                  style={{ width: "30%" }}
                  onClickBtn={() =>
                    handleDefault(
                      carSelect2,
                      "car2",
                      carDefault,
                      setCarDefault,
                      setCarSelect1,
                      setCarSelect2,
                      setCarSelect3,
                      dispatch,
                      userAccess
                    )
                  }
                />
                <Gap width={"10px"} />
              </div>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <h4>Car 3</h4>
              <Select
                options={optionCar}
                isClearable={true}
                defaultValue={carSelect3}
                onChange={(e) => setCarSelect3(e)}
              />
              <Gap height={"15px"} />
              <div className="button-wrapper-access">
                <ButtonComp
                  btnstyle="btn-success"
                  name="Set Default"
                  style={{ width: "30%" }}
                  onClickBtn={() =>
                    handleDefault(
                      carSelect3,
                      "car3",
                      carDefault,
                      setCarDefault,
                      setCarSelect1,
                      setCarSelect2,
                      setCarSelect3,
                      dispatch,
                      userAccess
                    )
                  }
                />
                <Gap width={"10px"} />
              </div>
            </Col>
          </Row>
          <Gap height={"35px"} />
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <div className="button-wrapper-access-submit">
                <ButtonComp
                  btnstyle="btn-danger"
                  name="Cancel"
                  style={{ width: "30%" }}
                  onClickBtn={() =>
                    dispatch({ type: "SET_USERS_MODAL_ACC", value: false })
                  }
                />
                <Gap width={"30px"} />
                <ButtonComp
                  name="Submit"
                  style={{ width: "30%" }}
                  onClickBtn={() =>
                    dispatch(
                      updateCarUser(
                        userAccess,
                        carDefault,
                        carSelect1,
                        carSelect2,
                        carSelect3
                      )
                    )
                  }
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="tab-2">
        <label htmlFor="tab2-2">Menu</label>
        <input id="tab2-2" name="tabs-two" type="radio" />
        <div style={{ padding: "40px" }}>
          <div className="wrapper-menu-list">
            {userReducer?.isUserMenuSelected.map((item) => (
              <div className="menu-wrap">
                <span
                  className="iconify icon-list"
                  data-icon="akar-icons:circle-check"></span>
                <p className="menu-wrap">{item.menu_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const bodyModalFilter = (
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
) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area">
          <Select
            options={optionArea}
            defaultValue={areaFilter}
            onChange={(e) => setAreaFilter(e)}
            isClearable={true}
          />
        </Form.Item>
        <Form.Item label="Departement">
          <Select
            options={optionDepartementFilter}
            defaultValue={departFilter}
            onChange={(e) => setDepartFilter(e)}
            isClearable={true}
          />
        </Form.Item>
        <Form.Item label="Car">
          <Select
            options={optionCar}
            defaultValue={carFilter}
            onChange={(e) => setCarFilter(e)}
            isClearable={true}
          />
        </Form.Item>
        <Gap height={"80px"} />
        <div className="button-wrapper">
          <ButtonComp
            btnstyle="btn-danger"
            name="Cancel"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch({ type: "SET_USERS_FILTER", value: false })
            }
          />
          <Gap width={"80px"} />
          <ButtonComp
            name="Filter"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch(
                filterUser(areaFilter, departFilter?.value, carFilter?.value)
              )
            }
          />
        </div>
      </Form>
    </div>
  </>
);

export default User;
