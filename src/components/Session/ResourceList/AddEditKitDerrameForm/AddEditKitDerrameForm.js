import React,
{useState,
useEffect
} from 'react';

import {
Form, 
Button, 
Input , 
DatePicker, 
Row, 
Col,
notification
} from 'antd';

import moment from 'moment';
import 'moment/locale/es';
import {getUserId} from '../../../../api/auth';
import './AddEditKitDerrameForm.scss';
import {
PlusOutlined,
DeleteOutlined
} from '@ant-design/icons';
import 
{
addKitDerrameApi,
updateKitDerrameApi
}from '../../../../api/kitDerrame';

export default function AddEditKitDerrameForm(props) {
    const {
    setReloadResource,
    setIsVisibleModal,
    kitDerrame,
    setOption
    }=props;
    
    const [kitDerrameData, setKitDerrameData] = useState({});
    const [newComponents, setNewComponents] = useState([]);
    const [oldComponents,setOldComponents]=useState([]);
    const [oldKits, setOldKits] = useState(0);
    const [inputs, setInputs] = useState(0);
   
    
    const getNewComponents = (numberOfComponents) => {
    const newEmptyKit={
        component:null,
        expirationDate:null
    }

    let auxNewComponents;
    if(!newComponents){
        auxNewComponents=[]
    }else{
        auxNewComponents=newComponents;
        for (let index = auxNewComponents.length; 
            index < numberOfComponents; 
            index++) {
            auxNewComponents.push(newEmptyKit);    
        }
    }
    setNewComponents(auxNewComponents);
    return auxNewComponents;
    }

    const handleAddInput = () => {
        setInputs(inputs+1);
    }

    useEffect(() => {
        kitDerrame ?
        setKitDerrameData(kitDerrame):
        setKitDerrameData({});
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kitDerrame])

    useEffect(() => {
        setNewComponents([]);
    }, [kitDerrame])

    useEffect(() => {
        kitDerrame?
        setOldComponents(kitDerrame.components):
        setOldComponents([]);
    }, [kitDerrame])

    const createKitDerrame = () => {
        const kitData={
            ...kitDerrameData,
            components:newComponents
        }
        const userId=getUserId();
        addKitDerrameApi(userId,kitData).then(response => {
            notification["success"]({
                message:"El kit fue creado correctamente"
            });
            setReloadResource(true);
            setIsVisibleModal(false);
            setKitDerrameData({});
            setNewComponents([]);
            setInputs(0);
            setOption("Kit Derrame");
        }).catch(err => {
            notification["error"]({
                message:err
            });
        })
        
    }

    const updateKitDerrame = () => {
        const components = [
        ...oldComponents,
        ...newComponents
        ]
        const kitData={
            ...kitDerrameData,
            components:components
        }
        const {_id}=kitDerrameData;
        updateKitDerrameApi(_id,kitData).then(response => {
            notification["success"]({
                message:"El kit fue actualizado correctamente"
            });
            setReloadResource(true);
            setIsVisibleModal(false);
            setKitDerrameData({});
            setNewComponents([]);
            setInputs(0);
            setOption("Kit Derrame");
        }).catch(err => {
            notification["error"]({
                message:err
            });
        })
    }

    const handleChange = (
    array,
    index,
    value,
    attribute
    ) => {
    if(attribute === "Component"){
    array[index].component = value;
    }else{
    array[index].expirationDate = value; 
    }
    setNewComponents(array);
    }

    const handleDelete = (
    array,index,type
    ) => {
        array.splice(index,1);
        if(type === "Old"){
            setOldComponents(array);
            setOldKits(array.length);
        }else{
            setNewComponents(array);
            setInputs(inputs-1);
        }
    }

    return (
        <div
        className="add-edit-form"
        >
        <KitDerrameForm
        kitDerrame={kitDerrame}
        kitDerrameData={kitDerrameData}
        setKitDerrameData={setKitDerrameData}
        createKitDerrame={createKitDerrame}
        updateKitDerrame={updateKitDerrame}
        inputs={inputs}
        getNewComponents={getNewComponents}
        handleChange={handleChange}
        handleAddInput={handleAddInput}
        components={oldComponents}
        handleDelete={handleDelete}
        />
        </div>  
    )
}

