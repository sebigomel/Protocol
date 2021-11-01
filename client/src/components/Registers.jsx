import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Registers(props) {
  const rows = props.rows;
  const columns = [
    { field: "pic", headerName: "Pic", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
  ];

  return <DataGrid rows={rows} columns={columns} />;
}
