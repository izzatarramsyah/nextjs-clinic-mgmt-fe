import axios from 'axios';
import {useState} from 'react'

import { userService } from "./UserServices.js";

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
    async(config) => {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:8000/users/getToken');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosJWT.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 403) {
        const request = {
            username : userService.userValue.user.username,
        }
        userService.logout(request);
      }
      return Promise.reject(error);
    }
  );

export default axiosJWT;