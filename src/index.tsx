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

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const api = createAPI();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api)),
  )
);
/* eslint-enable */

store.dispatch(Operations.loadFilms());
store.dispatch(Operations.loadPromoFilm());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>,
  document.getElementById(`root`)
);
