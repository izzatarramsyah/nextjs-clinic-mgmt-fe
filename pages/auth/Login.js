import Link from "next/link";
import Auth from "../layouts/Auth.js";
import { useState, useEffect, React } from "react";
import Router from "next/router";

// components
import FormLogin from "./FormLogin.js";

// serivces
import { userService } from "../../services/UserServices.js";

export default function Login() {

  const [loading, isLoading] = useState(false);

  const handleLogin = (data) => {
    isLoading(true);
    try {
      const request = {
        username: data.username,
        password: data.password,
      };
      userService.login(request).then((response) => {
        if ( response.status == '200' ) {
          Router.push('/home/dashboard');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Auth>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#002DBB]">
          Welcome to Clinic Dummy
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <FormLogin handleLogin={handleLogin} isLoading={loading} />
        </div>
      </div>
    </Auth>
  );
}
