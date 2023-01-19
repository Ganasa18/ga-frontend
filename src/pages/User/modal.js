import { Col, Form, Input, Row } from "antd";
import React from "react";
import { ButtonComp, Gap } from "../../components";
import Select from "react-select";
import { filterUser, updateCarUser } from "../../redux/action";
import {
  handleAreaUserPage,
  handleCarSelectUserPage,
  handleCheckedMenuUserPage,
  handleDefaultUserPage,
  handleMenuEditUserPage,
} from "../../service";
import { splitTextOdoo } from "../../utils";
import "./style.less";
const { TextArea } = Input;

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
                  handleAreaUserPage(e, dispatch, departement, setAreaSelect)
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
                onChange={(e) => handleCarSelectUserPage(e, setCarSelect)}
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
                    {splitTextOdoo(item.menu_name)}
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
          handleCheckedMenuUserPage(
            dispatch,
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
                  handleAreaUserPage(e, dispatch, departement, setAreaSelect)
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
                onChange={(e) => handleCarSelectUserPage(e, setCarSelect)}
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
                  <label htmlFor={`option${item.id}`}>
                    {splitTextOdoo(item.menu_name)}
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
          handleMenuEditUserPage(
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
                    handleDefaultUserPage(
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
                    handleDefaultUserPage(
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
                    handleDefaultUserPage(
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

export { bodyModal, bodyModalEdit, bodyModalAccess, bodyModalFilter };
