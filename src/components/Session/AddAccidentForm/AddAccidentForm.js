import React,{useState,useEffect,useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import './AddAccidentForm.scss';
import {
Form, 
Button,
Input , 
Switch, 
Select, 
DatePicker, 
Row, 
Col,
notification}from 'antd';
import {
CheckOutlined, 
CloseOutlined, 
InboxOutlined, 
DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/es';
import 
{addAccidentApi,
updateAccidentApi,
uploadEventFilesApi,
deleteEventFilesApi
} from '../../../api/accident';
import {getUserId} from '../../../api/auth';

export default function AddAccidentForm(props) {
    
    const {setReloadAccidents,accident,setIsVisibleModal} = props;
    const [accidentData, setAccidentData] = useState({});
    const [eventFiles, setEventFiles] = useState([]);
    const [actionPlanFiles, setActionPlanFiles] = useState([]);

    console.log(eventFiles);
    
    
    useEffect(() => {
    if(accident){
    const 
    {images,
    actionPlanImages
    } = accident;
    
    setAccidentData(accident)
    images.length !== 0 ? 
    setEventFiles(images)
    :
    setEventFiles([]);
    actionPlanImages.length !== 0 ?
    setActionPlanFiles(actionPlanImages)
    :
    setActionPlanFiles([]);
    }else{
    setAccidentData({});
    setEventFiles([]);
    setActionPlanFiles([]);
    }
    }, [accident])

    const createAccident = () =>{
        const userId=getUserId()
        addAccidentApi(userId,accidentData).then(response => {
            const {status} = response;
            console.log(response);
            
            if(status === 200){
                notification['success']({
                    message:"El accidente se creó correctamente"
                });
                setReloadAccidents(true);
                setIsVisibleModal(false);
                setAccidentData({});
            }else{
            notification['error']({
            message:"Error. Por favor verifica la infomación ingresada"
            });
            }
        })
    }

    const updateAccident = () => {
            const payload = {
            ...accidentData,
            images:eventFiles,
            actionPlanImages:actionPlanFiles
            }
            const accidentId=accident._id;
            updateAccidentApi(accidentId,payload).then(response => {
                const {status} = response;
                if(status === 200){
                    notification['success']({
                        message:"El accidente se actualizó correctamente"
                    });
                    setReloadAccidents(true);
                    setIsVisibleModal(false);
                    setEventFiles([]);
                    setActionPlanFiles([]);
                    setAccidentData({});
                }else{
                    notification['error']({
                    message:"Error. Por favor verifica la infomación ingresada"
                });
            }
        });
    }
    
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

    const {
    accidentData,
    setAccidentData,
    createAccident,
    updateAccident,
    accident,
    eventFiles,
    setEventFiles,
    actionPlanFiles,
    setActionPlanFiles
    }=props;
    const dateFormat='M-D-YYYY hh:mm:ss'
    const {Item} = Form;
    const {TextArea} = Input;
    const {Option} = Select;
    const {
    name,
    lastName,
    company,
    idNumber,
    area,
    bodyPartAffected,
    eventDate,
    arrivalDate,
    description,
    witness,
    witnessName,
    witnessIdNumber,
    additionalComments,
    reporterName,
    brigadeMember,
    accidentType,
    researched,
    researchDate,
    actionExecutionDate,
    actionPlan,
    state
    }=accidentData;
    
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
                        value={name}
                        onChange={e => 
                        setAccidentData({...accidentData,name:e.target.value})}
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
                        value={lastName}
                        onChange={e => 
                        setAccidentData({...accidentData,lastName:e.target.value})}
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
                        value={idNumber}
                        onChange={e => 
                        setAccidentData({...accidentData,idNumber:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label='Empresa'
                    >
                        <Input
                        className="new-accident-form__row-input"
                        placeholder='Ingrese la empresa'
                        value={company}
                        onChange={e => 
                        setAccidentData({...accidentData,company:e.target.value})}
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
                        value={area}
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
                        value={bodyPartAffected}
                        onChange={e => 
                        setAccidentData({...accidentData,bodyPartAffected:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item 
                    label="Fecha y hora del accidente"
                    >
                        <DatePicker
                        placeholder={'Ingrese la fecha'}
                        allowClear={false}
                        showTime
                        value={eventDate ? 
                        moment(moment(eventDate),dateFormat)
                        : null
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
                         placeholder={'Ingrese la fecha'}
                        allowClear={false}
                        showTime
                        value={arrivalDate ? 
                        moment(moment(arrivalDate),dateFormat)
                        :null
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
                        value={description}
                        onChange={e => 
                        setAccidentData({...accidentData,description:e.target.value})}
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
                        checked={witness}
                        onChange={e => 
                        setAccidentData({...accidentData,witness:e})}
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
                        value={witnessName}
                        onChange={e =>
                        setAccidentData({...accidentData,witnessName:e.target.value})}
                        
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
                        value={witnessIdNumber}
                        onChange={e => 
                        setAccidentData({...accidentData,witnessIdNumber:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={24}>
                    <Item 
                    label="Comentarios adicionales"
                    >
                        <TextArea
                        placeholder='Comentario adicional'
                        value={additionalComments}
                        onChange={e => 
                        setAccidentData({...accidentData,additionalComments:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Nombre de quién reporta"
                    >
                        <Input
                        className="new-accident-form__row-input"
                        value={reporterName}
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
                        value={brigadeMember}
                        onChange={e => 
                        setAccidentData({...accidentData,brigadeMember:e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Tipo de accidente"
                    >
                        <Select
                        defaultValue="Accidente de trabajo"
                        value={accidentType}
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
                        checked={researched}
                        onChange={e => setAccidentData({...accidentData,researched:e})}
                        />
                    </Item>
                </Col>

                <Col span={8}>
                    <Item 
                    label="Fecha y hora de la investigación"
                    >
                        <DatePicker
                        placeholder={'Ingrese la fecha'}
                        allowClear={false}
                        showTime
                        value={researchDate ? 
                        moment(moment(accidentData.researchDate),dateFormat)
                        :null
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
                        placeholder={'Ingrese la fecha'}
                        allowClear={false}
                        showTime
                        value={actionExecutionDate?
                        moment(moment(actionExecutionDate),dateFormat)
                        :null
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
                        checked={state}
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
                        value={actionPlan}
                        onChange={e => 
                        setAccidentData({...accidentData,actionPlan:e.target.value})}
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
    console.log(storeAcceptedFiles);
    
    const onDropAccepted = useCallback(acceptedFiles => {
        uploadEventFilesApi(acceptedFiles).then(response => {
            const {images,code} = response;
            if(code === 200){
                if(images.length === 1){
                    storeAcceptedFiles.push(images[0]);
                }else{
                    images.map(item => {
                        storeAcceptedFiles.push(item);
                    });
                }
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
                });
                setEventFiles(newAcceptedFiles);
            }
        });
        

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
