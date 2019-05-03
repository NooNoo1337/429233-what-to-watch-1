import React from 'react';
import {render} from 'react-dom';

import App from '@/components/app/app.jsx';

const movieTitlesCollection = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

render(<App movieTitles = {movieTitlesCollection}/>, document.getElementById(`root`));
