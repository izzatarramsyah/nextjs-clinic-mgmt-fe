import { useState, useEffect, React, createRef } from "react";
import Router from "next/router";

import { userService } from "../../../services/UserServices.js";

export default function Navbar({ username }) {
 
  const logout = async(e) => {
    e.preventDefault(); 
    try { 
      const request = {
        username : username
      }
      userService.logout( request );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-black text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Selamat Datang, {username}
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="flex justify-content:space-between">
              <div className="relative flex w-auto ">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search"></i>
                </span>
                <input type="text" placeholder="Search here..."
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-blue bg-blue rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
              </div>
              <button onClick={logout}
                className="text-blueGray-500 hover:text-[#002DBB] w-3/12"> <i className="fas fa-right-from-bracket"> </i>
              </button> 
            </div>
          </form>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
