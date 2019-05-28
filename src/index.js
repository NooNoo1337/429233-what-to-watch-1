import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import combineReducers from './reducer/index.js';
import {Operations} from './reducer/data/data.js';
import App from '@/components/app/app.jsx';
import {createAPI} from './api.js';

const api = createAPI((...args) => store.dispatch(...args));
const store = createStore(
    combineReducers,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operations.loadFilms());

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById(`root`));
