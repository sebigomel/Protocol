import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import { Chip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { format } from "date-fns";

export default function Registers(props) {
  const records = props.records;
  let rows = [];

  records.forEach((record) => {
    const date = format(new Date(record.time), "Pp");
    let row = {
      id: record._id,
      profilePic: record.user.profileImageUrl,
      fullName: record.user.firstName + " " + record.user.lastName,
      name: record.device.name,
      time: date,
      status: record.accepted ? "Accepted" : "Rejected",
    };
    rows.push(row);
  });

  const columns = [
    {
      field: "time",
      headerName: "Hora",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "profilePic",
      headerName: "Foto",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <Avatar
            src={`https://res.cloudinary.com/protocolzz/image/upload/${cellValues.value}`}
          />
        );
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Nombre",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Puerta",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Estado",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return cellValues.value === "Rejected" ? (
          <Chip
            color="error"
            label="No autorizado"
            variant="outlined"
            icon={<ErrorIcon />}
          ></Chip>
        ) : (
          <Chip
            color="success"
            label="Autorizado"
            variant="outlined"
            icon={<CheckIcon />}
          ></Chip>
        );
      },
    },
  ];

  return (
    <DataGrid
      loading={props.loading}
      density="comfortable"
      disableColumnMenu
      disableSelectionOnClick
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        `super-app-theme--${params.getValue(params.id, "status")}`
      }
    />
  );
}
