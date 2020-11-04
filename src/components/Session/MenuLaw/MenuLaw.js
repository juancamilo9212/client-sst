import React from 'react';
import './MenuLaw.scss';
import {Menu} from 'antd';

export default function MenuLaw(props) {

    const {setCategory,setIsLoading,setLaws}=props;
    const {Item}=Menu;

    const actionsOnClick = (category) =>{
        setCategory(category);
        setIsLoading(true);
        setLaws([]);
    }

    return (
        <div>
            <Menu
            className="menu-leyes"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            >
            
            <Item 
            className="menu-leyes__item"
            key="1"
            onClick={() =>actionsOnClick("5")}
            >
            <span>Leyes</span>
            </Item>

            <Item 
            key="2"
            className="menu-leyes__item"
            onClick={()=>actionsOnClick("6")}
            >
            <span>Decretos</span>
            </Item>

            <Item 
            key="3"
            onClick={()=>actionsOnClick("7")}
            >
            <span>Circulares</span>
            </Item>

            <Item 
            key="4"
            onClick={()=>actionsOnClick("2")}
            >
            <span>Legislación</span>
            </Item>

            <Item 
            key="5"
            onClick={()=>actionsOnClick("8")}
            >
            <span>Resoluciones</span>
            </Item>

            <Item 
            key="6"
            onClick={()=>actionsOnClick("9")}
            >
            <span>Conceptos</span>
            </Item>

            </Menu>
        </div>
    )
}
