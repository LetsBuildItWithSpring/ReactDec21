import React from 'react';
import { Badge } from 'react-bootstrap';
import './tick.css';
const Tick = ( props) => {
    console.log(props);
    return <Badge bg={props.isActive ? 'success' : 'primary'} pill onClick={props.onTick}  
        className={`tick`}>
        {props.data}
        &nbsp;
        &nbsp;
        <span>x</span>
    </Badge>
}
export default Tick;