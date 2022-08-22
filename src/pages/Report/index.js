import { Breadcrumb, Col, Row, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endPoint } from "../../assets/config";
import { CardHeader, Gap, IconExpand, TableComp } from "../../components";
import { getDataReport, searchReport } from "../../redux/action";
import { callbill, forceDownload } from "../../utils";
import { NavLink } from "react-router-dom";
import "./style.less";

const Report = () => {
  const { globalReducer, reportReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const dataReport = reportReducer.report;

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
          onClickFilter={() => {}}
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
                                  <tr
                                    className={`${
                                      item.tag === "user" ? "new-location" : ""
                                    }`}>
                                    <td>
                                      <p
                                        className={`${
                                          item.tag === "user"
                                            ? "tag-new-loc"
                                            : ""
                                        }`}>
                                        {item.location}
                                      </p>
                                    </td>
                                    <td>{item.category}</td>
                                  </tr>
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
    </>
  );
};

export default Report;
