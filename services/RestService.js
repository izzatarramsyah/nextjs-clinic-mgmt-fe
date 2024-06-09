import axiosJWT from './AxiosJWT';
// security
import { Aes256 } from '../security/Aes256.js';

export const restService = {
    post,
    get
};

function post(endpoint, request){
    return axiosJWT.post(endpoint , Aes256.encryptUsingAES256(JSON.stringify(request)), {
        headers: {
            'Content-Type': 'application/json'
        }}).then((response) => {
        return response;
    });
}

function get(endpoint){
    return axiosJWT.get(endpoint, {
        headers: {
            'Content-Type': 'application/json'
        }}).then((response) => {
        return response;
    });
}
