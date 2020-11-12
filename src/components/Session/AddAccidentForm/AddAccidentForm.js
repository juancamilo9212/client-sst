import React,{useState} from 'react';
import './AddAccidentForm.scss';
import {Form, Button, Input , Switch, 
    Select, DatePicker, Row, Col,
Upload, message}from 'antd';
import {CheckOutlined, CloseOutlined, InboxOutlined} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/es';

export default function AddAccidentForm() {
    const dateFormat='M-D-YYYY hh:mm:ss'
    const {Item} = Form;
    const {TextArea} = Input;
    const {Option} = Select;
    const {Dragger} = Upload;
    const [accidentData, setAccidentData] = useState({
    name: "",
    lastName: "",
    idNumber:"",
    company:"",
    eventDate:null,
    arrivalDate:null,
    area:"",
    bodyPartAffected:"",
    description:"",
    accidentVersion:"",
    witness:true,
    witnessName:"",
    witnessIdNumber:"",
    additionalComments:"",
    reporterName:"",
    brigadeMember:"",
    accidentType:"",
    researched:true,
    researcherName:"",
    researchDate:null,
    actionPlan:"",
    actionExecutionDate:null,
    state:true,
    images:[],
    actionPlanImages:[],
    })

    const properties = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    },
    }

    const createAccident = () =>{
        console.log(accidentData);
        
    }

    return (
        <Form 
        className="new-accident-form"
        layout="vertical"
        onSubmitCapture={createAccident}
        >
            <Row className="new-accident-form__row">
                <Col span={8}>
                    <Item 
                    name="name"
                    label="Nombre"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese el nombre'
                        value={accidentData.name}
                        onChange={e => setAccidentData({...accidentData,name:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="lastName"
                    label="Apellido"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese el apellido'
                        value={accidentData.lastName}
                        onChange={e => setAccidentData({...accidentData,lastName:e.target.value})}
                        
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="idNumber"
                    label="Cédula"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese la CC'
                        value={accidentData.idNumber}
                        onChange={e => setAccidentData({...accidentData,idNumber:e.target.value})}
                        
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="company"
                    label="Empresa"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese la empresa'
                        value={accidentData.company}
                        onChange={e => setAccidentData({...accidentData,company:e.target.value})}
                        
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="area"
                    label="Área"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese el área a la que pertenece'
                        value={accidentData.area}
                        onChange={e => setAccidentData({...accidentData,area:e.target.value})}
                        
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="bodyPartAffected"
                    label="Parte del cuerpo afectada"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese la PCA'
                        value={accidentData.bodyPartAffected}
                        onChange={e => setAccidentData({...accidentData,bodyPartAffected:e.target.value})}
                        
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item 
                    name="eventDate"
                    label="Fecha y hora del accidente"
                    >
                        <DatePicker
                        showTime
                        defaultValue={accidentData.eventDate ? moment(accidentData.eventDate, dateFormat):""}
                        onChange={e => setAccidentData({...accidentData,eventDate:moment(e._d).format(dateFormat)})}
                        
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item 
                    name="arrivalDate"
                    label="Fecha y hora de entrada"
                    >
                        <DatePicker
                        showTime
                        />
                    </Item>
                </Col>

                

                <Col span={24}>
                    <Item 
                    name="description"
                    label="Descripción del accidente"
                    >
                        <TextArea
                        placeholder='Describa el evento'
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    name="accidentVersion"
                    label="Version del colaborador"
                    >
                        <TextArea
                        placeholder='Describa el evento'
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="witness"
                    label="Testigos del accidente"
                    >
                        <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        style={{width:"80px"}}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="witnessName"
                    label="Nombre del testigo"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese el nombre'
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="witnessIdNumber"
                    label="Cédula del testigo"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese la cédula'
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    name="additionalComments"
                    label="Comentarios adicionales"
                    >
                        <TextArea
                        placeholder='Comentario adicional'
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="reporterName"
                    label="Nombre de quién reporta"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        defaultValue='Viviana Mejía'
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="brigadeMember"
                    label="Brigadista que atiende"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingresa el nombre'
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="accidentType"
                    label="Tipo de accidente"
                    >
                        <Select
                        defaultValue="Accidente de trabajo"
                        >
                            <Option value="Accidente de trabajo">
                                Accidente de trabajo
                            </Option>
                            <Option value="Incidente de trabajo">
                                Incidente de trabajo
                            </Option>
                            <Option value="Condición insegura">
                                Condición insegura
                            </Option>
                            <Option value="Acto inseguro">
                                Acto inseguro
                            </Option>
                        </Select>
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="researched"
                    label="Investigado"
                    >
                        <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        style={{width:"80px"}}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="researchDate"
                    label="Fecha y hora de la investigación"
                    >
                        <DatePicker
                        showTime
                        />
                    </Item>
                </Col>


                <Col span={8}>
                    <Item 
                    name="actionExecutionDate"
                    label="Fecha plan de acción"
                    >
                        <DatePicker/>
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="state"
                    label="Estado"
                    >
                        <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        style={{width:"80px"}}
                        />
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    name="actionPlan"
                    label="Plan de acción"
                    >
                        <TextArea
                        placeholder='Describa el plan de acción'
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    name="images"
                    label="Imágenes del accidente"
                    >
                        <Dragger {...properties}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Haga click o arrastre para cargar el archivo</p>
                        </Dragger>
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    name="actionPlanImages"
                    label="Imágenes del plan de acción"
                    >
                        <Dragger {...properties}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Haga click o arrastre para cargar el archivo</p>
                        </Dragger>
                    </Item>
                </Col>

                <Button
                type='primary'
                htmlType='submit'
                className='new-accident-form__submit'
                >
                Crear accidente
                </Button>

            </Row>
        </Form>
    )
}
