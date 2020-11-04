import {BASE_URL, API_VERSION} from './config';
import {ACCESS_TOKEN,REFRESH_TOKEN} from '../utils/constants';
import jwtDecode from 'jwt-decode';
import { Result } from 'antd';

export function getAccessTokenApi(){
    const accessToken=localStorage.getItem(ACCESS_TOKEN);
    if(!accessToken || accessToken==="null"){
        return null
    }
    return isTokenExpired(accessToken)? null:accessToken;
}

export function getRefreshAccessTokenApi(){
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if(!refreshToken || refreshToken==="null"){
        return null;
    }
    return isTokenExpired(refreshToken) ? null:refreshToken;
}

export function refreshAccessTokenApi(refreshToken){
    const url = `${BASE_URL}/${API_VERSION}/refresh-access-token`;
    const bodyObj = {
        refreshToken:refreshToken
    }
    const params = {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers:{
            "Content-Type":"applicaton/json"
        }
    }

    return fetch(url,params).then(response => {
        if(response.code !== 200){
            return null;
        }else{
            return response.json();
        }
    }).then(result => {
        if(!result){
            logOut()
        }else{
            const {accessToken}=result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
    }).catch(err => {
        return err
    })
}

export function logOut(){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

function isTokenExpired(token){
    const seconds=60;
    const metaToken=jwtDecode(token);
    const {exp} =metaToken;
    const now = (Date.now() + seconds)/1000;
    return now > exp;
}