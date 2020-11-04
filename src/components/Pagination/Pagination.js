import React,{useEffect} from 'react';
import {Pagination as PaginationAntd} from 'antd';
import './Pagination.scss';

export default function Pagination(props) {
    
    const {size, pageSize, setPage, laws, page}=props;

    useEffect(() => {
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [laws])

    const onChangePage= (newPage) => {
        setPage(newPage);
    }
    
    return (
        <PaginationAntd
        defaultCurrent={1}
        current={page}
        total={size}
        pageSize={pageSize}
        onChange={newPage=> onChangePage(newPage)}
        hideOnSinglePage
        showSizeChanger={false}
        className="pagination"
        />
    )
}
