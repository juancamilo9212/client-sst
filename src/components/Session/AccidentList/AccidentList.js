import React from 'react';
import './AccidentList.scss';
import {Table} from 'antd';
//import Accidents from '../../../pages/Session/Accidents';

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
    key:'Invetigado'
}
]

let dataSource =[];

accident.map(accident => {
const item ={
    key:accident._id,
    cedula:accident.idNumber,
    nombre:`${accident.name} ${accident.lastName}`,
    empresa:"Firplak",
    fecha:accident.eventDate,
    investigado:accident.researched ? "Si":"No"
}
dataSource.push(item);
})

return(
<Table columns={columns} dataSource={dataSource}/>
)
}
