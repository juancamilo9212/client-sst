import React,{useEffect, useState} from 'react';
import {Button,Select,DatePicker,Input} from 'antd';
import AccidentList from '../../components/Session/AccidentList';
import {getAccidentsApi} from '../../api/accident';
import {getUserId, getAccessTokenApi} from '../../api/auth';
import Modal from '../../components/Modal';
import AddAccidentForm from '../../components/Session/AddAccidentForm';
import AccidentView from '../../components/Session/AccidentView';

export default function Accidents() {

     const [accidents, setAccidents] = useState([]);
     const [reloadAccidents, setReloadAccidents] = useState(false);
     const [isVisibleModal, setIsVisibleModal] = useState(false);
     const [modalContent,setModalContent]= useState({});
     const [modalTitle, setModalTitle] = useState("");
     const [filter, setFilter] = useState("");
     const [filterValue, setFilterValue] = useState("");
     const [accidentsCount, setAccidentsCount] = useState("");
     const {Option}=Select;
     const userId =getUserId();
     
     
     
     useEffect(() => {
         getAccidentsApi(userId,filter,filterValue).then(response => {
            setAccidents(response.accidents);
            setAccidentsCount(response.count);
            setReloadAccidents(false);
         })
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [reloadAccidents,filterValue])

     const openAddAccidentModal = (accident) => {

        setIsVisibleModal(true);
        accident ?
        setModalTitle("Actualizando un accidente")
        :
        setModalTitle("Creando un accidente")
        setModalContent(
                <AddAccidentForm
                setReloadAccidents={setReloadAccidents}
                setIsVisibleModal={setIsVisibleModal}
                accident={accident}
                />
        )
     }

     const openViewAccidentModal = (accident) => {
         setIsVisibleModal(true);
         setModalTitle(`Accidente de ${accident.name} ${accident.lastName}` );
         setModalContent(
             <AccidentView
             accident={accident}
             />
         )
     }

     const clearAll = () => {
        setFilterValue("");
        setFilter("");
    }

    return (
        <div className="accidents">
            <div className="accidents__add-btn">
            <Button
            type='primary'
            style={{
            fontWeight:"bold",
            width:"300px",
            height:"50px",
            fontSize:"16px",
            background:"#00FFFF",
            color:"rgba(0,0,0,0.5)"
            }}
            onClick={() => openAddAccidentModal()}
            >
            Crear Accidente de Trabajo
            </Button>

            <Select
            value={!filter ? "Selecciona un filtro" : filter}
            onChange={e => setFilter(e)}
            style={
            {marginLeft:"20px",
            width:"250px",
            fontWeight:"bold"
            }}
            >
            <Option value="name">Nombre</Option>
            <Option value="lastName">Apellido</Option>
            <Option value="bodyPartAffected">PCA</Option>
            </Select>
            {
                filter ?
            <Input
            allowClear
            onPressEnter={e => setFilterValue(e.target.value)}
            style={
            {
            width:"200px",
            marginLeft:"20px",
            fontWeight:"bold"
            }
            }
            />:
            null
        }
            {filterValue ? 
            <Button
            type="danger"
            onClick={clearAll}
            style={
                {
                marginLeft:"20px",
                fontWeight:"bold"
                }
                }
            >
            Limpiar
            </Button>:
            null
            }
            </div>

            <div>
                <h2
                style={{
                    marginTop:"20px",
                    color:"white",
                    fontSize:"20px",
                    fontWeight:"bold"
                }}
                >{`Resultados: ${accidentsCount} `}</h2>
            </div>

            <div>
            <AccidentList
            accidents={accidents}
            setReloadAccidents={setReloadAccidents}
            openAddAccidentModal={openAddAccidentModal}
            openViewAccidentModal={openViewAccidentModal}
            />
            </div>
            <Modal
            className="accident-list__modal"
            setIsVisible={setIsVisibleModal}
            isVisible={isVisibleModal}
            title={modalTitle}
            width={"75%"}
            height={"75%"}
            >
            {modalContent}
            </Modal>
        </div>
        
    )
}


