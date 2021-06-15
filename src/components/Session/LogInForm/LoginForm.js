import React,{useState} from 'react';
import {Form, Input, Button, notification} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.scss'
import {signInApi} from '../../../api/user';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../../utils/constants';


export default function LoginForm() {

    const [userData, setUserData] = useState({
        email: "",
        password:""
    })

    const login = async () => {
        if(!userData.email || !userData.password){
            notification["warning"]({
                message: "Todos los campos son obligatorios"
            });
        }else{
            await signInApi(userData).then(response => {
                const {accessToken, refreshAccessToken} =response
                    if(accessToken){
                    localStorage.setItem(ACCESS_TOKEN, accessToken);
                    localStorage.setItem(REFRESH_TOKEN, refreshAccessToken);
                    window.location.href= "/leyes" 
                    }else{
                        notification["error"]({
                        message: response.message
                    });
                    }
                });
        }
    }

    return (
        <Form className="login-form" onSubmitCapture={login}>

            <Input
            placeholder="Correo electrónico"
            prefix={<MailOutlined />}
            name="email"
            type="email"
            className="login-form__input"
            value={userData.email}
            onChange={(e) => setUserData({...userData,email:e.target.value})}
            />  

            <Input
            placeholder="Contraseña"
            prefix={<LockOutlined />}
            name="password"
            type="password"
            className="login-form__input"
            value={userData.password}
            onChange={(e) => setUserData({...userData,password:e.target.value})}
            />

            <Button
            htmlType="submit"
            className="login-form__submit"
            >
            Entrar
            </Button>
        </Form>
    )
}
