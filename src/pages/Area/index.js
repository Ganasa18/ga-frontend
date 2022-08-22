import { Breadcrumb, Col, Form, Input, Popconfirm, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonComp,
  CardHeader,
  Gap,
  ModalComp,
  TableComp,
} from "../../components";
import {
  createArea,
  editArea,
  getDataArea,
  searchArea,
} from "../../redux/action/area";
import "./style.less";

const Area = () => {
  const { globalReducer, areaReducer } = useSelector((state) => state);
  const [area, setArea] = useState([]);
  const valueArea = areaReducer.areaCreate;
  const dispatch = useDispatch();

  // Edit Modal
  const handleEdit = (key) => {
    const newData = areaReducer.area.filter((item) => item.id === key);
    setArea(newData);
    dispatch({ type: "SET_AREA_ADD", value: newData[0].area_name });
    dispatch({ type: "SET_MODAL_EDIT", value: true });
  };

  // Column Header Table
  const columns = [
    {
      title: "Area",
      dataIndex: "area_name",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) =>
        areaReducer.area.length >= 1 ? (
          <Popconfirm
            title="Sure to edit?"
            onConfirm={() => handleEdit(record.id)}>
            <a>Edit</a>
          </Popconfirm>
        ) : null,
    },
  ];

  useEffect(() => {
    dispatch(getDataArea());
  }, []);

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Area</Breadcrumb.Item>
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
            <h1>Master Area</h1>
          </Col>
        </Row>
        <Gap height={"30px"} />
        {/* Card Header */}
        <CardHeader
          icon={"fluent:add-12-regular"}
          nameBtn={"Create New"}
          onClickBtn={() => dispatch({ type: "SET_MODAL", value: true })}
          onSearch={(e) =>
            dispatch(searchArea(e.target.value, areaReducer.area))
          }
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
              <TableComp data={areaReducer.area} columns={columns} />
            )}
          </Col>
        </Row>
      </div>
      <ModalComp
        title="Create Master Area"
        show={globalReducer.isModal}
        onClose={() => dispatch({ type: "SET_MODAL", value: false })}
        content={bodyModal(dispatch, valueArea, globalReducer)}
        widthModal="40%"
      />
      <ModalComp
        title="Edit Master Area"
        show={globalReducer.isModalEdit}
        onClose={() => dispatch({ type: "SET_MODAL_EDIT", value: false })}
        content={bodyModalEdit(dispatch, area, valueArea, globalReducer)}
        widthModal="40%"
      />
    </>
  );
};

// Comp Modal Create
const bodyModal = (dispatch, valueArea, globalReducer) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area" required>
          <Input
            style={{
              ...(globalReducer.isError?.area_name && {
                border: "1px solid red",
              }),
            }}
            placeholder="Area Name"
            onChange={(e) =>
              dispatch({ type: "SET_AREA_ADD", value: e.target.value })
            }
          />
          {/* Validation */}
          {globalReducer.isError && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.area_name}
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
            onClickBtn={() => dispatch(createArea(valueArea))}
          />
        </div>
      </Form>
    </div>
  </>
);

// Comp Modal Edit
const bodyModalEdit = (dispatch, area, valueArea, globalReducer) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area" required>
          <Input
            style={{
              ...(globalReducer.isError && { border: "1px solid red" }),
            }}
            placeholder="Area Name"
            value={valueArea}
            onChange={(e) =>
              dispatch({ type: "SET_AREA_ADD", value: e.target.value })
            }
          />
          {globalReducer.isError && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.area_name}
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
            onClickBtn={() =>
              dispatch({ type: "SET_MODAL_EDIT", value: false })
            }
          />
          <Gap width={"80px"} />
          <ButtonComp
            name="Edit"
            style={{ width: "30%" }}
            onClickBtn={() => dispatch(editArea(valueArea, area[0].id))}
          />
        </div>
      </Form>
    </div>
  </>
);

export default Area;
