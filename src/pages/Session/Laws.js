import React,{useState, useEffect} from 'react';
import MenuLaw from '../../components/Session/MenuLaw';
import LawList from '../../components/Session/LawList';
import {getLawApi} from '../../api/arl';
import {notification,Spin}from 'antd';
import Pagination from '../../components/Pagination';

export default function Laws() {

    const [reloadLaws, setReloadLaws] = useState(true);
    const [category, setCategory] = useState("5");
    const [laws, setLaws] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lawSize, setLawSize] = useState(0);
    const [lawsPerPage, setLawsPerPage] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize=9;

    console.log(lawsPerPage);
    
    
    useEffect(() => {
    let paginatedLaws=[];
    if(laws.length !== undefined){
    const bias=page-1;
    paginatedLaws=laws.slice(bias * pageSize, page * pageSize);
    setLawsPerPage(paginatedLaws);
    }else{
    setLawsPerPage([]);
    }
    }, [page,laws])


    useEffect(() => {
        getLawApi(category).then(response => {
            setIsLoading(false);
            setLaws(response);
            setReloadLaws(false);
            setLawSize(response.length);
        }).catch(err => {
            notification["error"]({
                message:"No se ha podido encontrar la información solicitada"
            });
        })
    }, [category])
    
    return (
        <div>
            <MenuLaw
            setCategory={setCategory}
            setIsLoading={setIsLoading}
            setLaws={setLaws}
            />
            <Spin 
            tip="Cargando..."
            size="large"
            style={{color:"#FFF",
            marginLeft:"600px",
            marginTop:"300px",
            fontSize:"16px",
            fontWeight:"bold"
            }}
            spinning={isLoading}
            /> 
            {
                laws.length !== undefined ?
                <LawList 
                laws={lawsPerPage}
                />
                :
                <h1
                style={
                {
                color:"white",
                fontSize:"18px",
                marginTop:"100px",
                marginBottom:"200px",
                marginLeft:"350px"
                }
                }
                >La información no está disponible en este momento
                </h1>
            }
            
            <Pagination
            size={lawSize}
            pageSize={pageSize}
            setPage={setPage}
            laws={laws}
            page={page}
            />
        </div>
    )
}
