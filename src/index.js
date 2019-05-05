import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/components/app/app.jsx';

const movieTitlesCollection = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

ReactDOM.render(<App movieTitles = {movieTitlesCollection}/>, document.getElementById(`root`));
