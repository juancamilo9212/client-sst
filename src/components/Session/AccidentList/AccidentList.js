import React from 'react';
import './AccidentList.scss';
import {Table, Tag, Space, Button,
     notification,Modal} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {deleteAccidentApi} from '../../../api/accident';
import moment from 'moment';
import 'moment/locale/es';

export default function AccidentList(props) {

    const {accidents,openAddAccidentModal,
        setReloadAccidents,openViewAccidentModal} = props;
    
    return (
        <div className="accident-list">
            <div className="accident-list__list">
                <Accidents 
                accidents={accidents}
                openAddAccidentModal={openAddAccidentModal}
                setReloadAccidents={setReloadAccidents}
                openViewAccidentModal={openViewAccidentModal}
                />
            </div>
        </div>
    )
}

function Accidents(props){

let color;
const {accidents,openAddAccidentModal,
    setReloadAccidents,openViewAccidentModal} = props;
const {confirm}=Modal;

const pickAccident = (text) => {
    let accidentToWork=accidents.filter(item => {
        return item._id === text.key
    });
    return accidentToWork;
}

const handleEdit = (text) =>{
    let accidentToWork=pickAccident(text);
    openAddAccidentModal(accidentToWork[0]);
}

const deleteAccident = (text) => {
    deleteAccidentApi(text.key).then(response => {
        notification["success"]({
            message:response.message
        });
        setReloadAccidents(true);
    }).catch(err => {
        notification["error"]({
            message:err.message
        });
    })
}

const handleDelete = (text) => {

return(
    confirm({
        content: `¿Deseas eliminar el accidente de ${text.nombre}?`,
        onOk() {
            deleteAccident(text)
          }
    })
)
}

const handleView = (text) => {
    let accidentToWork=pickAccident(text);
    openViewAccidentModal(accidentToWork[0]);
}

    const columns =
         [
            {
                title:'Nombre',
                dataIndex:'nombre',
                key:'Nombre',
            },
            {
                title:'CC',
                dataIndex:'cedula',
                key:'Cedula'
            },
            {
                title:'Empresa',
                dataIndex:'empresa',
                key:'Empresa'
            },
            {
                title:'Fecha y hora',
                dataIndex:'fecha',
                key:'Fecha'
            },
            {
                title:'Investigado',
                dataIndex:'investigado',
                key:'Investigado',
                render:investigado =>(
                    <>
                    {investigado.map(value => {
                        color = value === 'Si' ? '#00FFFF':'volcano';
                        return(
                            <Tag
                            color={color}
                            key={value}
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
            },
            {
                title: 'Acciones',
                key: 'acciones',
                render: (text,record) => (
                    
                    <Space size="middle">
                        <Button
                        type='primary'
                        style={{background:"#00FFFF"}}
                        onClick={() => handleView(text)}
                        >
                        <EyeOutlined 
                        style={{color:"rgba(0,0,0,0.5)"}}
                        />
                        </Button>
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
            }
        ]
    
    let dataSource =[];
        
        accidents.map(accident => {
        const item ={
            key:accident._id,
            cedula:accident.idNumber,
            nombre:`${accident.name} ${accident.lastName}`,
            empresa:accident.company,
            fecha:moment(accident.eventDate).format('lll'),
            investigado:[accident.researched ? "Si":"No"]
        }
        dataSource.push(item);
        })
        
        return(
        <Table 
        columns={columns} 
        dataSource={dataSource}
        pagination={{ pageSize: 10 ,
        position:["bottomCenter"]
        }}
        scroll={{ y: 350 }}
        bordered
        />
        )
}

