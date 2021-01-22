import React from 'react';
import {Table as AntdTable} from 'antd';
import './Table.scss';

export default function Table(props) {

    const {columns,dataSource}=props;

    return (
        <div className="resource-table">
        <AntdTable
        columns={columns} 
        dataSource={dataSource}
        pagination={{ pageSize: 10 ,
        position:["bottomCenter"]
        }}
        scroll={{ y: 350 }}
        bordered
        className="resource-table__table"
        />
        </div>
    )
}
