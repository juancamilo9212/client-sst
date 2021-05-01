import React,{useEffect,useState} from 'react';
import './AddEditBotiquinFom.scss';
import {Form, 
Button, 
Input , 
Row, 
Col,
Switch,
notification
}from 'antd';
import {
addBotiquinesApi,
updateBotiquinesApi
}from '../../../../api/botiquines';
import {getUserId} from '../../../../api/auth'

export default function AddEditBotiquinForm(props) {

const {
setReloadResource,
setIsVisibleModal,
setOption,
botiquin
} = props;

const initialState={
company:"",
location:"",
guanteNitrilo:{
isEnabled:true,
quantity:0
},
tapabocas:{
isEnabled:true,
quantity:0
},
aguaDestilada:true,
solucionSalina:true,
jabonAntiseptico:true,
gasa:true,
mantaTermica:{
isEnabled:true,
quantity:0
},
curas:{
isEnabled:true,
quantity:0
},
bajalenguas:{
isEnabled:true,
quantity:0
},
parcheOcular:{
isEnabled:true,
quantity:0
},
tijeras:{
isEnabled:true,
quantity:0
}, 
micropore:true,
vendas:true
}

const [botiquinData, setBotiquinData] = useState({});

useEffect(() => {
botiquin ? 
setBotiquinData(botiquin):
setBotiquinData({});
}, [botiquin])

const resetData = () => {
    setReloadResource(true);
    setIsVisibleModal(false);
    setBotiquinData({});
    setOption("Botiquin");
}

const getBotiquinData = () => {
    let auxBotiquinData;
    if(botiquin){
        auxBotiquinData=botiquin;
    }else{
        auxBotiquinData=initialState;
    }
    //setBotiquinData(auxBotiquinData);
    return auxBotiquinData;
}

const createBotiquin = () => {
const userId=getUserId();
addBotiquinesApi(userId,botiquinData).then(response => {
    notification["success"]({
        message:"El botiquin se creó exitosamente"
    });
    resetData();
}).catch(err => {
    notification["error"]({
        message:err
    });
})
}

const updateBotiquin = () => {
    const {_id} = botiquin;
    updateBotiquinesApi(_id,botiquinData).then(response => {
        notification["success"]({
            message:"El botiquin se actualizó exitosamente"
        });
        resetData();
    }).catch(err => {
        notification["error"]({
            message:err
        });
    })
}

const handleEnabled = (component,attribute,value) => {
    if(attribute === 'isEnabled'){
        component.isEnabled=value;
        if(!component.isEnabled){
            component.quantity=0;
        }
    }else{
        if(component.isEnabled){
            component.quantity=value.target.value;
        }
        
    }
}

const handleComponent = (
    name,
    component,
    value,
    attribute   
    ) => {
    const emptyState = {
        isEnabled:true,
        quantity:0
    }
    switch (name) {
    
        case "guanteNitrilo":
        
        let guanteNitrilo;
    
        component ?
        guanteNitrilo=component
        :
        guanteNitrilo= emptyState
        
        handleEnabled(guanteNitrilo,attribute,value);

        setBotiquinData({
        ...botiquinData,
        guanteNitrilo:guanteNitrilo
        })
        break;

        case "tapabocas":
        let tapabocas;
        component ?
        tapabocas=component
        :
        tapabocas= emptyState
        
        handleEnabled(tapabocas,attribute,value)

        setBotiquinData({
        ...botiquinData,
        tapabocas:tapabocas
        })
        break;

        case "mantaTermica":
        let mantaTermica;
        component ?
        mantaTermica=component
        :
        mantaTermica= emptyState
        
        handleEnabled(mantaTermica,attribute,value);

        setBotiquinData({
        ...botiquinData,
        mantaTermica:mantaTermica
        })
        break;

        case "curas":
            let curas;
            component ?
            curas=component
            :
            curas= emptyState
            
            handleEnabled(curas,attribute,value);
    
            setBotiquinData({
            ...botiquinData,
            curas:curas
            })
        break;

        case "bajalenguas":
        let bajalenguas;
            component ?
            bajalenguas=component
            :
            bajalenguas= emptyState
            
            handleEnabled(bajalenguas,attribute,value);
    
            setBotiquinData({
            ...botiquinData,
            bajalenguas:bajalenguas
            })
        break;
        
        case "parcheOcular":
            let parcheOcular;
            component ?
            parcheOcular=component
            :
            parcheOcular= emptyState
            
            handleEnabled(parcheOcular,attribute,value);
    
            setBotiquinData({
            ...botiquinData,
            parcheOcular:parcheOcular
            })
        break;

        case "tijeras":
            let tijeras;
            component ?
            tijeras=component
            :
            tijeras= emptyState
            
            handleEnabled(tijeras,attribute,value);
    
            setBotiquinData({
            ...botiquinData,
            tijeras:tijeras
            })
        break;
    
        default:
        break;
    }
}

    return (
        <BotiquinForm
        botiquinData={botiquinData}
        setBotiquinData={setBotiquinData}
        createBotiquin={createBotiquin}
        updateBotiquin={updateBotiquin}
        botiquin={botiquin}
        handleComponent={handleComponent}
        getBotiquinData={getBotiquinData}
        />
    )
}

