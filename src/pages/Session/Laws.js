import React,{useState, useEffect} from 'react';
import MenuLaw from '../../components/Session/MenuLaw';
import LawList from '../../components/Session/LawList';
import {Spin,Input}from 'antd';
import Pagination from '../../components/Pagination';
import {useSelector,useDispatch} from 'react-redux';
import {fetchLaws} from '../../redux/actions/lawsActions';

export default function Laws() {

    const [lawSize, setLawSize] = useState(0);
    const [lawsInThePage, setLawsInThePage] = useState([]);
    const [lawsWhenFilterApplied, setLawsWhenFilterApplied] = useState([]);
    const [isListFiltered, setIsListFiltered] = useState(false);
    const [page, setPage] = useState(1);
    const {Search} = Input;
    const pageSize=9;
    const {laws,isLoading,category} = useSelector((state) => state.arlLaws);
    const dispatch = useDispatch();
    const resultsNotAvailable = laws.length === undefined || laws.length === 0;
    const informationIsNotLoading = isLoading === false;

    useEffect(() => {
        dispatch(fetchLaws(category));
    }, [category,dispatch])

    const filterLawsByTitle = (value) => {
        return laws.filter(law => {
            const {titulo} = law;
            return titulo.toLowerCase().indexOf(value.toLowerCase()) !== -1
         });
    } 

    const filterLaws = (value) => {
        const searchBarIsNotEmpty = value !== "";
        if(searchBarIsNotEmpty){
        const lawRequested = filterLawsByTitle(value);
        const resultsFound = lawRequested.length > 0;
        if(resultsFound){
            setLawsWhenFilterApplied(lawRequested);
            setIsListFiltered(true);
        }
         }else{
        dispatch(fetchLaws(category));
        setIsListFiltered(false);
        }   
        };

        const setResultsDependingOnPageSelected = (results) => {
            const bias=page-1;
            const paginatedLaws = results.slice(bias * pageSize, page * pageSize);
            setLawsInThePage(paginatedLaws);
            setLawSize(results.length);
        }
    
    
    useEffect(() => {
    if(resultsNotAvailable){
        setLawsInThePage([])
    }else{
        isListFiltered ?
        setResultsDependingOnPageSelected(lawsWhenFilterApplied)
        :
        setResultsDependingOnPageSelected(laws);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page,lawsWhenFilterApplied,laws])

    return (
        <div>
            <div>
            <MenuLaw/>
            </div>
            <div>
            <Search
            placeholder="Ingrese el nombre de la norma"
            id="lawFilter"
            onSearch={filterLaws}
            allowClear
            enterButton="Buscar"
            style={{
            width:"500px",
            marginTop:"20px",
            marginBottom:"10px"
            }}
            bordered
            size="large"
            />
            </div>
            
            <div>
            <Spin 
            tip="Cargando..."
            size="large"
            style={{
            color:"#FFF",
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "-25px 0 0 -25px",
            fontSize:"16px",
            fontWeight:"bold"
            }}
            spinning={isLoading}
            /> 
            {
                resultsNotAvailable && informationIsNotLoading
                ?
                <h1
                style={
                {
                color:"white",
                fontSize:"18px",
                position: "absolute",
                top: "50%",
                left: "50%",
                margin: "-25px 0 0 -25px",  
                }
                }
                >No se encontró ningún resultado
                </h1>:
                <LawList 
                laws={lawsInThePage}
                />
            }
            </div>
            
            <div>
            {
                resultsNotAvailable?
                null
                :
                <Pagination
                size={lawSize}
                pageSize={pageSize}
                setPage={setPage}
                laws={laws}
                page={page}
            /> 
            }
            </div>
                
            
        </div>
    )
}
