import React, {useState, useEffect, createContext} from 'react';
import {getAccessTokenApi, 
    getRefreshAccessTokenApi, 
    refreshAccessTokenApi,
    logOut} from '../api/auth';
import jwtDecode from 'jwt-decode';


export const AuthContext=createContext();

export default function AuthProvider(props){
    const {children} = props;
    
    const [user, setUser] = useState({
        user:null,
        isLoading:true
    })
    

    useEffect(() => {
    isUserLogged(setUser)
    }, [])

return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function isUserLogged(setUser){
const accessToken=getAccessTokenApi();

if(!accessToken){
    const refreshToken=getRefreshAccessTokenApi();
    if(!refreshToken){
        logOut();
        setUser({
            user:null,
            isLoading:false
        })
    }else{
        refreshAccessTokenApi(refreshToken);
    }
}else{
    setUser({
        user:jwtDecode(accessToken),
        isLoading:false
    })
}
}