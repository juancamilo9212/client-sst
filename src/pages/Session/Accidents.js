import React,{useEffect, useState} from 'react';
import {Button} from 'antd';
import AccidentList from '../../components/Session/AccidentList';
import {getAccidentsApi} from '../../api/accident';
import {getUserId, getAccessTokenApi} from '../../api/auth';
import Modal from '../../components/Modal';
import AddAccidentForm from '../../components/Session/AddAccidentForm';

export default function Accidents() {

     const [accidents, setAccidents] = useState([]);
     const [reloadAccidents, setReloadAccidents] = useState(false);
     const [isVisibleModal, setIsVisibleModal] = useState(false);
     const [modalContent,setModalContent]= useState({});
     const [modalTitle, setModalTitle] = useState("");
     const userId =getUserId();
     

     useEffect(() => {
         getAccidentsApi(userId).then(response => {
            console.log(response);
            setAccidents(response);
            setReloadAccidents(false);
         })
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [reloadAccidents])

     const openAddAccidentModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Nuevo accidente")
        setModalContent(
                <AddAccidentForm/>
        )
     }
     
    return (
        <div className="accidents">
            <div className="accidents__add-btn">
            <Button
            type='primary'
            style={{
            fontWeight:"bold",
            width:"200px",
            height:"50px",
            fontSize:"16px"
            }}
            onClick={openAddAccidentModal}
            >
            Crear accidente
            </Button>
            </div>
            
            <div>
            <AccidentList
            accidents={accidents}
            />
            </div>
            <Modal
            setIsVisible={setIsVisibleModal}
            isVisible={isVisibleModal}
            title={modalTitle}
            className="accident-list__modal"
            >
            {modalContent}
            </Modal>
        </div>
        
    )
}
