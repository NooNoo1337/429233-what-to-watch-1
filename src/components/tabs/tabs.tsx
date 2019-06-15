import * as React from 'react';
import * as classNames from 'classnames';

// Types
import {Film} from '../../types';

interface Props {
  filmInfo: Film
  onTabClick: Function,
  activeTab: number
}

class Tabs extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);
  }

  getMovieRatingLevel(rating: number): string {
    switch (true) {
      case (rating <= 3):
        return `bad`;
        break;
      case (rating >= 3 && rating <= 5):
        return `normal`;
        break;
      case (rating >= 5 && rating <= 8):
        return `good`;
        break;
      case (rating >= 8 && rating <= 10):
        return `very good`;
        break;
      case (rating === 10):
        return `awesome`;
        break;
      default:
        return `no rank`;
        break;
    }
  }

  render() {
    const {filmInfo, onTabClick, activeTab} = this.props;
    return (
      <>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <TabNav onTabClick={onTabClick} activeTab={activeTab} tabId={1}>Overview</TabNav>
            <TabNav onTabClick={onTabClick} activeTab={activeTab} tabId={2}>Overview</TabNav>
            <TabNav onTabClick={onTabClick} activeTab={activeTab} tabId={3}>Reviews</TabNav>
          </ul>
        </nav>

        <TabItem filmInfo={this.props.filmInfo} activeTab={activeTab} tabId={1}>
          <div className="movie-rating">
            <div className="movie-rating__score">
              {filmInfo.rating}
            </div>
            <p className="movie-rating__meta">
            <span className="movie-rating__level">
              {this.getMovieRatingLevel(filmInfo.rating)}
            </span>
              <span className="movie-rating__count">
               {filmInfo.scores_count} ratings
            </span>
            </p>
          </div>
          <div className="movie-card__text">
            <p>
              {filmInfo.description}
            </p>

            <p className="movie-card__director">
              <strong>
                Director: {filmInfo.director}
              </strong>
            </p>

            <p className="movie-card__starring">
              <strong>
                Starring: {filmInfo.starring.join(', ')} and other
              </strong>
            </p>
          </div>
        </TabItem>

        <TabItem filmInfo={this.props.filmInfo} activeTab={activeTab} tabId={2}>
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{filmInfo.director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                {filmInfo.starring.join(', ')}
              </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{filmInfo.run_time}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{filmInfo.genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{filmInfo.released}</span>
              </p>
            </div>
          </div>
        </TabItem>

        <TabItem filmInfo={this.props.filmInfo} activeTab={activeTab} tabId={3}>
          <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious
                                              Mittel-European kitsch of one of the director's funniest and most
                                              exquisitely designed movies in years.</p>

                  <footer className="review__details">
                    <cite className="review__author">Kate Muir</cite>
                    <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                  </footer>
                </blockquote>

                <div className="review__rating">8,9</div>
              </div>
            </div>
            <div className="movie-card__reviews-col">
              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the
                                              content is a little more adult.</p>

                  <footer className="review__details">
                    <cite className="review__author">Paula Fleri-Soler</cite>
                    <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                  </footer>
                </blockquote>

                <div className="review__rating">7,0</div>
              </div>
            </div>
          </div>
        </TabItem>
      </>
    );
  }
}

const TabItem = (props) => {
  const {children, activeTab, tabId} = props;
  return (
    <>
      {activeTab === tabId ? children : null}
    </>
  );
};

const TabNav = ({children, onTabClick, tabId, activeTab}) => {
  const classes = classNames(
    'movie-nav__item',
    {'movie-nav__item--active': activeTab === tabId}
  );
  return (
    <li className={classes}>
      <a href="#" className="movie-nav__link" onClick={(evt) => onTabClick(evt, tabId)}>{children}</a>
    </li>
  );
};

export default Tabs;


