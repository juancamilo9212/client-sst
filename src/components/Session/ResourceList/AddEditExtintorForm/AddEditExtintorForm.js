import React,{useState} from 'react';
import './AddEditExtintorForm.scss';
import {Form, Button, Input , 
    Select, DatePicker, Row, Col,
 notification}from 'antd';
import moment from 'moment';
import 'moment/locale/es';


export default function AddEditExtintorForm(props) {
    const {
        setReloadResource,
        setIsVisibleModal,
        extintor} = props;
    const [extintorData, setExtintorData] = useState({});
    console.log(extintorData);
    
    return (
       <ExtintorForm
        extintorData={extintorData}
        setExtintorData={setExtintorData}
        extintor={extintor}
       /> 
    )
}

function ExtintorForm(props){
const {extintorData,setExtintorData,extintor}=props;
const {Item} = Form;
const {Option} = Select;
const dateFormat="MM/YYYY";

return(
    <Form
    className="extintor-fom"
    layout="vertical"
    //onSubmitCapture={accident ? updateAccident:createAccident}
       
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
            value={extintorData.serialNumber}
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
            value={extintorData.kindOfAgent}
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
                        value={extintor?
                            moment(moment(extintorData.loadDate),dateFormat)
                            :
                            ""
                        }
                        onChange={(e,value) => 
                        setExtintorData({...extintorData,
                        loadDate:moment(value).format(dateFormat)
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
                        value={extintor?
                            moment(moment(extintorData.nextLoadDate),dateFormat)
                            :
                            ""
                        }
                        onChange={(e,value) => 
                        setExtintorData({...extintorData,
                            nextLoadDate:moment(value).format(dateFormat)
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
            value={extintorData.company}
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
            value={extintorData.location}
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