import * as React from 'react';

// Components
import VideoPlayer from '../video-player/video-player';

// Types
import {Film} from "../../types";

interface Props {
  film: Film,
  onCardTitleClick: () => void,
  onMouseEnter: (evt) => number,
  onMouseLeave: () => void,
  isVideoPlaying: boolean
}

export default class FilmCard extends React.PureComponent<Props, null> {
  render() {
    const {film, isVideoPlaying, onMouseEnter, onMouseLeave, onCardTitleClick} = this.props;
    return (
      <article className="small-movie-card catalog__movies-card" data-film-id={film.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <VideoPlayer
          posterSrc={film.preview_image}
          videoSrc={film.preview_video_link}
          videoFormat="mp4"
          isVideoPlaying={isVideoPlaying}
          isSoundOff={true}
        />
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" onClick={onCardTitleClick}>
            {film.name}
          </a>
        </h3>
      </article>
    );
  }
}

