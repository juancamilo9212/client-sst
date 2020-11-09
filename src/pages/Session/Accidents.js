import React,{useEffect, useState} from 'react';
import {Button} from 'antd';
import AccidentList from '../../components/Session/AccidentList';
import {getAccidentsApi} from '../../api/accident';
import {getUserId, getAccessTokenApi} from '../../api/auth';

export default function Accidents() {

     const [accidents, setAccidents] = useState([]);
     const [reloadAccidents, setReloadAccidents] = useState(false);
     const userId =getUserId();
     

     useEffect(() => {
         getAccidentsApi(userId).then(response => {
            console.log(response);
            setAccidents(response);
            setReloadAccidents(false);
         })
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [reloadAccidents])
     
    return (
        <div className="accidents">
            <div className="accidents__add-btn">
            <Button
            type='primary'
            >Crear accidente</Button>
            </div>
            
            <div>
            <AccidentList
            accidents={accidents}
            />
            </div>
        </div>
        
    )
}
