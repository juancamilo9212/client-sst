import React,{useState} from 'react';
import {Select} from 'antd';
import ResourceList from '../../components/Session/ResourceList';

export default function Resources() {
    const {Option} = Select;
    const [option, setOption] = useState("");
    
    function onChange(value){
        setOption(value)
    }

    return (
        <div>
            <div>
            <Select
            showSearch
            style={{ width: 250, fontSize:"16px"}}
            placeholder="Selecciona un recurso"
            optionFilterProp="children"
            onChange={onChange}
            >
            <Option value="Extintor">Extintores</Option>
            <Option value="Kit de Derrame">Kits De Derrame</Option>
            <Option value="Camilla">Camillas</Option>
            <Option value="Botiquin">Botiquines</Option>
            </Select>
            </div>
            <div>
            {option ? 
            <ResourceList
            option={option}
            />
            :
            null
            }
            </div>
        </div>
    )
}


