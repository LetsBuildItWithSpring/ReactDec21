import React from 'react';
import './tick.css';
const Tick = ( props) => {
    console.log(props);
    return <div onClick={props.onTick}  
        className={`tick ${props.isActive ? 'active': ''}`}>
        {props.data}
        &nbsp;
        &nbsp;
        <span>x</span>
    </div>
}
export default Tick;