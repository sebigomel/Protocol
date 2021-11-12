import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Devices() {
  const { workspaceId } = useParams();
  useEffect(() => {
    const headers = new Headers();
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    const userOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(
      `http://localhost:5000/api/workspace/joinWorkspace/${workspaceId}`,
      userOptions
    ).then((res) => {
      if (!res.ok) return;
      else return (window.location.pathname = "/home");
    });
  }, []);

  return null;
}
