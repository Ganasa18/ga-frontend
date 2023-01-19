import { Breadcrumb, Col, Form, Input, Popconfirm, Row, Skeleton } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileOutlined } from "@ant-design/icons";
import {
  ButtonComp,
  CardHeader,
  Gap,
  ModalComp,
  TableComp,
} from "../../components";
import {
  filterCar,
  filterNewCar,
  getDataCars,
  importDataCars,
  searchCar,
  updateActiveCar,
} from "../../redux/action/";
import "./style.less";
import Select from "react-select";
import filterByValue from "../../utils/useFilter";

const handleFile = () => {
  const labelFile = document.getElementById("labelFile");
  labelFile.click();
};

const handleChangeFile = (e, dispatch) => {
  if (e.target.files.length !== 0) {
    dispatch({ type: "SET_CARS_IMPORT", value: e.target.files[0] });
  }
};

const calbill = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var myDate = new Date(date);
  var d = myDate.getDate();
  var m = myDate.getMonth();
  m += 1;
  var y = myDate.getFullYear();

  var newdate = d + " " + monthNames[myDate.getMonth()] + " " + y;
  return newdate;
};

// Comp Modal Import
const bodyModal = (dispatch, globalReducer, files) => (
  <>
    <div className="content-wrapper-import" onClick={handleFile}>
      <div className={`field-container-import ${files ? "succes" : ""}`}>
        {files === null ? (
          <ProfileOutlined style={{ fontSize: "80px", color: "#c2c2c2" }} />
        ) : (
          <ProfileOutlined style={{ fontSize: "80px", color: "#48BF54" }} />
        )}
      </div>
      <Gap height={"20px"} />
      <div className="field-file-input">
        {files === null ? (
          <>
            <label htmlFor="filesImp" id="labelFile">
              Click Icon to open file
            </label>
            <input
              accept=".xlsx"
              type="file"
              className="file-req"
              id="filesImp"
              onChange={(e) => handleChangeFile(e, dispatch)}
            />
          </>
        ) : (
          <>
            <p>
              File <span>{files.name}</span>
            </p>
            <a
              class="close-btn"
              role="button"
              onClick={() =>
                dispatch({ type: "SET_CARS_IMPORT", value: null })
              }>
              &times;
            </a>
          </>
        )}
      </div>
      {files && (
        <>
          <Gap height={"50px"} />
          <div className="button-wrapper">
            <ButtonComp
              name="Import"
              style={{ width: "30%" }}
              onClick={() => dispatch(importDataCars(files))}
            />
          </div>
        </>
      )}
    </div>
  </>
);

// Comp Modal Active
const bodyModalActive = (dispatch, car) => (
  <>
    <div className="content-wrapper">
      <div className="content-body">
        <p>
          Are you sure want to change this InUse{" "}
          <span style={{ fontWeight: "bold" }}>{car?.license_plate}</span> ?
        </p>
      </div>
    </div>
    <Gap height={"50px"} />
    <div className="button-wrapper">
      <ButtonComp
        btnstyle="btn-danger"
        name="Cancel"
        style={{ width: "25%" }}
        onClickBtn={() => dispatch({ type: "SET_CARS_ACTIVE", value: false })}
      />
      <Gap width={"80px"} />
      <ButtonComp
        name="Edit"
        style={{ width: "25%" }}
        onClickBtn={() => dispatch(updateActiveCar(car?.id, car?.offline_car))}
      />
    </div>
  </>
);

// Comp Modal Detail
const bodyModalDetail = (dispatch, car) => (
  <>
    <Gap height={"30px"} />
    <div className="content-wrapper-detail-car">
      <Row>
        <Col span={8}>
          <div className="container-label">
            <p className="label-car">Plat No</p>
            <p className="value-car">{car?.license_plate}</p>
          </div>
        </Col>
        <Col span={8}>
          <div className="container-label">
            <p className="label-car">Brand</p>
            <p className="value-car">{car?.merk_vehicle}</p>
          </div>
        </Col>
        <Col span={8}>
          <div className="container-label">
            <p className="label-car">Type</p>
            <p className="value-car">{car?.model_vehicle}</p>
          </div>
        </Col>
        <Gap height="80px" />
        <Col span={8}>
          <div className="container-label">
            <p className="label-car">Chasis Number</p>
            <p className="value-car">{car?.chassis_number}</p>
          </div>
        </Col>
        <Col span={8}>
          <div className="container-label">
            <p className="label-car">Number Machine</p>
            <p className="value-car">{car?.number_machine}</p>
          </div>
        </Col>
        <Col span={8}>
          <div className="container-label">
            <p className="label-car">Immatriculation Date</p>
            <p className="value-car">{calbill(car?.immatriculation_date)}</p>
          </div>
        </Col>
      </Row>
    </div>
  </>
);

// Comp Modal Filter
const bodyModalFilter = (
  dispatch,
  optionLocation,
  optionCar,
  optionOwnership,
  optionPool,
  areaSelect,
  setAreaSelect,
  carSelect,
  setCarSelect,
  ownershipSelect,
  setOwnershipSelect,
  poolSelect,
  setPoolSelect
) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area">
          <Select
            options={optionLocation}
            defaultValue={areaSelect}
            isClearable={true}
            onChange={(e) => setAreaSelect(e)}
          />
        </Form.Item>
        <Form.Item label="Car">
          <Select
            options={optionCar}
            defaultValue={carSelect}
            isClearable={true}
            onChange={(e) => setCarSelect(e)}
          />
        </Form.Item>
        <Form.Item label="Ownership">
          <Select
            options={optionOwnership}
            defaultValue={ownershipSelect}
            isClearable={true}
            isSearchable={false}
            onChange={(e) => setOwnershipSelect(e)}
          />
        </Form.Item>
        <Form.Item label="Pool/Take Home">
          <Select
            options={optionPool}
            defaultValue={poolSelect}
            isClearable={true}
            isSearchable={false}
            onChange={(e) => setPoolSelect(e)}
          />
        </Form.Item>
        <Gap height={"30px"} />
        <div className="button-wrapper">
          <ButtonComp
            btnstyle="btn-danger"
            name="Cancel"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch({ type: "SET_CARS_FILTER", value: false })
            }
          />
          <Gap width={"80px"} />
          <ButtonComp
            name="Filter"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch(
                filterCar(
                  areaSelect?.label,
                  carSelect?.value,
                  ownershipSelect?.value,
                  poolSelect?.value
                )
              )
            }
          />
        </div>
      </Form>
    </div>
  </>
);

export { bodyModalActive, bodyModal, bodyModalDetail, bodyModalFilter };