function BotiquinForm(props) {
const {
botiquinData,
setBotiquinData,
createBotiquin,
updateBotiquin,
botiquin,
handleComponent
} = props;

const {
company,
location,
guanteNitrilo,
tapabocas,
aguaDestilada,
solucionSalina,
jabonAntiseptico,
gasa,
mantaTermica,
curas,
bajalenguas,
parcheOcular,
tijeras, 
micropore,
vendas
} = botiquinData

const {Item} = Form;

return (
<Form
className="botiquin-form"
layout="vertical"
onSubmitCapture={botiquin ? updateBotiquin:createBotiquin}
>

    <Row
    className="botiquin-form__row"
    >
        <Col
        span={12}
        >
        <Item
        label="Empresa"
        >
            <Input
            className="botiquin-form__row-input"
            placeholder='Ingrese la empresa'
            value={company}
            onChange={e => setBotiquinData({...botiquinData,company:e.target.value})}
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
            className="botiquin-form__row-input"
            placeholder='Ingrese la ubicación'
            value={location}
            onChange={e => setBotiquinData({...botiquinData,location:e.target.value})}
            ></Input>
        </Item>
        </Col>
    

    <Col
        span={6}
        >
        <Item
        label="Guante Nitrilo"
        >
            <Input
            className="botiquin-form__row-quantity"
            value={guanteNitrilo ? guanteNitrilo.quantity : null}
            onChange={e => handleComponent("guanteNitrilo",guanteNitrilo,e,"quantity")}
            ></Input>
        </Item>
    </Col>

        <Col
        span={6}
        >
        <Item
        label="Tapabocas"
        >
            <Input
            className="botiquin-form__row-quantity"
            value={tapabocas ? tapabocas.quantity : null}
            onChange={e => handleComponent("tapabocas",tapabocas,e,"quantity")}
            ></Input>
        </Item>
    </Col>

    <Col
        span={6}
        >
        <Item
        label="Manta Térmica"
        >
            <Input
            className="botiquin-form__row-quantity"
            value={mantaTermica ? mantaTermica.quantity:null}
            onChange={e => handleComponent("mantaTermica",mantaTermica,e,"quantity")}
            ></Input>
        </Item>
    </Col>

    <Col
        span={6}
        >
        <Item
        label="Curas"
        >
            <Input
            className="botiquin-form__row-quantity"
            value={curas ? curas.quantity:null}
            onChange={e => handleComponent("curas",curas,e,"quantity")}
            ></Input>
        </Item>
    </Col>

    <Col
        span={6}
        >
        <Item
        >
            <Switch
            className="botiquin-form__row-switch"
            defaultChecked
            value={guanteNitrilo ? guanteNitrilo.isEnabled: null}
            onChange={e => handleComponent("guanteNitrilo",guanteNitrilo,e,"isEnabled")}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={6}
        >
        <Item
        >
            <Switch
            className="botiquin-form__row-switch"
            defaultChecked
            value={tapabocas ?tapabocas.isEnabled:null}
            onChange={e => handleComponent("tapabocas",tapabocas,e,"isEnabled")}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={6}
        >
        <Item
        >
            <Switch
            className="botiquin-form__row-switch"
            defaultChecked
            value={mantaTermica ? mantaTermica.isEnabled:null}
            onChange={e => handleComponent("mantaTermica",mantaTermica,e,"isEnabled")}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={6}
        >
        <Item
        >
            <Switch
            className="botiquin-form__row-switch"
            defaultChecked
            value={curas ? curas.isEnabled: null}
            onChange={e => handleComponent("curas",curas,e,"isEnabled")}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        label="Parche Ocular"
        >
            <Input
            className="botiquin-form__row-quantity"
            value={parcheOcular ? parcheOcular.quantity:null}
            onChange={e => handleComponent("parcheOcular",parcheOcular,e,"quantity")}
            ></Input>
        </Item>
    </Col>

        <Col
        span={8}
        >
        <Item
        label="Baja Lenguas"
        >
            <Input
            className="botiquin-form__row-quantity"
            value={bajalenguas ? bajalenguas.quantity:null}
            onChange={e => handleComponent("bajalenguas",bajalenguas,e,"quantity")}
            ></Input>
        </Item>
    </Col>

    <Col
        span={8}
        >
        <Item
        label="Tijeras"
        >
            <Input
            className="botiquin-form__row-quantity"
            value={tijeras ? tijeras.quantity:null}
            onChange={e => handleComponent("tijeras",tijeras,e,"quantity")}
            ></Input>
        </Item>
    </Col>

    <Col
        span={8}
        >
        <Item
        >
            <Switch
            className="botiquin-form__row-switch"
            defaultChecked
            value={parcheOcular ? parcheOcular.isEnabled:null}
            onChange={e => handleComponent("parcheOcular",parcheOcular,e,"isEnabled")}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        >
            <Switch
            className="botiquin-form__row-switch"
            defaultChecked
            value={bajalenguas ? bajalenguas.isEnabled:null}
            onChange={e => handleComponent("bajalenguas",bajalenguas,e,"isEnabled")}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        >
            <Switch
            className="botiquin-form__row-switch"
            defaultChecked
            value={tijeras ? tijeras.isEnabled: null}
            onChange={e => handleComponent("tijeras",tijeras,e,"isEnabled")}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        label="Agua Destilada"
        >
            <Switch
            defaultChecked
            value={aguaDestilada ? aguaDestilada.isEnabled:null}
            onChange={e => setBotiquinData({...botiquinData,aguaDestilada:e})}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        label="Solución Salina"
        >
            <Switch
            defaultChecked
            value={solucionSalina ? solucionSalina.isEnabled:null}
            onChange={e => setBotiquinData({...botiquinData,solucionSalina:e})}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        label="Jabon Antiseptico"
        >
            <Switch
            defaultChecked
            value={jabonAntiseptico ? jabonAntiseptico.isEnabled:null}
            onChange={e => setBotiquinData({...botiquinData,jabonAntiseptico:e})}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        label="Gasa"
        >
            <Switch
            defaultChecked
            value={gasa ? gasa.isEnabled:null}
            onChange={e => setBotiquinData({...botiquinData,gasa:e})}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        label="Micropore"
        >
            <Switch
            defaultChecked
            value={micropore ? micropore.isEnabled:null}
            onChange={e => setBotiquinData({...botiquinData,micropore:e})}
            >
            </Switch>
        </Item>
        </Col>

        <Col
        span={8}
        >
        <Item
        label="Vendas"
        >
            <Switch
            defaultChecked
            value={vendas ? vendas.isEnabled:null}
            onChange={e => setBotiquinData({...botiquinData,vendas:e})}
            >
            </Switch>
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
        {botiquin ? "Actualizar":"Crear"}
        </Button>
        </Col>

        </Row>
</Form>
)

}
