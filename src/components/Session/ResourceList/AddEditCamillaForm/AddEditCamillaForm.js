import React,{useState,useEffect} from 'react';
import './AddEditCamillaForm.scss';
import {Form, 
Button, 
Input , 
Row, 
Col,
Select,
notification
}from 'antd';
import {
addCamillaApi,
updateCamillaApi
} from '../../../../api/camilla';
import {getUserId} from '../../../../api/auth';

export default function AddCamillaForm(props) {
    const {
    camilla,
    setReloadResource,
    setIsVisibleModal,
    setOption
    }=props;

    const [camillaData, setCamillaData] = useState({});

    

    useEffect(() => {
    camilla ?
    setCamillaData(camilla):
    setCamillaData({});
    }, [camilla])

    const resetData = () => {
        setReloadResource(true);
        setIsVisibleModal(false);
        setCamillaData({});
        setOption("Camilla");
    }

    const createCamilla = () => {
    const userId = getUserId();
    addCamillaApi(userId,camillaData).then(response => {
        notification["success"]({
            message:"La camilla ha sido creada exitosamente"
        });
        resetData();
    }).catch(err => {
        notification["error"]({
        message:err
        });  
    })
    }

    const updateCamilla = () => {
    const {_id} = camilla;
    updateCamillaApi(_id,camillaData).then(response => {
        notification["success"]({
            message:"La camilla ha sido actualizada exitosamente"
        });
        resetData();
    }).catch(err => {
        notification["error"]({
        message:err
        });  
    })
    }

    return (
        <CamillaForm
        camilla={camilla}
        camillaData={camillaData}
        setCamillaData={setCamillaData}
        createCamilla={createCamilla}
        updateCamilla={updateCamilla}
        />
    )
}

function CamillaForm(props) {
const {
camilla,
camillaData,
setCamillaData,
createCamilla,
updateCamilla
}=props;

const {
company,
location,
araña,
hebillas,
cabecera,
pasta,
tela,
soporte
}=camillaData;

const {Item} = Form;
const {Option} = Select;

return(
<Form
className="camilla-form"
layout="vertical"
onSubmitCapture={camilla ? updateCamilla:createCamilla}
>

<Row
className="camilla-form__row"
>
<Col
        span={12}
        >
        <Item
        label="Empresa"
        >
            <Input
            className="camilla-form__row-input"
            placeholder='Ingrese la empresa'
            value={company}
            onChange={e => 
            setCamillaData({...camillaData,company:e.target.value})}
            ></Input>
        </Item>
        </Col>

        <Col
        span={12}
        >
        <Item
        label="Ubicación"
        >
            <Input
            className="camilla-form__row-input"
            placeholder='Ingrese la ubicación'
            value={location}
            onChange={e => 
            setCamillaData({...camillaData,location:e.target.value})}
            ></Input>
        </Item>
        </Col>

        <Col
        span={12}
        >
        <Item
        label="Araña"
        >
            <Select
            showSearch
            style={{ width: 250, fontSize:"16px"}}
            placeholder="Estado de la araña"
            optionFilterProp="children"
            value={araña}
            onChange={e => 
            setCamillaData({...camillaData,araña:e})}
            >
            <Option value="bueno">Bueno</Option>
            <Option value="regular">Regular</Option>
            <Option value="malo">Malo</Option>
            <Option value="no aplica">N/A</Option>
            </Select>
        </Item>
        </Col>

        <Col
        span={12}
        >
        <Item
        label="Cabecera"
        >
            <Select
            showSearch
            style={{ width: 250, fontSize:"16px"}}
            placeholder="Estado de la cabecera"
            optionFilterProp="children"
            value={cabecera}
            onChange={e => 
            setCamillaData({...camillaData,cabecera:e})}
            >
            <Option value="bueno">Bueno</Option>
            <Option value="regular">Regular</Option>
            <Option value="malo">Malo</Option>
            <Option value="no aplica">N/A</Option>
            </Select>
        </Item>
        </Col>

        <Col
        span={12}
        >
        <Item
        label="Hebillas"
        >
            <Select
            showSearch
            style={{ width: 250, fontSize:"16px"}}
            placeholder="Estado de las hebillas"
            optionFilterProp="children"
            value={hebillas}
            onChange={e => 
            setCamillaData({...camillaData,hebillas:e})}
            >
            <Option value="bueno">Bueno</Option>
            <Option value="regular">Regular</Option>
            <Option value="malo">Malo</Option>
            <Option value="no aplica">N/A</Option>
            </Select>
        </Item>
        </Col>

        <Col
        span={12}
        >
        <Item
        label="Pasta"
        >
            <Select
            showSearch
            style={{ width: 250, fontSize:"16px"}}
            placeholder="Estado de la pasta"
            optionFilterProp="children"
            value={pasta}
            onChange={e => 
            setCamillaData({...camillaData,pasta:e})}
            >
            <Option value="bueno">Bueno</Option>
            <Option value="regular">Regular</Option>
            <Option value="malo">Malo</Option>
            <Option value="no aplica">N/A</Option>
            </Select>
        </Item>
        </Col>

        <Col
        span={12}
        >
        <Item
        label="Tela"
        >
            <Select
            showSearch
            style={{ width: 250, fontSize:"16px"}}
            placeholder="Estado de la tela"
            optionFilterProp="children"
            value={tela}
            onChange={e => 
            setCamillaData({...camillaData,tela:e})}
            >
            <Option value="bueno">Bueno</Option>
            <Option value="regular">Regular</Option>
            <Option value="malo">Malo</Option>
            <Option value="no aplica">N/A</Option>
            </Select>
        </Item>
        </Col>

        <Col
        span={12}
        >
        <Item
        label="Soporte"
        >
            <Select
            showSearch
            style={{ width: 250, fontSize:"16px"}}
            placeholder="Estado del soporte"
            optionFilterProp="children"
            value={soporte}
            onChange={e => 
            setCamillaData({...camillaData,soporte:e})}
            >
            <Option value="bueno">Bueno</Option>
            <Option value="regular">Regular</Option>
            <Option value="malo">Malo</Option>
            <Option value="no aplica">N/A</Option>
            </Select>
        </Item>
        </Col>

        <Col
        span={24}
        >
        <Button
        type='primary'
        htmlType='submit'
        className='botiquin-form__row-submit'
        >
        {camilla ? "Actualizar":"Crear"}
        </Button>
        </Col>
</Row>
</Form>
)
}
