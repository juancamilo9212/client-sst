import React,{useEffect,useState} from 'react';
import './ResourceList.scss';
import {Button,notification} from 'antd';
import ExtintorTable from './ExtintorTable/index';

export default function ResourceList(props) {

    const {
        option,
        tableData,
        openResourceModal
        }=props;

    
    
    return (
        <div className="resource-list">
            <Button
            className="resource-list__create"
            onClick={() => openResourceModal(option)}
            >
            {`Crear ${option}`}
            </Button>
            <ResourceTable
            tableData={tableData}
            option={option}
            /> 
        </div>
    )
}  

function ResourceTable(props){
const {tableData,option} = props;
switch (option) {
    case "Extintor":
        return(
            <ExtintorTable
            extintors={tableData}
            />
            )

    default:
        break;
}
}


