import { Breadcrumb, Col, Row, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, Gap, ModalComp, TableComp } from "../../components";
import { getDataLocation, searchLocation } from "../../redux/action";
import { bodyModal, bodyModalFilter } from "./modal";
import "./style.less";

const Location = () => {
  const { globalReducer, locationReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const locationData = locationReducer.location;
  const locationName = locationReducer.locationName;
  const valueSelected = globalReducer.selectedValue;
  const filterSelect = globalReducer.isTagFilter;

  const locationType = [
    {
      value: "konsumen",
      label: "Konsumen",
    },
    {
      value: "tempat berhenti",
      label: "Tempat Berhenti",
    },
    {
      value: "kantor",
      label: "Kantor",
    },
    {
      value: "rumah",
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
      title: "Name 2",
      dataIndex: "location_name_rev",
      width: "35%",
    },
    {
      title: "Location",
      dataIndex: "type_location",
      width: "35%",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   width: "20%",
    //   render: (_, record) =>
    //     locationData.length >= 1 ? (
    //       <Popconfirm title="Sure to edit?" onConfirm={() => {}}>
    //         <a>Edit</a>
    //       </Popconfirm>
    //     ) : null,
    // },
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
          onClickFilter={() =>
            dispatch({ type: "SET_FILTER_LOCATION", value: true })
          }
          icon={"fluent:add-12-regular"}
          nameBtn={"Create New"}
          onClickBtn={() => dispatch({ type: "SET_MODAL", value: true })}
          onSearch={(e) =>
            dispatch(searchLocation(e.target.value, locationData))
          }
        />
        <Gap height={"15px"} />
        {filterSelect?.location && (
          <p>{`Filter for “${filterSelect?.location}”`}</p>
        )}
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

      <ModalComp
        title="Filter Location"
        show={locationReducer.isFilterLocation}
        onClose={() => dispatch({ type: "SET_FILTER_LOCATION", value: false })}
        content={bodyModalFilter(dispatch, locationType, valueSelected)}
        widthModal="25%"
      />
    </>
  );
};

export default Location;
