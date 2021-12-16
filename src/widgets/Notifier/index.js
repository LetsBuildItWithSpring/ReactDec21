import React from 'react';
import reactDom from 'react-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';


const Notifier = (props) => {
    const infoZone = document.getElementById('info-zone');
    return reactDom.createPortal(
        <Alert variant={props.variant}>
            {props.children}
        </Alert>,
        infoZone
    );
};

Notifier.propTypes = {
    variant: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Notifier;