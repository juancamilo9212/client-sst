import React,{useEffect,useState} from 'react';
import './ResourceList.scss';
import {Button,notification} from 'antd';
import ExtintorTable from './ExtintorTable/index';
import KitDerrameTable from './KitDerrameTable/index';

export default function ResourceList(props) {

    const {
        option,
        tableData,
        openResourceModal,
        setReloadResource,
        openInspectionsModal
        }=props;

    return (
        <div className="resource-list">
            <Button
            className="resource-list__create"
            onClick={() => openResourceModal()}
            >
            {`Crear ${option}`}
            </Button>
            <ResourceTable
            tableData={tableData}
            option={option}
            setReloadResource={setReloadResource}
            openResourceModal={openResourceModal}
            openInspectionsModal={openInspectionsModal}
            /> 
        </div>
    )
}  

function ResourceTable(props){
const {tableData,
    option,
    setReloadResource,
    openResourceModal,
    openInspectionsModal
    } = props;

switch (option) {
    case "Extintor":
        return(
            <ExtintorTable
            extintors={tableData}
            setReloadResource={setReloadResource}
            openResourceModal={openResourceModal}
            openInspectionsModal={openInspectionsModal}
            />
            )
    case "Kit Derrame":
        return(
            <KitDerrameTable
            kitsDerrame={tableData}
            setReloadResource={setReloadResource}
            openResourceModal={openResourceModal}
            openInspectionsModal={openInspectionsModal}
            />
        )
    default:
        break;
}
}


