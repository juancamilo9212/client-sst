import React from 'react';
import {Menu, Layout, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {BookOutlined, BarChartOutlined} from '@ant-design/icons';
import { createGlobalStyle } from "styled-components";
import './MenuSider.scss';

export default function MenuSider() {

const {Item}=Menu;
const {Sider}=Layout;

const TooltiplStyle = createGlobalStyle`
  body {
    .ant-tooltip-inner {
        font-size: 18px;
        font-weight: bold;
        border: 1px solid #00FFFF; 
    }
    .ant-tooltip-arrow-content{
        border: 1px solid #00FFFF;
    }
  }
`;


    return (
        <div>
            <Sider
            className="menu-sider"
            >
            <Menu
            mode="inline" 
            defaultSelectedKeys={["/sesion/leyes"]}
            inlineIndent={70}
            >

                <Item 
                key="/leyes"
                className="menu-sider__item"
                >
                <Tooltip 
                title="Leyes"
                placement="right"
                >
                <TooltiplStyle/>
                <Link to="/leyes">
                    <BookOutlined/>
                </Link>
                </Tooltip>
               </Item>

                <Item 
                key="/accidentes"
                className="menu-sider__item"
                >
                <Tooltip 
                title="Accidentes"
                placement="right"
                >
                <TooltiplStyle/>
                <Link to="/accidentes">
                <BarChartOutlined />
                </Link>
                </Tooltip>
                </Item>
                
            </Menu>
            </Sider>
            
        </div>
    )
}


    
    

