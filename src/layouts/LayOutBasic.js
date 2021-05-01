import React from 'react';
import {Layout} from 'antd'; 
import {Route, Switch, Redirect} from 'react-router-dom';
import SessionHeader from '../components/Session/SessionHeader';
import MenuSider from '../components/Session/MenuSider';
import SignIn from '../pages/Session/SignIn/SignIn';
import {getAccessTokenApi, getRefreshAccessTokenApi} from '../api/auth';
import useAuth from '../hooks/useAuth'
import './LayOutBasic.scss';

export default function LayOutBasic(props) {

    const {routes}=props;
    const {Header, Footer, Content, Sider}=Layout;
    const {user,isLoading} =useAuth();
    
    
    if(!user){
      return(
        <>
        <Route 
        path="/inicio-sesion"
        component={SignIn}
        />
        <Redirect to="/inicio-sesion"/>
        </>
      )
    }
    
      return (
      
        <Layout className="layout-basic">
          <Header className="layout-basic__header">
            <SessionHeader/>
          </Header>
          <Layout className="layout-basic__content">
            <Sider className="layout-basic__content-menu">
              <MenuSider/>
              </Sider>
            <Content className="layout-basic__content-content">
              <LoadRoutes routes={routes}/>
            </Content>
          </Layout>
          <Footer className="layout-basic__footer">
            Footer ......
          </Footer>
        </Layout>
        
        )
}

function LoadRoutes(props){

const {routes}=props;

return(
    <Switch>
        {routes.map((route,index) => ( 
        <Route
        key={index}
        path={route.path}
        exact={route.path}
        component={route.component}
        />
        
    ))}
    </Switch> 
)
}
