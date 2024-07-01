import axios from 'axios';
import axiosJWT from './AxiosJWT';
import { BehaviorSubject } from 'rxjs';
import Router from "next/router";
import { jwtDecode } from "jwt-decode";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

// security
import { Aes256 } from '../security/Aes256.js';

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout
};

function login(request) {
    return axios.post(`${process.env.BASE_URL}/users/login`, Aes256.encryptUsingAES256(JSON.stringify(request)), {
        headers: {
            'Content-Type': 'text/plain'
        }}).then((response) => {
            if (response.data.responseCode === 200){
                const decoded = jwtDecode(response.data.accessToken);
                userSubject.next(decoded);
                localStorage.setItem('user', JSON.stringify(decoded));
                setCookie('refreshToken', response.data.refreshToken);
            }
        return response;
    });
}

function logout(request) {
    return axiosJWT.post(`${process.env.BASE_URL}/users/logout`, Aes256.encryptUsingAES256(JSON.stringify(request)), {
        headers: {
            'Content-Type': 'text/plain',
        }}).then((response) => {
            if (response.data.responseCode === 200){
                localStorage.removeItem('user');
                userSubject.next(null);
                deleteCookie('refreshToken');
                Router.push('/auth/Login');
            }
        return response;
    });
}