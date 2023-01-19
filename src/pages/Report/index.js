import { Breadcrumb, Col, Row, Skeleton, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endPoint } from "../../assets/config";
// import Select from "react-select";
import { ActionMeta, OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  ButtonComp,
  CardHeader,
  Gap,
  IconExpand,
  ModalComp,
  TableComp,
} from "../../components";
import {
  createOrUpdateLocation,
  getDataLocationReport,
  getDataReport,
  searchReport,
  updateLocationStatus,
} from "../../redux/action";
import { callbill, forceDownload } from "../../utils";
import { NavLink } from "react-router-dom";
import "./style.less";
import Select from "react-select";
import { bodyModal, bodyModalFilter } from "./modal";

const Report = () => {
  const { globalReducer, reportReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedReport, setSelectedReport] = useState(null);
  const dataReport = reportReducer.report;
  const selectedLocation = reportReducer.selectedLocation;
  const optionLocation = reportReducer.optionLocation;
  const createdLocation = reportReducer.createdLocation;
  const selectedFromOption = reportReducer.selectedFromOption;
  const areaOption = reportReducer.reportAreaOption;
  const areaSelected = reportReducer.reportAreaOptSelected;
  const departementOption = reportReducer.reportDepartementOption;
  const departementSelected = reportReducer.reportDepartementOptSelected;
  const carOption = reportReducer.reportCarsOption;
  const carSelected = reportReducer.reportCarOptSelected;
  const dateFrom = reportReducer.selectedDateFrom;
  const dateTo = reportReducer.selectedDateTo;

  const columns = [
    {
      title: "Date",
      render: (_, record) =>
        dataReport.length > 0 ? (
          <>
            {record.newLocation ? (
              <p style={{ color: "red" }}>{callbill(record.createdAt)}</p>
            ) : (
              <p>{callbill(record.createdAt)}</p>
            )}
          </>
        ) : null,
    },
    {
      title: "Car",
      dataIndex: "car_name",
    },
    {
      title: "Plate No",
      dataIndex: "plate_car",
    },
    {
      title: "Name",
      dataIndex: "user_name",
    },
    {
      title: "Departement",
      dataIndex: "departement",
    },
    {
      title: "Area",
      dataIndex: "area",
    },
    {
      title: "Kilometer 1",
      dataIndex: "km_awal",
    },
    {
      title: "Kilometer 2",
      dataIndex: "km_akhir",
    },
    {
      title: "Image 1",
      render: (_, record) =>
        dataReport.length > 0 ? (
          <div className="access-label">
            <div
              onClick={() =>
                forceDownload(
                  `${endPoint[0].url}${
                    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
                  }/${record.picture_1}`,
                  `${record.picture_1}`
                )
              }>
              IMG 1
            </div>
          </div>
        ) : null,
    },
    {
      title: "Image 2",
      render: (_, record) =>
        dataReport.length > 0 ? (
          <div className="access-label">
            <div
              onClick={() =>
                forceDownload(
                  `${endPoint[0].url}${
                    endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
                  }/${record.picture_2}`,
                  `${record.picture_2}`
                )
              }>
              IMG 2
            </div>
          </div>
        ) : null,
    },
  ];

  let links = [
    {
      url: "/report",
      text: "Report",
    },
    {
      url: "/driveroff",
      text: "Driver Off",
    },
  ];

  useEffect(() => {
    dispatch(getDataReport());
    dispatch(getDataLocationReport());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Report</Breadcrumb.Item>
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
            <h1>Report</h1>
          </Col>
        </Row>
        <Gap height={"30px"} />
        {/* Card Header */}
        <CardHeader
          btnFilter={true}
          onClickFilter={() => {
            dispatch({ type: "SET_REPORT_FILTER", value: true });
          }}
          onSearch={(e) => dispatch(searchReport(e.target.value, dataReport))}
        />
        <Gap height={"15px"} />
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
                data={dataReport}
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      <div className="table-wrap">
                        <table className="table-custom">
                          <thead>
                            <tr>
                              <th>Location</th>
                              <th>Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.location != null ? (
                              JSON.parse(record.location).map((item) => (
                                <>
                                  {item.newLoc === true ? (
                                    <tr
                                      key={item.key}
                                      className={`new-location`}>
                                      <td>
                                        <p
                                          className={`tag-new-loc`}
                                          onClick={() => {
                                            setSelectedReport(record?.key);
                                            dispatch({
                                              type: "SET_REPORT_LOCATION",
                                              value: true,
                                            });

                                            dispatch({
                                              type: "SET_REPORT_LOCATION_SELECT",
                                              value: item,
                                            });
                                          }}>
                                          {item.location}
                                        </p>
                                      </td>
                                      <td>{item.category}</td>
                                    </tr>
                                  ) : (
                                    <tr key={item.key}>
                                      <td>
                                        <p>{item.location}</p>
                                      </td>
                                      <td>{item.category}</td>
                                    </tr>
                                  )}
                                </>
                              ))
                            ) : (
                              <>
                                <tr>
                                  <td colSpan={2}>no data</td>
                                </tr>
                              </>
                            )}
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
        title="Add to Master Location"
        show={reportReducer.reportLocation}
        onClose={() => dispatch({ type: "SET_REPORT_LOCATION", value: false })}
        content={bodyModal(
          dispatch,
          createdLocation,
          optionLocation,
          selectedLocation,
          selectedFromOption,
          selectedReport
        )}
        widthModal="35%"
      />

      <ModalComp
        title="Filter Report"
        show={reportReducer.reportFilter}
        onClose={() => dispatch({ type: "SET_REPORT_FILTER", value: false })}
        content={bodyModalFilter(
          dispatch,
          areaOption,
          departementOption,
          carOption,
          areaSelected,
          departementSelected,
          carSelected,
          dateFrom,
          dateTo
        )}
        widthModal="30%"
      />
    </>
  );
};

