import React from 'react';
import {Space, Button,
    notification,Modal} from 'antd';
import 
    { EyeOutlined, 
    EditOutlined, 
    DeleteOutlined 
    } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/es';
import './ExtintorTable.scss';
import {removeExtintorApi} from '../../../../api/extintors';
import Table from '../../../Table';


export default function ExtintorTable(props) {
 
const{extintors,
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
           title:'Tipo de agente',
           dataIndex:'agente',
           key:'agente'
       },
       {
           title:'Ubicación',
           dataIndex:'ubicacion',
           key:'ubicacion'
       },
       {
           title:'Última recarga',
           dataIndex:'fechaRecarga',
           key:'fechaRecarga'
       },
       {
           title:'Próxima recarga',
           dataIndex:'fechaProx',
           key:'fechaProx'
       },
       {
           title:'¿Vencido?',
           dataIndex:'vencido',
           key:'vencido',
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

const deleteExtintor = (text) => {
    const accidentId = text.key;
    removeExtintorApi(accidentId).then(response => {
        notification["success"]({
            message:"El extintor fue eliminado correctamente"
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
    content: `¿Deseas eliminar el extintor ${text.consecutivo}?`,
    onOk() {
            removeExtintorApi(text).then(response => {
                notification["success"]({
                    message:"El extintor ha sido eliminado correctamente"
                }).catch(err => {
                    notification["error"]({
                        message:err
                    });
                });
            });
          }
    })
}

const handleEdit = (text) => {
const extintorId = text.key;
let extintor = getResource(extintorId,extintors)
openResourceModal(extintor);
}

const viewInspections = (text) => {
    const extintortId = text.key;
    let extintor = getResource(extintortId,extintors)
    openInspectionsModal(extintor,extintortId,"Extintor");
}

let dataSource =[];
        
extintors.map(extintor => {
    const {
    _id,
    company,
    serialNumber,
    kindOfAgent,
    location,
    loadDate,
    nextLoadDate,
    needReload
    } = extintor;

    const vencido = needReload ? 'Si':'No';

    const item ={
        key:_id,
        empresa:company,
        consecutivo:serialNumber,
        agente:kindOfAgent,
        ubicacion:location,
        fechaRecarga:moment(loadDate).format('MM/YYYY'),
        fechaProx:moment(nextLoadDate).format('MM/YYYY'),
        vencido:vencido
    }
    dataSource.push(item);
})

    return(
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