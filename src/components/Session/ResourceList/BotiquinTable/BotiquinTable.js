import React from 'react';
import './BotiquinTable.scss';
import Table from '../../../Table';
import {Space, Button,
    notification,Modal} from 'antd';
import 
{ EyeOutlined, 
EditOutlined, 
DeleteOutlined 
} from '@ant-design/icons';

import {removeBotiquinApi} from '../../../../api/botiquines';

export default function BotiquinTable(props) {
    const 
    {botiquines,
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

const handleEdit = (text) => {
    const botiquinId = text.key;
    let botiquin = getResource(botiquinId,botiquines)
    openResourceModal(botiquin);
}

const viewInspections= (text) => {
    const botiquinId = text.key;
    let botiquin = getResource(botiquinId,botiquines)
    openInspectionsModal(botiquin,botiquinId,"Botiquin");
}

const handleDelete= (text) => {
    const {key} = text;
    const {confirm} = Modal;
    confirm({
    content: `¿Deseas eliminar el extintor?`,
    onOk() {
            removeBotiquinApi(key);
            setReloadResource(true);
          }
    });
}

let dataSource = [];

botiquines.map(botiquin => {
    const 
    {
    _id,
    company,
    location
    } = botiquin;

    const item = {
        key:_id,
        empresa:company,
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