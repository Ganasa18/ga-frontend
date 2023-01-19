import React from "react";
import { Table } from "antd";

import "./style.less";
import { useSelector } from "react-redux";

const TableComp = ({ columns, data, ...restProps }) => {
  const { globalReducer } = useSelector((state) => state);

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
