import React from 'react';
import {Layout, Tabs} from 'antd';
import {Redirect} from 'react-router-dom';
import logo from '../../../assets/img/jpg/logo.jpg';
import SignUpForm from '../../../components/Session/SignUpForm';
import LoginForm from '../../../components/Session/LogInForm';
import {getAccessTokenApi} from '../../../api/auth';
import './SignIn.scss';

export default function SignIn() {
    const {Content}=Layout;
    const {TabPane}=Tabs;

    if(getAccessTokenApi()){
        return <Redirect to="/leyes"/>
    }

    return (
       <Layout className="sign-in">
           <Content className="sign-in__content">
               <h1 className="sign-in__content-logo">
                <img src={logo} alt="logo"/>
               </h1>
               <div className="sign-in__content-tabs">  
                <Tabs type="card">

                <TabPane tab="Entrar" key="1">
                <LoginForm/>
                </TabPane>

                <TabPane tab="Registro" key="2">
                <SignUpForm/>
                </TabPane>
                
                </Tabs>
               </div>
           </Content>
       </Layout>
    )
}
