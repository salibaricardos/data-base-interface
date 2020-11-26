import React from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import "./table.css";
const TableComponent = (props: TableProps<any>) => (
  <Table<any> pagination={false} {...props}></Table>
);

export { TableComponent };