// // Comp Modal Edit Location
// const bodyModal = (
//   dispatch,
//   createdLocation,
//   optionLocation,
//   selectedLocation,
//   selectedFromOption,
//   selectedReport
// ) => (
//   <>
//     <div className="content-wrapper">
//       <Form layout="vertical">
//         <Form.Item label="Location">
//           <Input
//             placeholder="Location"
//             defaultValue={`${selectedLocation?.category}`}
//             disabled
//           />
//         </Form.Item>
//         <Form.Item label="Name 1">
//           <Input
//             placeholder="Name 1"
//             defaultValue={`${selectedLocation?.location}`}
//             disabled
//             style={{ backgroundColor: "white", color: "#434343" }}
//           />
//         </Form.Item>
//         <Form.Item label="Name 2">
//           <CreatableSelect
//             options={optionLocation}
//             onChange={(e) => {
//               // Check if new location
//               if (e?.__isNew__) {
//                 console.log(e, "createad");
//                 dispatch({ type: "SET_SELECTED_OPT_LOCATION", value: e });
//                 return;
//               }
//               // Check if selected location
//               console.log(e, "selected");
//               dispatch({ type: "SET_SELECTED_OPT_LOCATION", value: e });
//             }}
//             isClearable
//             onInputChange={(e) => {
//               dispatch({ type: "SET_REPORT_LOCATION_CREATE", value: e });
//             }}
//           />
//         </Form.Item>
//         <Gap height={"80px"} />
//         <div className="button-wrapper">
//           <ButtonComp
//             btnstyle="btn-danger"
//             name="Cancel"
//             style={{ width: "30%" }}
//             onClickBtn={() =>
//               dispatch({ type: "SET_REPORT_LOCATION", value: false })
//             }
//           />

//           <Gap width={"80px"} />
//           <ButtonComp
//             name="Submit"
//             style={{ width: "30%" }}
//             onClickBtn={() => {
//               dispatch(
//                 createOrUpdateLocation(
//                   selectedFromOption,
//                   selectedReport,
//                   selectedLocation
//                 )
//               );
//             }}
//           />
//         </div>
//       </Form>
//     </div>
//   </>
// );

export default Report;
