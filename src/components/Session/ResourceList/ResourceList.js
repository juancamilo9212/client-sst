import React from 'react';
import './ResourceList.scss';
import {Button} from 'antd';


export default function ResourceList(props) {
    const {option} = props;

    return (
        <div className="resource-list">
            <Button
            className="resource-list__create"
            >{`Crear ${option}`}</Button>
        </div>
    )
}
