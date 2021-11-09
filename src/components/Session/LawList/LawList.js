import React,{useState} from 'react';
import {Row, Col, Card} from 'antd';
import Modal from '../../Modal';
import './LawList.scss';
import {DownloadOutlined,FileSearchOutlined} from '@ant-design/icons';
import {SURA_URL} from '../../../api/config';

export default function LawList(props) {
    
    const {laws}=props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent,setModalContent]=useState("");
    
    
    
    const verMasButton = (law) =>{
        setIsVisibleModal(true);
        setModalTitle(law.titulo);
        setModalContent(law.texto)
    }
    

    return (
        <div className="law-list">
        <Row justify="space-between">  
        {laws.map(law => {
            return(
            <Col 
            key={law.idContenido}
            md={8}
            className="law-list__cards"
            >
            <LawCard 
            law={law}
            verMasButton={verMasButton}
            />
            </Col>
            )
        })};
        </Row> 
        <Modal
        setIsVisible={setIsVisibleModal}
        isVisible={isVisibleModal}
        title={modalTitle}
        className="law-list__modal"
        >
        {modalContent}
        </Modal> 
        </div>
    )
}

export function LawCard(props){
    const {law,verMasButton} = props;
    const {Meta}=Card;
    return(
        <Card
        title={law.titulo}
        extra={<button
        onClick={() =>verMasButton(law)}
        >
        <FileSearchOutlined />
        </button>}
        >
        <Meta description={law.texto}/>
        <button
        className="button-descargar" 
        >
        
        <a 
        href={`${SURA_URL}${law.idContenido}`}
        >
        {<DownloadOutlined/>}
        Descargar
        </a>
        </button>
        </Card>
    )
}

