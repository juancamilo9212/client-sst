import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import {CheckCircleOutlined, 
    FolderOpenOutlined,
    DownloadOutlined,
    InboxOutlined
} from '@ant-design/icons';
import './AccidentView.scss';
import { Button } from 'antd';
import {getEventFilesApi} from '../../../api/accident';

export default function AccidentView(props) {
    const {accident} =props;
    const{   
        images,
        name,
        lastName,
        idNumber,
        company,
        area,
        bodyPartAffected,
        accidentType,
        description,
        accidentVersion,
        additionalComments,
        reporterName,
        witness,
        brigadeMember,
        state,
        researched,
        eventDate,
        arrivalDate
    } = accident;
    const dateFormat = 'MMMM D YYYY, h:mm a';
    const eventDateFormat=moment(eventDate).format(dateFormat);
    const arrivalDateFormat=moment(arrivalDate).format('h:mm a');

    const downloadFile = (fileName) => {
        getEventFilesApi(fileName)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}`);
            // 3. Append to html page
            document.body.appendChild(link);
            // 4. Force download
            link.click();
            // 5. Clean up and remove the link
            link.parentNode.removeChild(link);
        });
    }
    return (
        <div className="accident-view">

            <div className="accident-view__personal-info">
            <h2>Información Personal</h2>
            <h3><b>Nombre:</b>{` ${name} ${lastName}`}</h3>
            <h3><b>Cédula: </b>{` ${idNumber}`}</h3>
            <h3><b>Empresa:</b>{` ${company}`}</h3>
            <h3><b>Área:</b>{` ${area}`}</h3>
            </div>

            <div className="accident-view__event-info">
            <h2>Información del evento</h2>
            <h3><b>Fecha del accidente:</b>{` ${eventDateFormat}`}</h3>
            <h3><b>Hora de ingreso a laborar:</b>{` ${arrivalDateFormat}`}</h3>
            <h3><b>Parte del cuerpo afectada:</b>{` ${bodyPartAffected}`}</h3>
            <h3><b>Tipo de accidente:</b>{` ${accidentType}`}</h3>
            </div>

            <div className="accident-view__event-description">
            <h2>Descripción del evento</h2>
            <p>{description}</p>
            <h2>Versión del colaborador</h2>
            <p>{accidentVersion}</p>
            <h2>Archivos del accidente</h2>
            {
            images ?
            images.map(fileName => {
                return(
                    <FileView 
                    fileName={fileName}
                    downloadFile={downloadFile}
                    />
                )
            }):
            <NoFiles/>
            }

            <h2>Comentarios adicionales</h2>
            <p>
            {additionalComments ?
            additionalComments:
            "No hay comentarios adicionales"
            }
            </p>
            </div>

            {witness ?
            <div className="accident-view__witness-info">
             {<WitnessInfo
             accident={accident}
             />}
            </div>
            :null
            }
            
            {
            reporterName ?
            <div className="accident-view__reporter-info">
            <h2>Información de quién reporta</h2>
            <h3><b>Nombre de quién reporta:</b>{` ${reporterName}`}</h3>
            <h3><b>Brigadista que atiende:</b>{` ${brigadeMember}`}</h3>
            </div>
            :
            null
            }
            
            {
            researched ?
           <div className="accident-view__research-info">
            {<ResearchInfo
            accident={accident}
            downloadFile={downloadFile}
            />}
            </div>:null
            }
            
            <div className="accident-view__state">
            <h3>Estado: {state ? 
            <CheckCircleOutlined
            style={{color:"green"}}
            />
            :
            <FolderOpenOutlined
            style={{color:"orange"}}
            />
            }
            </h3>
            </div>
        </div>
    )
}

function WitnessInfo(props){
    const {accident} = props;
    const {witnessName,witnessIdNumber} = accident;
    return(
        <div>
            <h2>Información de los testigos</h2>
            <h3><b>Nombre del testigo:</b>{` ${witnessName}`}</h3>
            <h3><b>Cédula del testigo:</b>{` ${witnessIdNumber}`}</h3>
        </div>      
    )
}

function ResearchInfo(props){
    const {accident,downloadFile} = props;
    const {actionPlanImages,actionExecutionDate,researchDate,actionPlan} = accident;
    const actionPlanDateFormat=moment(actionExecutionDate).format('MMMM D YYYY');
    const researchDateFormat=moment(researchDate).format('MMMM D YYYY');
    
    return (
        <div>
            <h2>Información de la investigación</h2>
            <h3><b>Fecha y hora de la investigación:</b>{researchDateFormat ? ` ${researchDateFormat}`: " No hay fecha"}</h3>
            <h3><b>Fecha del plan de acción:</b>{ actionPlanDateFormat ?` ${actionPlanDateFormat}`:" No hay fecha"}</h3>
            <h2>Plan de acción</h2>
            <p>{actionPlan ? actionPlan : "No hay plan de acción definido"}</p>
            <h2>Archivos del plan de acción</h2>
            {
            actionPlanImages ?
            actionPlanImages.map(fileName => {
                return(
                    <FileView 
                    fileName={fileName}
                    downloadFile={downloadFile}
                    />
                )
            }):<NoFiles/>
            }
            
        </div>   
    )
}

function FileView(props){
    const {fileName,downloadFile} = props;
        return(
            <div>
                <span
                style={
                {
                fontSize:"16px",
                color:"green",
                marginBottom:"5px",
                marginTop:"5px"
                }
                }
                > 
                {fileName}
                </span>
                <Button
                type="link"
                onClick={() => downloadFile(fileName)}
                style={{
                    fontSize:"16px",
                    fontWeight:"bold",
                    border:"1px solid #1890ff",
                    marginBottom:"5px",
                    marginTop:"5px",
                    marginLeft:"10px"
                }}
                >
                {<DownloadOutlined/>}
                Descargar
                </Button>
            </div>
    )
    
}

function NoFiles(){
    return(
        <div>
            <InboxOutlined/>
            <span
            style={
            {
                fontSize:"16px",
                fontWeight:"bold"
            }
            }
            >No hay archivos disponibles</span>
        </div>
    )
}
