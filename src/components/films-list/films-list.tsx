import * as React from 'react';

// Components
import FilmCard from '../../components/film-card/film-card';

// HOCS
import withVideoPlayer from '../../hocs/with-video-player/with-video-player';

// Wrapped Components
const FilCardWithVideoPlayer = withVideoPlayer(FilmCard);

// Types
import {Film} from "../../types";


interface Props {
  films: Film[],
  activeCardId: number,
  onMouseEnter: (evt) => number,
  onMouseLeave: () => void,
  onCardTitleClick: () => void,
}

export default class FilmsList extends React.PureComponent<Props, null> {
  render() {
    const {films, activeCardId, onMouseEnter, onMouseLeave, onCardTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((film) =>
          <FilCardWithVideoPlayer
            film={film}
            key={film.id}
            onCardTitleClick={onCardTitleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            isCardActive={activeCardId === film.id}
          />)}
      </div>
    );
  }
}
