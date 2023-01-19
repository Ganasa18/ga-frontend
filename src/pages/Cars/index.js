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
import {
  bodyModal,
  bodyModalActive,
  bodyModalDetail,
  bodyModalFilter,
} from "./modal";
import { callbill, checkSearch } from "../../utils";

const Cars = () => {
  const { globalReducer, carsReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [stateCar, setStateCar] = useState(carsReducer.cars);
  const [areaSelect, setAreaSelect] = useState(null);
  const [carSelect, setCarSelect] = useState(null);
  const [ownershipSelect, setOwnershipSelect] = useState(null);
  const [poolSelect, setPoolSelect] = useState(null);
  const files = carsReducer.carsImport;
  const car = carsReducer.carSelected;
  const search = carsReducer.carsSearch;
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
          onSearch={(e) => {
            dispatch(filterNewCar(e.target.value));
          }}
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
              <TableComp
                data={checkSearch(search, carsReducer.cars)}
                columns={columns}
              />
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

export default Cars;
