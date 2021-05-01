import React,{useState,useEffect} from 'react';
import {Select,notification} from 'antd';
import ResourceList from '../../components/Session/ResourceList';
import {getExtintorsApi} from '../../api/extintors';
import {getKitsDerrameApi} from '../../api/kitDerrame';
import {getUserId} from '../../api/auth';
import Modal from '../../components/Modal';
import AddEditExtintorForm from '../../components/Session/ResourceList/AddEditExtintorForm';
import InspectionsModal from '../../components/Session/ResourceList/InspectionsModal/';
import AddEditKitDerrameForm from '../../components/Session/ResourceList/AddEditKitDerrameForm';
import AddEditBotiquinForm from '../../components/Session/ResourceList/AddEditBotiquinForm';
import {getBotiquinesApi} from '../../api/botiquines';
import {getCamillasApi} from '../../api/camilla';
import AddEditCamillaForm from '../../components/Session/ResourceList/AddEditCamillaForm';


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
                    });
                });
            break;
            
            case "Kit Derrame":
                getKitsDerrameApi(userId).then(response => {
                    const {kitsDerrame} = response;
                    setTableData(kitsDerrame);
                    setReloadResource(false);
                }).catch(err =>{
                    notification["error"]({
                        message:"No se ha podido encontrar la información solicitada"
                    });
                });
            break;

            case "Botiquin":
                getBotiquinesApi(userId).then(response => {
                    const {botiquines} = response;
                    setTableData(botiquines);
                    setReloadResource(false);
                }).catch(err =>{
                    notification["error"]({
                        message:"No se ha podido encontrar la información solicitada"
                    });
                });
            break;

            case "Camilla":
                getCamillasApi(userId).then(response => {
                    const {camillas} = response;
                    setTableData(camillas);
                    setReloadResource(false);
                }).catch(err =>{
                    notification["error"]({
                        message:"No se ha podido encontrar la información solicitada"
                    });
                });
            break;
            default:
            break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadResource])

    const openResourceModal = (resource) => {
        switch (option) {
            case "Extintor":
            setIsVisibleModal(true)

            resource ?
            setModalTitle("Actualizando un extintor")
            :
            setModalTitle("Creando un nuevo extintor")

            setModalContent(
           <AddEditExtintorForm
           setReloadResource={setReloadResource}
           setIsVisibleModal={setIsVisibleModal}
           setOption={setOption}
           extintor={resource}
           />
            )
            break;

            case "Kit Derrame":
            setIsVisibleModal(true)
            resource ?
            setModalTitle("Actualizando un kit de derrame")
            :
            setModalTitle("Creando un nuevo kit de derrame")

            setModalContent(
           <AddEditKitDerrameForm
           setReloadResource={setReloadResource}
           setIsVisibleModal={setIsVisibleModal}
           setOption={setOption}
           kitDerrame={resource}
           />
            )
            break;
                
            case "Botiquin":
                setIsVisibleModal(true)
                resource ?
                setModalTitle("Actualizando un botiquin")
                :
                setModalTitle("Creando un nuevo botiquin")
    
                setModalContent(
                <AddEditBotiquinForm
                setReloadResource={setReloadResource}
                setIsVisibleModal={setIsVisibleModal}
                setOption={setOption}
                botiquin={resource}
                />
                )
            break;

            case "Camilla":
                setIsVisibleModal(true)
                resource ?
                setModalTitle("Actualizando una camilla")
                :
                setModalTitle("Creando una camilla")
    
                setModalContent(
                <AddEditCamillaForm
                setReloadResource={setReloadResource}
                setIsVisibleModal={setIsVisibleModal}
                setOption={setOption}
                camilla={resource}
                />
                )
            break;
        
            default:
            break;
        }
    }
    
    const openInspectionsModal = (
    resource,
    resourceId,
    resourceType
    ) => {
        
                setIsVisibleModal(true);
                setModalTitle(`Inspecciones realizadas al ${resourceType}`);
                setModalContent(
                <InspectionsModal
                resource={resource}
                resourceId={resourceId}
                resourceType={resourceType}
                setIsVisibleModal={setIsVisibleModal}
                setReloadResource={setReloadResource}
                />
                )
    }

    function onChange(value){
        setOption(value);
        setReloadResource(true);
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
            <Option value="Kit Derrame">Kits De Derrame</Option>
            <Option value="Camilla">Camillas</Option>
            <Option value="Botiquin">Botiquines</Option>
            </Select>
            {
                option ?
                <ResourceList
                option={option}
                tableData={tableData}
                openResourceModal={openResourceModal}
                openInspectionsModal={openInspectionsModal}
                setReloadResource={setReloadResource}
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

