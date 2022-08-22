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
  getDataCars,
  importDataCars,
  searchCar,
  updateActiveCar,
} from "../../redux/action/";
import "./style.less";
import Select from "react-select";

const Cars = () => {
  const { globalReducer, carsReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [areaSelect, setAreaSelect] = useState(null);
  const [carSelect, setCarSelect] = useState(null);
  const [ownershipSelect, setOwnershipSelect] = useState(null);
  const [poolSelect, setPoolSelect] = useState(null);
  const files = carsReducer.carsImport;
  const car = carsReducer.carSelected;
  const optionLocation = carsReducer.isLocationOdoo;
  const filterSelect = globalReducer.isTagFilter;
  let optionCar = carsReducer.cars.map((item) => ({
    value: item.model_vehicle,
    label: item.model_vehicle,
  }));

  optionCar = optionCar.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.value === value.value)
  );

  const optionOwnership = [
    {
      value: "Pribadi",
      label: "Pribadi",
    },
    {
      value: "Kendaraan Operasional",
      label: "Kendaraan Operasional",
    },
  ];
  const optionPool = [
    {
      value: "Pool",
      label: "Pool",
    },
    {
      value: "Take Home",
      label: "Take Home",
    },
  ];

  // Column Header Table
  const columns = [
    {
      title: "Plat Number",
      key: "plat number",
      render: (_, record) =>
        carsReducer.cars.length >= 1 ? (
          <>
            <div className="plate-number" onClick={() => detailCar(record)}>
              <p>{record.license_plate}</p>
            </div>
          </>
        ) : null,
    },
    {
      title: "Brand",
      dataIndex: "merk_vehicle",
    },
    {
      title: "Type",
      dataIndex: "model_vehicle",
    },
    {
      title: "Area",
      dataIndex: "location_odoo",
    },
    {
      title: "Ownership",
      dataIndex: "ownership",
    },
    {
      title: "Pool/Home",
      dataIndex: "pull_or_takehome",
    },
    {
      title: "Active",
      key: "active",
      render: (_, record) =>
        carsReducer.cars.length >= 1 ? (
          <>
            <div
              onClick={() => changeActiveCar(record)}
              className={`badge-cars ${
                record.offline_car !== false ? "inactive" : ""
              }`}>
              {record.offline_car === false ? "Active" : "Inactive"}
            </div>
          </>
        ) : null,
    },
    // {
    //   title: "Used",
    //   key: "used",
    //   render: (_, record) =>
    //     carsReducer.cars.length >= 1 ? (
    //       <>
    //         <div
    //           className={`${
    //             record.driver_id ? "badge-cars-used" : "badge-cars-unsed"
    //           }`}>
    //           {record.driver_id ? "Used" : "Unused"}
    //         </div>
    //       </>
    //     ) : null,
    // },
  ];

  const changeActiveCar = (record) => {
    dispatch({ type: "SET_CARS_SELECTED", value: record });
    dispatch({ type: "SET_CARS_ACTIVE", value: true });
  };
  const detailCar = (record) => {
    dispatch({ type: "SET_CARS_SELECTED", value: record });
    dispatch({ type: "SET_CARS_DETAIL", value: true });
  };

  useEffect(() => {
    dispatch(getDataCars());
  }, []);

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Cars</Breadcrumb.Item>
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
            <h1>Master Car</h1>
          </Col>
        </Row>
        <Gap height={"30px"} />
        {/* Card Header */}
        <CardHeader
          btnFilter={true}
          onClickFilter={() =>
            dispatch({ type: "SET_CARS_FILTER", value: true })
          }
          onClickBtn={() => dispatch({ type: "SET_MODAL", value: true })}
          nameBtn={"Import"}
          onSearch={(e) =>
            dispatch(searchCar(e.target.value, carsReducer.cars))
          }
        />
        <Gap height={"15px"} />
        {filterSelect?.cars && (
          <p>{`Filter for “${filterSelect?.cars.join(", ")}”`}</p>
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
              <TableComp data={carsReducer.cars} columns={columns} />
            )}
          </Col>
        </Row>
      </div>
      <ModalComp
        title="Import Cars"
        show={globalReducer.isModal}
        onClose={() => dispatch({ type: "SET_MODAL", value: false })}
        content={bodyModal(dispatch, globalReducer, files)}
        widthModal="40%"
      />
      <ModalComp
        title="Change InUse"
        show={carsReducer.isModalCarActive}
        onClose={() => dispatch({ type: "SET_CARS_ACTIVE", value: false })}
        content={bodyModalActive(dispatch, car)}
        widthModal="40%"
      />
      <ModalComp
        title="Info Car"
        show={carsReducer.isModalCarDetail}
        onClose={() => dispatch({ type: "SET_CARS_DETAIL", value: false })}
        content={bodyModalDetail(dispatch, car)}
        widthModal="40%"
      />

      <ModalComp
        title="Filter Departement"
        show={carsReducer.isModalCarFilter}
        onClose={() =>
          dispatch({ type: "SET_DEPARTEMENT_FILTER", value: false })
        }
        content={bodyModalFilter(
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
        )}
        widthModal="30%"
      />
    </>
  );
};

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
export default Cars;
