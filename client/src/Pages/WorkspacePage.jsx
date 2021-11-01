import React, { useEffect, useState } from "react";
import MenuAppBar from "../components/Navbar";
import { useParams } from "react-router-dom";
import WorkspaceTabs from "../components/WorkspaceTabs";
import Registers from "../components/Registers";
import Devices from "../components/Devices";
import Roles from "../components/Roles";

const useEventSource = (url) => {
  const [data, updateData] = useState([]);

  useEffect(() => {
    const source = new EventSource(url);

    source.onmessage = function logEvents(event) {
      updateData(JSON.parse(event.data));
    };
  }, []);

  return data;
};

export default function WorkspacePage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [devices, setDevices] = useState([]);
  const [roles, setRoles] = useState([]);
  const data = useEventSource("http://localhost:5000/api/records");

  useEffect(() => {
    console.log(data);
  }, [data]);

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
          setUserData(json);
        }
      });

    fetch(`http://localhost:5000/api/record/${id}`, userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setRecords(json);
        }
      });

    fetch(`http://localhost:5000/api/device/${id}`, userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setDevices(json);
        }
      });

    fetch(`http://localhost:5000/api/role/${id}`, userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setRoles(json);
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
      <WorkspaceTabs
        registros={<Registers rows={data} />}
        puertas={<Devices devices={devices} />}
        roles={<Roles roles={roles} />}
      />
    </div>
  );
}
