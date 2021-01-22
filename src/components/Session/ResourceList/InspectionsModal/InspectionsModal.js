import React,{useState,useEffect} from 'react';
import './InspectionsModal.scss';
import {Input,Button,DatePicker,notification} from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import {PlusOutlined,DeleteOutlined} from '@ant-design/icons';
import {updateExtintorApi} from '../../../../api/extintors';
import {updateKitDerrameApi} from '../../../../api/kitDerrame';

export default function InspectionsModal(props) {
    const 
    {resource,
    resourceId,
    resourceType,
    setReloadResource,
    setIsVisibleModal
    }= props;
    const {inspections}=resource;
    const [inputs, setInputs] = useState(0);
    const [inspectionsLength, setInspectionsLength] = useState(0);
    const [sortedInspection, setSortedInspection] = useState([]);
    const [newInspections, setNewInspections] = useState([]);
    const [oldInspections, setOldInspections] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);
    console.log(sortedInspection);

   
    
    const updateResource = () => {
        const payload = getRequestData();
        const requestData = {
            inspections:payload
        }
        
        switch (resourceType) {
            case "Extintor":
                updateExtintorApi(resourceId,requestData).then(response => {
                    notification["success"]({
                        message:"El extintor fue actualizado exitosamente"
                    });
                    resetVariables();
                }).catch(err => {
                    notification["error"]({
                        message:err
                    })
                })
                break;

                case "kit de derrame":
                updateKitDerrameApi(resourceId,requestData).then(response => {
                    notification["success"]({
                        message:"El kit fue actualizado exitosamente"
                    });
                    resetVariables();
                }).catch(err => {
                    notification["error"]({
                        message:err
                    })
                });
                break;
        
            default:
                break;
        }
    }

    const handleAddInput = () => {
        setInputs(inputs+1);
    }

    const handleDeleteInspection = (array,index,state) => {
        array.splice(index, 1 );
        if(state === "New"){
            setInputs(inputs-1);
            setNewInspections(array);
            setHasChanged(true);
            }else{
            setOldInspections(array);
            setHasChanged(true);
            setInspectionsLength(inspectionsLength-1);
            }
    }

    const getNewInspections = (numberOfNewInspections) => {
        const newEmptyInspection={
            inspectionDate:null,
            inspectionComments:null
        }

        let auxNewInspections;
    
        if(numberOfNewInspections === 0){
            auxNewInspections=[];
        }else{
            auxNewInspections=newInspections;
            for (let index = auxNewInspections.length; 
                index < numberOfNewInspections; 
                index++) {
                auxNewInspections.push(newEmptyInspection);    
            }
            
        }
        return auxNewInspections;
    }

    const getOldInspections = (numberOfOldInspections) => {
        let oldInspectionsAux = [];
        if(numberOfOldInspections){
            oldInspectionsAux=oldInspections
        }
        return oldInspectionsAux;
    }

    const handleInspectionsChanges = (array,index,value,attribute,state) => {
        attribute === "Date" ?
        array[index].inspectionDate = value
        :
        array[index].inspectionComments = value;
        if(state === "New"){
        setNewInspections(array);
        setHasChanged(true);
        }else{
        setOldInspections(array);
        setHasChanged(true);
        }
    }

    const resetVariables = () => {
        setReloadResource(true);
        setIsVisibleModal(false);
        setHasChanged(false);
        setNewInspections([]);
        setOldInspections([]);
        setInputs(0);
    }

    const getRequestData = () => {
    let requestData = [];
    requestData = [...oldInspections,...newInspections];
    return requestData
    }

    useEffect(() => {
    if(inspections){
        setOldInspections(inspections);
        setInspectionsLength(inspections.length);
    }else{
        setOldInspections([]);
        setInspectionsLength(0);
    }
    }, [inspections])

    useEffect(() => {
        setNewInspections([]);
        setInputs(0);
        setHasChanged(false);
    }, [resourceId])

    
    return(
        <div
        className="inspection-modal"
        >
        <InspectionsPerformed
        getOldInspections={getOldInspections}
        inspectionsLength={inspectionsLength}
        handleInspectionsChanges={handleInspectionsChanges}
        handleDeleteInspection={handleDeleteInspection}
        />
        <NewInspectionsAdded
        handleInspectionsChanges={handleInspectionsChanges}
        getNewInspections={getNewInspections}
        inputs={inputs}
        handleDeleteInspection={handleDeleteInspection}
        />
        <Button
        type="primary"
        onClick={handleAddInput}
        className="inspection-modal__add-input"
        >
        <PlusOutlined />
        </Button>
        <div>
        {hasChanged ?
        <Button
        type="primary"
        onClick={updateResource}
        className="inspection-modal__submit"
        >
        Actualizar recurso
        </Button>
        :
        null}
        </div>
        </div>
    )
}

function InspectionsPerformed(props){
    const 
    {getOldInspections,
    inspectionsLength,
    handleInspectionsChanges,
    handleDeleteInspection
    }=props;
    const {TextArea}=Input;
    let auxOldInspections = getOldInspections(inspectionsLength);
    
    return(
        <div>
        {auxOldInspections.map((inspection,index) => {
        const {inspectionDate,inspectionComments}=inspection;
        const formattedDate = moment(inspectionDate);
        
        return(
        <div>
        <DatePicker
        className="inspection-modal__picker"
        allowClear={false}
        value={formattedDate}
        onChange={(e,value) => 
        handleInspectionsChanges(auxOldInspections,
            index,value,"Date","Old")}
        />

        <Button
        className="inspection-modal__delete"
        type="danger"
        onClick={() => handleDeleteInspection(auxOldInspections,
            index,"Old")}
        >{<DeleteOutlined/>}
        </Button>

        <TextArea
        className="inspection-modal__textArea"
        value={inspectionComments}
        onChange={e => 
        handleInspectionsChanges(auxOldInspections,
            index,e.target.value,"Comments","Old")
        }          
        />
        </div>
        )
        })}
        </div>
    )
}

function NewInspectionsAdded(props){
    const {TextArea}=Input;
    const 
    {handleInspectionsChanges,
    getNewInspections,
    inputs,
    handleDeleteInspection
    }=props;

    let newInspectionsAux = getNewInspections(inputs);

    return(
        <div>
        {newInspectionsAux.map((newInspection,index) => {
        
        return(
        <div>
        <DatePicker
        className="inspection-modal__picker"
        allowClear={false}
        onChange={(e,value) => 
        handleInspectionsChanges(newInspectionsAux,
            index,value,"Date","New")}
        />

        <Button
        className="inspection-modal__delete"
        type="danger"
        onClick={()=>handleDeleteInspection(newInspectionsAux,index,"New")}
        >
        {<DeleteOutlined/>}
        </Button>

        <TextArea
        className="inspection-modal__textArea"
        onChange={e => 
        handleInspectionsChanges(newInspectionsAux,
            index,e.target.value,"Comments","New")
        }          
        />
        </div>
        )
        })}
        </div>
    )
    }