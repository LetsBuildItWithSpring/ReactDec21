import React from 'react';

import reactDom from 'react-dom';

import { Provider } from 'react-redux';

import App from './App';
import store from './state';

import 'bootstrap/dist/css/bootstrap.min.css';


const StateWrapper = () => {

    return <Provider store={store}>
        <App/>
    </Provider>
}

reactDom.render(<StateWrapper/>, document.getElementById('root'));