function KitDerrameForm(props){
const{
kitDerrameData,
setKitDerrameData,
createKitDerrame,
updateKitDerrame,
inputs,
getNewComponents,
handleChange,
handleAddInput,
components,
kitDerrame,
handleDelete
}=props;

const {Item} = Form;


return(
<Form
className="kitDerrame-fom"
layout="vertical"
onSubmitCapture={
    kitDerrame ? 
    updateKitDerrame:createKitDerrame
    }
>
    <Row>
    <Col span={24}>
            <Item
            label="Consecutivo"
            >
            <Input
            className="kitDerrame-form__row-input"
            placeholder='Ingrese el consecutivo'
            value={kitDerrameData.serialNumber}
            onChange={e => setKitDerrameData({...kitDerrameData,serialNumber:e.target.value})}
            ></Input>
            </Item>
            </Col>

    <Col span={24}>
            <Item
            label="Empresa"
            >
            <Input
            className="kitDerrame-form__row-input"
            placeholder='Ingrese la empresa'
            value={kitDerrameData.company}
            onChange={e => setKitDerrameData({...kitDerrameData,company:e.target.value})}
            ></Input>
            </Item>
        </Col>
    

    <Col span={24}>
            <Item
            label="Ubicación"
            >
            <Input
            className="kitDerrame-form__row-input"
            placeholder='Ingrese la ubicación'
            value={kitDerrameData.location}
            onChange={e => setKitDerrameData({...kitDerrameData,location:e.target.value})}
            ></Input>
            </Item>
        </Col>

        <Col span={24}>
            {
            components?
            <OldComponents
            components={components}
            handleDelete={handleDelete}
            className="kitDerrame-form__components"
            />
           :null
            }
 </Col>

        
        <Col span={24}>
        {
            inputs ?
            <NewComponents
            getNewComponents={getNewComponents}
            newComponents={inputs}
            handleChange={handleChange}
            handleDelete={handleDelete}
            />
            :
            null
        }
        </Col>  

            
        <Col span={24}>
        <Button
        type='primary'
        onClick={handleAddInput}
        className="kitDerrame-form__add"
        >
        <PlusOutlined/>
        </Button>
        </Col>
        
        <Col span={24}>
        <Button
        type='primary'
        htmlType='submit'
        className="kitDerrame-form__submit"
        >
        {kitDerrame ? "Actualizar":"Crear"}
        </Button>
        </Col>
    </Row>
</Form>
)
}

function OldComponents(props){
const {
components,
handleDelete
} = props;
const dateFormat= 'DD/MM/YYYY';
return (
<div>
{
components.map((item,index) => {
    const {component,expirationDate}=item;
    const formattedDate=moment(expirationDate);
       return(
        <div
        className="old-components"
        >
        <h3>
        {`Componente ${index+1} `}
        <Button
        type="danger"
        onClick={
        () => handleDelete(components,index,"Old")
        }
        >
        <DeleteOutlined/>
        </Button>
        </h3>
        <Input
        value={component}
        />
        {
            expirationDate ?
            <DatePicker
            value={formattedDate ?
            moment(formattedDate,dateFormat)
            :""
            }
            />:null
        }
        </div>
        )
       })
}
</div>
)
}

function NewComponents(props){
const {
newComponents,
getNewComponents,
handleChange,
handleDelete
}=props;

const newComponentsAux=getNewComponents(newComponents);
return(
    <div>
        {
            newComponentsAux.map((item,index) => {
                return(
                    <div
                    className="new-components"
                    >
                    <h3>
                    {`Nuevo component ${index+1}`}
                    <Button
                    type="danger"
                    onClick={
                    () => handleDelete(newComponentsAux,index,"New")
                    }
                    >
                    <DeleteOutlined/>
                    </Button>
                    </h3>
                    <Input
                    onChange={e =>
                    handleChange(
                    newComponentsAux,
                    index,
                    e.target.value,
                    "Component"
                    )
                    }
                    />
                    <DatePicker
                    onChange={(e,value) =>
                        handleChange(
                        newComponentsAux,
                        index,
                        value,
                        "Date"
                        )
                    }
                    />
                    </div>
                )
            })
        }
    </div>
)

}
