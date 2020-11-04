import React from 'react';
import './SessionHeader.scss';
import {Button} from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import logo from '../../../assets/img/jpg/logo.jpg';
import {logOut} from '../../../api/auth'

export default function SessionHeader() {

    const logOutUser = () => {
        logOut();
        window.location.reload();
    }
    return (
        <div className="session-header">
            <div className="session-header__left"></div>
                <img 
                className="session-header__left-logo" 
                alt="logo" src={logo}
                />
            <div className="session-header__right">
                <Button 
                type="link" 
                onClick={logOutUser}
                >{<PoweroffOutlined />}
                </Button>
            </div>
        </div>
    )
}
