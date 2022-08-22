import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Pagination } from "antd";
import qs from "qs";
import axios from "axios";
import "./style.less";
import { useDispatch, useSelector } from "react-redux";

const TableComp = ({ columns, data, ...restProps }) => {
  const { globalReducer } = useSelector((state) => state);

  // const columns = [
  //   {
  //     title: "Area",
  //     dataIndex: "name",
  //   },
  //   {
  //     title: "Location",
  //     dataIndex: "location",
  //   },
  // ];

  // const [data, setData] = useState([]);

  // const fetchData = async (current, pageSize) => {
  //   setLoading(true);
  //   await axios
  //     .get(`https://mocki.io/v1/4db8cdc3-06bb-47f2-81ab-3bd60dd55bdf`)
  //     .then((response) => {
  //       let areas = response.data;

  //       // areas = areas.slice(
  //       //   page * rowsPerPage,
  //       //   page * rowsPerPage + rowsPerPage
  //       // );

  //       setData(areas);
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 3000);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["none", "bottomLeft"],
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
        }}
        loading={globalReducer.isLoading}
        {...restProps}
      />
    </>
  );
};

export default TableComp;
