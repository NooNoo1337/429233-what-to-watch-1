import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {compose} from 'recompose';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import history from './history.js';

import combineReducers from './reducer/index.js';
import {Operations} from './reducer/data/data.js';
import {createAPI} from './api.js';

import App from '@/components/app/app.jsx';

const api = createAPI();
const store = createStore(
    combineReducers,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operations.loadFilms());

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>,
    document.getElementById(`root`)
);
