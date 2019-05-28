import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import {rootReducer} from '@/reducer/reducer';
import App from '@/components/app/app.jsx';
import configureAPI from './api.js';

const api = configureAPI((...args) => store.dispatch(...args));
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// thunk.withExtraArgument(api);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById(`root`));
