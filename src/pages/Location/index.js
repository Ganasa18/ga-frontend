import { Breadcrumb, Col, Form, Input, Popconfirm, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonComp,
  CardHeader,
  Gap,
  ModalComp,
  SelectSearchComp,
  TableComp,
} from "../../components";
import { createNewlocation, getDataLocation } from "../../redux/action";
import "./style.less";

const Location = () => {
  const { globalReducer, locationReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const locationData = locationReducer.location;
  const locationName = locationReducer.locationName;
  const valueSelected = globalReducer.selectedValue;

  const locationType = [
    {
      value: "Konsumen",
      label: "Konsumen",
    },
    {
      value: "Tempat Berhenti",
      label: "Tempat Berhenti",
    },
    {
      value: "Kantor",
      label: "Kantor",
    },
    {
      value: "Rumah",
      label: "Rumah",
    },
  ];

  // Column Header Table
  const columns = [
    {
      title: "Name",
      dataIndex: "location_name",
    },
    {
      title: "Location",
      dataIndex: "type_location",
      width: "35%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) =>
        locationData.length >= 1 ? (
          <Popconfirm title="Sure to edit?" onConfirm={() => {}}>
            <a>Edit</a>
          </Popconfirm>
        ) : null,
    },
  ];

  useEffect(() => {
    dispatch(getDataLocation());
  }, []);

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Location</Breadcrumb.Item>
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
            <h1>Master Location</h1>
          </Col>
        </Row>
        <Gap height={"30px"} />
        {/* Card Header */}
        <CardHeader
          btnFilter={true}
          icon={"fluent:add-12-regular"}
          nameBtn={"Create New"}
          onClickBtn={() => dispatch({ type: "SET_MODAL", value: true })}
        />
        <Gap height={"40px"} />
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
              <TableComp data={locationData} columns={columns} />
            )}
          </Col>
        </Row>
      </div>

      <ModalComp
        title="Create Location"
        show={globalReducer.isModal}
        onClose={() => dispatch({ type: "SET_MODAL", value: false })}
        content={bodyModal(
          dispatch,
          locationType,
          globalReducer,
          valueSelected,
          locationName
        )}
        widthModal="35%"
      />
    </>
  );
};

// Comp Modal Create
const bodyModal = (
  dispatch,
  locationType,
  globalReducer,
  valueSelected,
  locationName
) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Location" required>
          <SelectSearchComp option={locationType} isSearchable={false} />
          {/* Validation */}
          {globalReducer.isError && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.type_loc}
              </p>
            </>
          )}
        </Form.Item>
        <Gap height={"8px"} />
        <Form.Item label="Name" required>
          <Input
            value={locationName}
            style={{
              ...(globalReducer.isError?.location_name && {
                border: "1px solid red",
              }),
            }}
            onChange={(e) =>
              dispatch({ type: "SET_LOCATION_NAME", value: e.target.value })
            }
            placeholder="Location Name"
          />
          {/* Validation */}
          {globalReducer.isError && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.location_name}
              </p>
            </>
          )}
        </Form.Item>
        <Gap height={"80px"} />
        <div className="button-wrapper">
          <ButtonComp
            btnstyle="btn-danger"
            name="Cancel"
            style={{ width: "30%" }}
            onClickBtn={() => dispatch({ type: "SET_MODAL", value: false })}
          />
          <Gap width={"80px"} />
          <ButtonComp
            name="Submit"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch(createNewlocation(locationName, valueSelected))
            }
          />
        </div>
      </Form>
    </div>
  </>
);

export default Location;
