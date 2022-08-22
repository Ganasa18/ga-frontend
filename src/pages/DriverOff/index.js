import { Breadcrumb, Col, Row, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CardHeader, Gap, TableComp } from "../../components";
import { getDataReport } from "../../redux/action";
import { callbill } from "../../utils";

const DriverOff = () => {
  const { globalReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const dataReport = [];

  const columns = [
    {
      title: "Date",
      render: (_, record) =>
        dataReport.length > 0 ? (
          <>
            <p>{callbill(record.createdAt)}</p>
          </>
        ) : null,
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
      title: "Assent By",
      dataIndex: "assent",
    },
    {
      title: "Remark",
      dataIndex: "remark",
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
            <h1>Driver Off</h1>
          </Col>
        </Row>
        <Gap height={"30px"} />
        {/* Card Header */}
        <CardHeader
          btnFilter={true}
          onClickFilter={() => {}}
          onSearch={(e) => {}}
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
              <TableComp data={[]} columns={columns} />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DriverOff;
