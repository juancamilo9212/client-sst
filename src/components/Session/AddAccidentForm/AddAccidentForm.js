import React from 'react';
import './AddAccidentForm.scss';
import {Form, Button, Input , Switch, 
    Select, DatePicker, Row, Col}from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

export default function AddAccidentForm() {

    const {Item} = Form;
    const {TextArea} = Input;
    const {Option} = Select;
    return (
        <Form 
        className="new-accident-form"
        layout="vertical"
        //onSubmitCapture
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
                        //value=
                        //onChange
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
                        //value=
                        //onChange
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
                        //value=
                        //onChange
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
                        //value=
                        //onChange
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
                        //value=
                        //onChange
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
                        //value=
                        //onChange
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="eventDate"
                    label="Fecha y hora del accidente"
                    >
                        <DatePicker
                        showTime
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    name="arrivalDate"
                    label="Fecha y hora de entrada"
                    >
                        <DatePicker
                        showTime
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
                        //value=
                        //onChange
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

            </Row>

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


           
        </Form>
    )
}
