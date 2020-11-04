import React from 'react';
import {Pagination as PaginationAntd} from 'antd';
import './Pagination.scss';

export default function Pagination(props) {
    
    const {size, pageSize, setPage}=props;

    const onChangePage= (newPage) => {
        setPage(newPage);
    }
    
    return (
        <PaginationAntd
        defaultCurrent={1}
        total={size}
        pageSize={pageSize}
        onChange={newPage=> onChangePage(newPage)}
        hideOnSinglePage
        showSizeChanger={false}
        className="pagination"
        />
    )
}
