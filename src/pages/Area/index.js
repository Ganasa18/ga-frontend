import { Breadcrumb, Col, Popconfirm, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, Gap, ModalComp, TableComp } from "../../components";
import { getDataArea, searchArea } from "../../redux/action/area";
import { bodyModal, bodyModalEdit } from "./modal";
import "./style.less";

const Area = () => {
  const { globalReducer, areaReducer } = useSelector((state) => state);
  const [area, setArea] = useState([]);
  const valueArea = areaReducer.areaCreate;
  const dispatch = useDispatch();

  // Edit Modal
  const handleEdit = (key) => {
    const newData = areaReducer.area.filter((item) => item.key === key);
    setArea(newData);
    dispatch({ type: "SET_AREA_SELECTED", value: newData[0].area_name });
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
            onConfirm={() => handleEdit(record.key)}>
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
                {columns.map(() => (
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

export default Area;
