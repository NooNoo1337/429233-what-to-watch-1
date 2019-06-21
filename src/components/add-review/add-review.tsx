import * as React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom'

// Reducers
import {Operations as DataOperations} from "../../reducer/data/data";

// Types
import {Film} from '../../types'

interface Props {
  films: Film[]
  activeFilm: null | number,
  filmsFetched: boolean,
  handleFieldChange: (evt) => void,
  formReset: (evt) => void,
}

class AddReview extends React.PureComponent<Props & RouteComponentProps, null> {
  chosenFilmId = +this.props.match.params.id;

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const {fetchData, addComment, formReset} = this.props;

    addComment({
      ...fetchData,
      filmId: this.chosenFilmId,
    });

    formReset();
  }

  render() {
    const {
      films,
      filmsFetched,
      fetchData: {
        rating,
        comment
      },
      handleFieldChange,
    } = this.props;
    const film = films.filter((film) => film.id === this.chosenFilmId)[0];

    return (
      <>
        {
          filmsFetched ?
            <section className="movie-card movie-card--full">
              <div className="movie-card__header">
                <div className="movie-card__bg">
                  <img src={film.background_image} alt={film.name}/>
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <header className="page-header">
                  <div className="logo">
                    <Link to="/" className="logo__link">
                      <span className="logo__letter logo__letter--1">W</span>
                      <span className="logo__letter logo__letter--2">T</span>
                      <span className="logo__letter logo__letter--3">W</span>
                    </Link>
                  </div>

                  <nav className="breadcrumbs">
                    <ul className="breadcrumbs__list">
                      <li className="breadcrumbs__item">
                        <Link to={`/film/${film.id}`} className="breadcrumbs__link">
                          {film.name}
                        </Link>
                      </li>
                      <li className="breadcrumbs__item">
                        <a className="breadcrumbs__link">Add review</a>
                      </li>
                    </ul>
                  </nav>

                  <div className="user-block">
                    <div className="user-block__avatar">
                      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                    </div>
                  </div>
                </header>

                <div className="movie-card__poster movie-card__poster--small">
                  <img src={film.poster_image} alt="The Grand Budapest Hotel poster" width="218"
                       height="327"/>
                </div>
              </div>

              <div className="add-review">
                <form action="#" className="add-review__form" onSubmit={this.handleSubmit}>
                  <div className="rating">
                    <div className="rating__stars">
                      <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                             onChange={handleFieldChange}
                             checked={+rating === 1}
                      />
                      <label className="rating__label" htmlFor="star-1">Rating 1</label>

                      <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                             onChange={handleFieldChange}
                             checked={+rating === 2}
                      />
                      <label className="rating__label" htmlFor="star-2">Rating 2</label>

                      <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                             onChange={handleFieldChange}
                             checked={+rating === 3}
                      />
                      <label className="rating__label" htmlFor="star-3">Rating 3</label>

                      <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                             onChange={handleFieldChange}
                             checked={+rating === 4}
                      />
                      <label className="rating__label" htmlFor="star-4">Rating 4</label>

                      <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                             onChange={handleFieldChange}
                             checked={+rating === 5}
                      />
                      <label className="rating__label" htmlFor="star-5">Rating 5</label>
                    </div>
                  </div>

                  <div className="add-review__text">
                    <textarea className="add-review__textarea"
                              name="comment"
                              id="review-text"
                              placeholder="Review text"
                              value={comment}
                              onChange={handleFieldChange}
                    >

              </textarea>
                    <div className="add-review__submit">
                      <button className="add-review__btn" type="submit">Post</button>
                    </div>

                  </div>
                </form>
              </div>
            </section>
            :
            null
        }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (data) => {
      dispatch(DataOperations.addComment(data))
    },
  };
};

export default connect(null, mapDispatchToProps)(AddReview);
