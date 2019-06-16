import * as React from 'react';
import {Link} from 'react-router-dom';

// Components
import VideoPlayer from '../video-player/video-player';

// Types
import {Film} from "../../types";

interface Props {
  film: Film,
  onCardTitleClick: () => void,
  onMouseEnter: (evt) => void,
  onMouseLeave: () => void,
  isVideoPlaying: boolean
}

export default class FilmCard extends React.PureComponent<Props, null> {
  render() {
    const {film, isVideoPlaying, onMouseEnter, onMouseLeave, onCardTitleClick} = this.props;
    return (
     <>
       <article className="small-movie-card catalog__movies-card" data-film-id={film.id} onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
         <Link to={`/film/${film.id}`}>
           <VideoPlayer
             posterSrc={film.preview_image}
             videoSrc={film.preview_video_link}
             videoFormat="video/mp4"
             isVideoPlaying={isVideoPlaying}
             isSoundOff={true}
           />
         </Link>
         <h3 className="small-movie-card__title">
           <Link to={`/film/${film.id}`} className="small-movie-card__link" onClick={onCardTitleClick}>
             {film.name}
           </Link>
         </h3>
       </article>
     </>
    );
  }
}

