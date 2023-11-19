import {useEffect, useState, React} from "react";
import Head from 'next/head'
import Router from "next/router";

// components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Header/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// services
import { userService } from "../../services/UserServices.js";

export default function Admin({ children }) {

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userService.userValue) {
      const loadMenu = async () => {
        setUsername(userService.userValue.username);
      };
      loadMenu();
    } 
  },[]);

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar username={username}/>
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
