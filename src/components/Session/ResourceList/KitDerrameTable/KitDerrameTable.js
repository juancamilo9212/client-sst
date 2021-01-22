import React from 'react';
import './KitDerrameTable.scss';
import 
    { EyeOutlined, 
    EditOutlined, 
    DeleteOutlined 
    } from '@ant-design/icons';
import {Space, Button,
    notification,Modal} from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import Table from '../../../Table';
import {removeKitDerrameApi} from '../../../../api/kitDerrame';

export default function KitDerrameTable(props) {

    const 
    {kitsDerrame,
    setReloadResource,
    openResourceModal,
    openInspectionsModal
    } = props;
    
    const columns =
    [
       {
           title:'Empresa',
           dataIndex:'empresa',
           key:'empresa'
       },
       {
           title:'Consecutivo',
           dataIndex:'consecutivo',
           key:'consecutivo',
       },
       {
           title:'Ubicación',
           dataIndex:'ubicacion',
           key:'ubicacion'
       },
       {
           title: 'Acciones',
           key: 'acciones',
           render: (text,record) => (
               
               <Space size="middle">
                   <Button
                   type='primary'
                   style={{background:"#00FFFF"}}
                   onClick={() => handleEdit(text)}
                   >
                   <EditOutlined
                   style={{color:"rgba(0,0,0,0.5)"}}
                   />
                   </Button>
                   <Button
                   type='danger'
                   style={{background:"#FDBCB4"}}
                   onClick={() => handleDelete(text)}
                   >
                   <DeleteOutlined
                   style={{color:"rgba(0,0,0,0.5)"}}
                   />
                   </Button>
       
               </Space>
           )
       },
       {
       title: 'Inspecciones',
           key: 'inspecciones',
           render: (text,record) => (
               <Button
               type='primary'
               style={{background:"#00FFFF"}}
               onClick={() => viewInspections(text)}
               >
               <EyeOutlined
               style={{color:"rgba(0,0,0,0.5)"}}
               />
               </Button>
           )
       }
]

const viewInspections = (text) => {
    const kitDerrameId = text.key;
    let kitDerrame = getResource(kitDerrameId,kitsDerrame);
    openInspectionsModal(kitDerrame,kitDerrameId,"kit de derrame");
}

const deleteKitDerrame = (text) => {
    const kitDerrameId = text.key;
    removeKitDerrameApi(kitDerrameId).then(response => {
        notification["success"]({
            message:"El Kit de derrame fue eliminado correctamente"
        });
        setReloadResource(true);
        }).catch(err => {
            notification["error"]({
                message:err
            });  
        });
}

const handleDelete = (text) => {
    const {confirm} = Modal;
    confirm({
    content: `¿Deseas eliminar el kit de derrame ${text.consecutivo}?`,
    onOk() {
            deleteKitDerrame(text)
          }
    })
}

const handleEdit = (text) => {
    const kitDerrameId = text.key;
    let kitDerrame = getResource(kitDerrameId,kitsDerrame);
    openResourceModal(kitDerrame);
}

let dataSource =[];

kitsDerrame.map(extintor => {
    const {
    _id,
    company,
    location,
    serialNumber
    } = extintor;

    const item ={
        key:_id,
        empresa:company,
        consecutivo:serialNumber,
        ubicacion:location
    }
    dataSource.push(item);
})

    return (
        <Table
        dataSource={dataSource}
        columns={columns}
        />
    )
}

function getResource(key,resourceObject){
    let resource;
    resourceObject.filter(item => {
    if(item._id === key){
        resource = item;
    }
    })
    return resource;
}