import Link from "next/link";
import Auth from "../layouts/Auth.js";
import { useState, useEffect, React } from "react";
import Router from "next/router";

// components
import FormRegister from "./FormRegister.js";

// serivces
import { userService } from "../../services/UserServices.js";

export default function Register() {

  const [loading, isLoading] = useState(false);

  const handleRegister = (data) => {
    isLoading(true);
    try {
      const request = {
        nik: data.nik,
        bpjsNo: data.bpjsNo,
        password: data.password,
        email : data.email
      };
      userService.register(request).then((response) => {
        setLoginLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Auth>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#002DBB]">
          Registartion Clinic Dummy
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <FormRegister handleRegister={handleRegister} isLoading={false} />
        </div>
      </div>
    </Auth>
  );
}
