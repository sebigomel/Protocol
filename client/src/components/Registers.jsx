import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import CheckIcon from "@mui/icons-material/Check";
import { Chip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function Registers(props) {
  const records = props.records;
  let rows = [];
  const cld = new Cloudinary({
    cloud: {
      cloudName: "protocolzz",
    },
  });

  records.forEach((record) => {
    const myImage = cld
      .image(
        `https://res.cloudinary.com/protocolzz/image/upload/w_50,h_50,c_fill,r_max/${
          record.user.profileImageUrl || "default_profile"
        }.png`
      )
      .setDeliveryType("fetch");

    let row = {
      id: record._id,
      profilePic: myImage,
      fullName: record.user.firstName + " " + record.user.lastName,
      name: record.device.name,
      time: record.time,
      status: record.accepted ? "Accepted" : "Rejected",
    };
    rows.push(row);
  });

  const columns = [
    {
      field: "time",
      headerName: "Hora",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "profilePic",
      headerName: "Foto",
      width: 150,
      renderCell: (cellValues) => {
        return <AdvancedImage cldImg={cellValues.value} />;
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Nombre",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Puerta",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Estado",
      width: 170,
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
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        `super-app-theme--${params.getValue(params.id, "status")}`
      }
    />
  );
}
