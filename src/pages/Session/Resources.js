import React,{useState,useEffect} from 'react';
import {Select,notification} from 'antd';
import ResourceList from '../../components/Session/ResourceList';
import {getExtintorsApi} from '../../api/extintors';
import {getUserId} from '../../api/auth';
import Modal from '../../components/Modal';
import AddEditExtintorForm from '../../components/Session/ResourceList/AddEditExtintorForm';

export default function Resources() {
    const {Option} = Select;
    const [option, setOption] = useState("");
    const [tableData, setTableData] = useState([]);
    const [reloadResource, setReloadResource] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [isVisibleModal, setIsVisibleModal] = useState(false);
     
    
    useEffect(() => {
        const userId=getUserId();
        switch (option) {
            case "Extintor":
                getExtintorsApi(userId).then(response => {
                    const {extintors} = response;
                    setTableData(extintors);
                    setReloadResource(false);
                }).catch(err =>{
                    notification["error"]({
                        message:"No se ha podido encontrar la información solicitada"
                    })
                })
            break;
        
            default:
                break;
        }
    }, [option,setReloadResource])

    const openResourceModal = option => {
        switch (option) {
            
            case "Extintor":
            setIsVisibleModal(true);
            setModalTitle("Creando un nuevo extintor");
            setModalContent(
           <AddEditExtintorForm
           setReloadResource={setReloadResource}
           setIsVisibleModal={setIsVisibleModal}
           />
            )
            break;
        
            default:
                break;
        }
    }
    
    function onChange(value){
        setOption(value)
    }

    return (
        
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
            {
                option ?
                <ResourceList
                option={option}
                tableData={tableData}
                openResourceModal={openResourceModal}
            />:
            null
            }
            <Modal
            visible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
            title={modalTitle}
            width={"50%"}
            height={"50%"}
            >
                {modalContent}
            </Modal>
                
            </div>
        
    )
}

