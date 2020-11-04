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
    
    useEffect(() => {
    let paginatedLaws=[];
    const bias=page-1;
    paginatedLaws=laws.slice(bias * pageSize, page * pageSize);
    setLawsPerPage(paginatedLaws);
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
            })
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
            marginLeft:"500px",
            marginTop:"200px",
            fontSize:"16px",
            fontWeight:"bold"
            }}
            spinning={isLoading}
            />
            <LawList 
            laws={lawsPerPage}
            />
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
