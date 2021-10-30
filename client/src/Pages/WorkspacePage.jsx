import React, { useEffect, useState } from "react";
import MenuAppBar from "../components/Navbar";

export default function WorkspacePage() {
  const [userData, setUserData] = useState({});
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

    fetch("http://localhost:5000/api/user", userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          console.log(json);
          setUserData(json);
        }
      });
  }, []);

  return (
    <div overflow="auto">
      <MenuAppBar
        workspace="true"
        auth={localStorage.getItem("token") ? "true" : "false"}
        fullName={userData.firstName + " " + userData.lastName}
        profileImage={userData.profileImageUrl}
      />
    </div>
  );
}
