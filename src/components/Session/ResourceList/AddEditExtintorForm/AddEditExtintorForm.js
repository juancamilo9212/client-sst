import React,{useState,useEffect} from 'react';
import './AddEditExtintorForm.scss';
import {Form, Button, Input , 
    Select, DatePicker, Row, Col,
 notification}from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import {getUserId} from '../../../../api/auth';
import {addExtintorApi,updateExtintorApi} from '../../../../api/extintors';


export default function AddEditExtintorForm(props) {
    const {
        setReloadResource,
        setIsVisibleModal,
        setOption,
        extintor} = props;
    const [extintorData, setExtintorData] = useState({});

    useEffect(() => {
      extintor ? setExtintorData(extintor):setExtintorData({})  
    }, [extintor])
    
    const createExtintor = () => {
        const userId=getUserId();
        addExtintorApi(userId,extintorData).then(response => {
            notification["success"]({
                message:"El extintor fue creado exitosamente"
            });
            setReloadResource(true);
            setIsVisibleModal(false);
            setExtintorData({});
            setOption("Extintor");
        }).catch(err => {
            notification["error"]({
                message:err
            })
        })
    }

    const updateExtintor = () => {
        const {_id} = extintor;
        updateExtintorApi(_id,extintorData).then(response => {
            notification["success"]({
                message:"El extintor fue actualizado exitosamente"
            });
            setReloadResource(true);
            setIsVisibleModal(false);
            setExtintorData({});
            setOption("Extintor");
        }).catch(err => {
            notification["error"]({
                message:err
            })
        })
    }
    
    return (
       <ExtintorForm
        extintorData={extintorData}
        setExtintorData={setExtintorData}
        extintor={extintor}
        createExtintor={createExtintor}
        updateExtintor={updateExtintor}
       /> 
    )
}

function ExtintorForm(props){
const {extintorData,
    setExtintorData,
    extintor,
    createExtintor,
    updateExtintor}=props;
const {Item} = Form;
const {Option} = Select;
const dateFormat="MM/YYYY";
const{
serialNumber,
kindOfAgent,
loadDate,
nextLoadDate,
company,
location
}=extintorData;
const formattedLoadDate=moment(loadDate);
const formattedNextLoadDate=moment(nextLoadDate);

return(
    <Form
    className="extintor-fom"
    layout="vertical"
    onSubmitCapture={extintor ? updateExtintor:createExtintor}
    >
        <Row
        className="extintor-form__row"
        >
            <Col span={12}>
            <Item
            label="Consecutivo"
            >
            <Input
            className="extintor-form__row-input"
            placeholder='Ingrese el consecutivo'
            value={serialNumber}
            onChange={e => setExtintorData({...extintorData,serialNumber:e.target.value})}
            ></Input>
            </Item>
            </Col>

            <Col span={12}>
            <Item
            label="Tipo de agente"
            >
            <Select
            className="extintor-form__row-input"
            placeholder="Seleccione un agente"
            value={kindOfAgent}
            onChange={e => setExtintorData({...extintorData,kindOfAgent:e})}
            >
            <Option value="PQS: Polvo químico seco">
            PQS: Polvo químico seco
            </Option>
            <Option value="H2O: Agua">
            H2O: Agua
            </Option>
            <Option value="CO2: Dióxido de carbono">
            CO2: Dióxido de carbono
            </Option>
            </Select>
            </Item>
            </Col>

            <Col span={12}>
                    <Item 
                    label="Fecha de recarga"
                    >
                        <DatePicker
                        allowClear={false}
                        value={moment(formattedLoadDate,dateFormat)}
                        onChange={(e,value) => 
                        setExtintorData({...extintorData,
                        loadDate:value
                        })
                        }
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item 
                    label="Fecha de próxima recarga"
                    >
                        <DatePicker
                        allowClear={false}
                        value={moment(formattedNextLoadDate,dateFormat)}
                        onChange={(e,value) => 
                        setExtintorData({...extintorData,
                            nextLoadDate:value
                        })
                        }
                        />
                    </Item>
                </Col>

                <Col span={12}>
            <Item
            label="Empresa"
            >
            <Input
            className="extintor-form__row-input"
            placeholder='Ingrese la empresa'
            value={company}
            onChange={e => setExtintorData({...extintorData,company:e.target.value})}
            ></Input>
            </Item>
            </Col>

            <Col span={12}>
            <Item
            label="Ubicación"
            >
            <Input
            className="extintor-form__row-input"
            placeholder='Ingrese la ubicación'
            value={location}
            onChange={e => setExtintorData({...extintorData,location:e.target.value})}
            ></Input>
            </Item>
            </Col>

            <Col span={24}>
                    <Button
                    type='primary'
                    htmlType='submit'
                    className='extintor-form__row-submit'
                    >{extintor ? "Actualizar":"Crear"}</Button>
            </Col>
        </Row>
    </Form>
)
}