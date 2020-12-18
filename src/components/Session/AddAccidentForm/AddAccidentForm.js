import React,{useState,useEffect,useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import './AddAccidentForm.scss';
import {Form, Button, Input , Switch, 
    Select, DatePicker, Row, Col,
 notification}from 'antd';
import {CheckOutlined, CloseOutlined, InboxOutlined, DeleteOutlined} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/es';
import {addAccidentApi,updateAccidentApi,
    uploadEventFilesApi,deleteEventFilesApi} from '../../../api/accident';
import {getUserId} from '../../../api/auth';

export default function AddAccidentForm(props) {
    
    const {setReloadAccidents,accident,setIsVisibleModal} = props;
    const [accidentData, setAccidentData] = useState({});
    const [eventFiles, setEventFiles] = useState([]);
    const [actionPlanFiles, setActionPlanFiles] = useState([]);

    const noColabData= 
    !accidentData.name || !accidentData.lastName
    || !accidentData.idNumber || !accidentData.company
     ? 
     true:false;

    const noEventDate= 
    !accidentData.eventDate || !accidentData.arrivalDate ?
    true:false;

    const noEventDescription=
    !accidentData.description || !accidentData.bodyPartAffected ?
    true:false;

    const createAccident = () =>{
        if(noEventDate || noColabData || noEventDescription){
            notification['warning']({
                message:"Hay información obligatoria sin diligenciar"
            });
        }else{
        const userId=getUserId()
        addAccidentApi(userId,accidentData).then(response => {
            notification['success']({
                message:"El accidente se creó correctamente"
            });
            setReloadAccidents(true);
            setIsVisibleModal(false);
            setAccidentData({});
        }).catch(err => {
            notification['error']({
                message:err
            });
        })
        }
    }

    const updateAccident = () => {
        
        if(noEventDate || noColabData || noEventDescription){
            notification['warning']({
                message:"Hay información obligatoria sin diligenciar"
            });
        }else{
            const accidentId=accident._id;
            updateAccidentApi(accidentId,accidentData).then(response => {
                notification['success']({
                    message:"El accidente se actualizó correctamente"
                });
                setReloadAccidents(true);
                setIsVisibleModal(false);
                setEventFiles([]);
                setActionPlanFiles([]);
            }).catch(err => {
                notification['error']({
                    message:err
                });
            })
    }
    }

        useEffect(() => {
            if(accident){
                setAccidentData(accident);
                const {images,actionPlanImages}=accident;
                actionPlanImages ? setActionPlanFiles(actionPlanImages):setActionPlanFiles([]);
                images ? setEventFiles(images):setEventFiles([]);
            }
            
        }, [accident])
    

    useEffect(() => {
            setAccidentData({
                ...accidentData,
                images:eventFiles
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventFiles])

    useEffect(() => {
        setAccidentData({
            ...accidentData,
            actionPlanImages:actionPlanFiles
        })
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [actionPlanFiles])
    
    return (
        <AccidentForm
        accidentData={accidentData}
        setAccidentData={setAccidentData}
        createAccident={createAccident}
        updateAccident={updateAccident}
        accident={accident}
        eventFiles={eventFiles}
        setEventFiles={setEventFiles}
        actionPlanFiles={actionPlanFiles}
        setActionPlanFiles={setActionPlanFiles}
        />
    )
}

function AccidentForm(props){

    const {accidentData,setAccidentData,
    createAccident,updateAccident,accident
    ,eventFiles,setEventFiles,actionPlanFiles,
    setActionPlanFiles}=props;
    const dateFormat='M-D-YYYY hh:mm:ss'
    const {Item} = Form;
    const {TextArea} = Input;
    const {Option} = Select;
    

return(
    <Form 
        className="new-accident-form"
        layout="vertical"
        onSubmitCapture={accident ? updateAccident:createAccident}
        >
            <Row className="new-accident-form__row">
                <Col span={8}>
                    <Item 
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
                    label="Fecha y hora del accidente"
                    >
                        <DatePicker
                        allowClear={false}
                        showTime
                        value={accident?
                            moment(moment(accidentData.eventDate),dateFormat)
                            :
                            ""
                        }
                        onChange={(e,value) => 
                        setAccidentData({...accidentData,
                        eventDate:value
                        })
                        }
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item 
                    label="Fecha y hora de entrada"
                    >
                        <DatePicker
                        allowClear={false}
                        showTime
                        value={accident? 
                            moment(moment(accidentData.arrivalDate),dateFormat)
                            :
                            ""
                        }
                        onChange={(e,value) => 
                        setAccidentData({...accidentData,
                        arrivalDate:value})}/>
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    label="Descripción del accidente"
                    >
                        <TextArea
                        placeholder='Describa el evento'
                        value={accidentData.description}
                        onChange={e => setAccidentData({...accidentData,description:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    label="Version del colaborador"
                    >
                        <TextArea
                        placeholder='Describa el evento'
                        value={accidentData.accidentVersion}
                        onChange={e => setAccidentData({...accidentData,accidentVersion:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Testigos del accidente"
                    >
                        <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        style={{width:"80px"}}
                        checked={accidentData.witness}
                        onChange={e => setAccidentData({...accidentData,witness:e})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Nombre del testigo"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese el nombre'
                        value={accidentData.witnessName}
                        onChange={e => setAccidentData({...accidentData,witnessName:e.target.value})}
                        
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Cédula del testigo"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese la cédula'
                        value={accidentData.witnessIdNumber}
                        onChange={e => setAccidentData({...accidentData,witnessIdNumber:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    label="Comentarios adicionales"
                    >
                        <TextArea
                        placeholder='Comentario adicional'
                        value={accidentData.additionalComments}
                        onChange={e => setAccidentData({...accidentData,additionalComments:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Nombre de quién reporta"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        value={accidentData.reporterName}
                        onChange={e => setAccidentData({...accidentData,reporterName:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Brigadista que atiende"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingresa el nombre'
                        value={accidentData.brigadeMember}
                        onChange={e => setAccidentData({...accidentData,brigadeMember:e.target.value})}
                        
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Tipo de accidente"
                    >
                        <Select
                        defaultValue="Accidente de trabajo"
                        value={accidentData.accidentType}
                        onChange={e => setAccidentData({...accidentData,accidentType:e})}
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
                    label="Investigado"
                    >
                        <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        style={{width:"80px"}}
                        checked={accidentData.researched}
                        onChange={e => setAccidentData({...accidentData,researched:e})}
                        
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Fecha y hora de la investigación"
                    >
                        <DatePicker
                        allowClear={false}
                        showTime
                        value={
                            accident? 
                            moment(moment(accidentData.researchDate),dateFormat)
                            :
                            ""
                        }
                        onChange={(e,value) => 
                        setAccidentData({...accidentData,
                        researchDate:value})}/>
                    </Item>
                </Col>


                <Col span={8}>
                    <Item 
                    label="Fecha plan de acción"
                    >
                        <DatePicker
                        allowClear={false}
                        showTime
                        value={
                            accident? 
                            moment(moment(accidentData.actionExecutionDate),dateFormat)
                            :
                            ""
                        }
                        onChange={(e,value) => 
                        setAccidentData({...accidentData,
                        actionExecutionDate:value})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Estado"
                    >
                        <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        style={{width:"80px"}}
                        checked={accidentData.state}
                        onChange={e => setAccidentData({...accidentData,state:e})}
                        
                        />
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    label="Plan de acción"
                    >
                        <TextArea
                        placeholder='Describa el plan de acción'
                        value={accidentData.actionPlan}
                        onChange={e => setAccidentData({...accidentData,actionPlan:e.target.value})}
                        />
                    </Item>
                </Col>

                {accident ?
                    <Col span={24}>
                    <Item 
                    label="Imágenes del accidente"
                    >
                    <DropZone
                    eventFiles={eventFiles}
                    setEventFiles={setEventFiles}
                    />
                    </Item>
                </Col>
                :null
                }

                {accident ? 
                <Col span={24}>
                <Item 
                label="Imágenes del plan de acción"
                >
                <DropZone
                eventFiles={actionPlanFiles}
                setEventFiles={setActionPlanFiles}
                />
                </Item>
            </Col>
            :null
                }

                <Button
                type='primary'
                htmlType='submit'
                className='new-accident-form__submit'
                >
                {accident ? 
                "Actualizar accidente":
                "Crear accidente"
                }
                
                </Button>

            </Row>
        </Form>
)
}

function DropZone(props){
    const {eventFiles,setEventFiles}=props;
    let storeAcceptedFiles = eventFiles ? eventFiles:[];

    const onDropAccepted = useCallback(acceptedFiles => {
        uploadEventFilesApi(acceptedFiles).then(response => {
            const {images,code} = response;
            if(code === 200){
                images.map(item => {
                    storeAcceptedFiles.push(item);
                })
                setEventFiles(storeAcceptedFiles);
            }
        });        
      },[])

    const {getRootProps, getInputProps} = useDropzone({
        multiple: true,
        accept: 'image/jpeg, image/png, application/pdf',
        onDropAccepted
      });

    const files = eventFiles ?
      <AcceptedFiles
      acceptedFiles={eventFiles}
      setEventFiles={setEventFiles}
      />:null;
      
        return (
            <section className="container">
              <div {...getRootProps({ className: "dropzone" })}>
                <input 
                {...getInputProps()} />
                <p className="icon">
                <InboxOutlined
                />
                </p>
                <p>Arrastra y suelta para cargar los archivos, o haz click para seleccionar alguno</p>
                <em>(Solo se aceptan archivos *.jpeg, *.png y *.pdf)</em>
              </div>
              <div>
              <ul>{files}</ul>
              </div>
            </section>
      )
}

function AcceptedFiles(props){
    const {acceptedFiles,setEventFiles}=props;

    const removeItem = (fileName,position) => {
        deleteEventFilesApi(fileName).then(response => {
            if(response.code === 200){
                let newAcceptedFiles = acceptedFiles.filter((item,index) => {
                    return position !== index;
                })
                setEventFiles(newAcceptedFiles);
            }
        })
        

    }

    return(
        acceptedFiles.map((file,index) => (
            <li 
            key={file}
            style={{marginTop:"5px",marginBottom:"5px"}}
            >
              {file}
            <Button
            style={{
                marginLeft:"10px",
                backgroundColor:"transparent"
            }}
            onClick={() => removeItem(file,index)}
            >
                {<DeleteOutlined/>}
            </Button>
            </li>
    )));
}
