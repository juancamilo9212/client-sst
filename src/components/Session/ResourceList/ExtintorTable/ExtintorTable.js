import React from 'react';
import {Table, Tag, Space, Button,
    notification,Modal} from 'antd';
import 
    { EyeOutlined, 
    EditOutlined, 
    DeleteOutlined 
    } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/es';
import './ExtintorTable.scss';

export default function ExtintorTable(props) {
    const {extintors} = props;
    //console.log(extintors);
    const columns = getExtintorsColumns();
    const dataSource = getTableData(extintors);

    return (
        <div className="extintor-table">
        <Table 
        columns={columns} 
        dataSource={dataSource}
        pagination={{ pageSize: 10 ,
        position:["bottomCenter"]
        }}
        scroll={{ y: 350 }}
        bordered
        className="extintor-table__table"
        />
        </div>
    )
   }

function viewInspections(){

}


function handleDelete(){

}

function handleEdit(){

}

function getExtintorsColumns(){
    let color;
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
           /*render:vencido =>(
               <>
               {vencido.map(value => {
                   color = value ? '#00FFFF':'volcano';
                   return(
                       <Tag
                       color={color}
                       key={value === true ? 'Si':'No'}
                       style={color==='#00FFFF'?
                       {color:"rgba(0,0,0,0.5)",
                       border:"1px solid rgba(0,0,0,0.5)"}
                       :null
                       }
                       >
                           {value}
                       </Tag>
                   )
               })}
               </>
           )
            */},
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
               onClick={() => viewInspections()}
               >
               <EyeOutlined
               style={{color:"rgba(0,0,0,0.5)"}}
               />
               </Button>
           )
       }
   ]
   return columns
}

function getTableData(extintors){
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
    return dataSource;
}
