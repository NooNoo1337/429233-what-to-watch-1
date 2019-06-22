import * as React from 'react';
import * as classNames from 'classnames';

// Types
import {Film, Review} from '../../types';

interface Props {
  filmInfo: Film
  onTabClick: Function,
  activeTab: number,
  comments: Review[],
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
    const {
      filmInfo,
      onTabClick,
      activeTab,
      comments
    } = this.props;

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
          <ReviewsList comments={comments}/>
        </TabItem>
      </>
    );
  }
}

const ReviewsList = (props) => {
  const {comments} = props;

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {
          comments.map((comment) => <Review key={comment.id} {...comment}/>).slice(0, comments.length / 2)
        }
      </div>
      <div className="movie-card__reviews-col">
        {
          comments.map((comment) => <Review key={comment.id} {...comment}/>).slice(comments.length / 2)
        }
      </div>
    </div>
  );
};

const Review = (props) => {
  const {comment, user, rating, date} = props;

  const formatDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date(date);
    return `${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
  };

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">
          {comment}
        </p>
        <footer className="review__details">
          <cite className="review__author">
            {user.name}
          </cite>
          <time className="review__date" dateTime={ new Date(date).toISOString().split('T')[0] }>
            {
              formatDate(date)
            }
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
};

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


