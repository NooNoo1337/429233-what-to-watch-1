import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {compose} from 'recompose';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import history from './history.js';

// Components
import App from './components/app/app';

// Reducers
import combineReducers from './reducer/index';
import {Operations} from './reducer/data/data';
import {createAPI} from './api';

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const api = createAPI();

/* eslint-disable no-underscore-dangle */
const store = createStore(
    combineReducers,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
      __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
    )
);
/* eslint-enable */

store.dispatch(Operations.loadFilms());

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>,
    document.getElementById(`root`)
);
