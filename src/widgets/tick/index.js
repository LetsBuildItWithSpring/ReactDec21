import React from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types'
import './tick.css';
// type IProps = {
//     isActive: boolean,
//     onTick: () => {},
//     children: React.ReactNode

// };
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
Tick.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onTick: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
export default Tick;