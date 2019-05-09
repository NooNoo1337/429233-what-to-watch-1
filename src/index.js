import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/components/app/app.jsx';

import filmsCollection from '@/mocks/films.js';


ReactDOM.render(<App films={filmsCollection} onCardTitleClick={() => {}}/>, document.getElementById(`root`));
