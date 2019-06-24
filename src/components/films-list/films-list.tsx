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
  filmsToShow: number,
}

const FilmsList = (props: Props) => {
  const {
    films,
    activeCardId,
    filmsToShow,
    onMouseEnter,
    onMouseLeave,
    onCardTitleClick
  } = props;

  return (
    <div className="catalog__movies-list">
      {films.slice(0, filmsToShow).map((film) =>
        <FilCardWithVideoPlayer
          film={film}
          key={film.id}
          onCardTitleClick={onCardTitleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          isCardActive={activeCardId === film.id}
        />
      )}
    </div>
  );
};

export default FilmsList;
