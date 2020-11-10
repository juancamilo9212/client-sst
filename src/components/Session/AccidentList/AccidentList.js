import React from 'react';
import './AccidentList.scss';
import {Table, Tag, Space, Button} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/es';

export default function AccidentList(props) {

    const {accidents} = props;
    
    return (
        <div className="accident-list">
            <div className="accident-list__list">
                <Accidents accident={accidents}/>
            </div>
        </div>
    )
}

function Accidents(props){

const {accident} = props;
let color;

const columns = [
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
            color = value === 'Si' ? 'green':'volcano';
            return(
                <Tag
                color={color}
                key={value}
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
            >
            <EyeOutlined />
            </Button>
            <Button
            type='primary'
            >
            <EditOutlined />
            </Button>
            <Button
            type='danger'
            >
            <DeleteOutlined />
            </Button>

        </Space>
    )
}
]

let dataSource =[];

accident.map(accident => {
const item ={
    key:accident._id,
    cedula:accident.idNumber,
    nombre:`${accident.name} ${accident.lastName}`,
    empresa:"Firplak",
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
scroll={{ y: 330 }}
/>
)
}
