// TODO: make e2e tests for App routes
import * as React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

// Component
import SignIn from '../../components/sign-in/sign-in';
import Favourites from '../my-list/my-list';
import Main from '../main/main';
import FilmDetails from '../film-details/film-details';

// HOCS
import withFormData from '../../hocs/with-form-data/with-form-data';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route';
import withFullPlayer from '../../hocs/with-full-player/with-full-player'

// Wrapped Components
const SignInWithFormData = withFormData({'user-email': ``, 'user-password': ``})(SignIn);
const MainWithFullPlayer = withFullPlayer(Main);
const FilmDetailsWithFullPlayer = withFullPlayer(FilmDetails);

// Reducers
import {ActionCreators as DataActionCreators} from '../../reducer/data/data.js';
import {Operations as UserOperations} from '../../reducer/user/user.js';
import {getUniqGenres, getActiveGenre, getFilteredFilms} from '../../reducer/data/selectors';

// Types
import {Film, SignInData, accountData} from "../../types";

interface Props {
  accountData: accountData,
  activeGenre: string,
  films: Film[],
  filmsCounter: number,
  filmsToShow: number,
  genres: string[],
  isAuthenticationRequired: boolean,
  onCardTitleClick: () => void,
  onGenreChange: (evt, genre: string) => void,
  onSignInSubmit: (evt, data: SignInData) => void,
  onFilmsLimitChange: (amount: number) => void,
}

class App extends React.PureComponent<Props, null> {
  render() {
    const {films, onSignInSubmit} = this.props;
    return (
      <>
        <SvgSprite/>
        <Switch>
          <Route path="/" exact component={() => <MainWithFullPlayer {...this.props}/>}/>
          <Route path="/login" exact component={() => <SignInWithFormData onSignInSubmit={onSignInSubmit}/>}/>
          <Route path="/film/:id" exact render={(props) => <FilmDetailsWithFullPlayer {...props} films={films}/>}/>
          <Route path="/favourites" component={withPrivateRoute(Favourites)}/>
        </Switch>
      </>
    );
  }
}

const SvgSprite = () => {
  return (
    <div className="visually-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <symbol id="add" viewBox="0 0 19 20">
          <title>+</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"/>
          </g>
        </symbol>
        <symbol id="full-screen" viewBox="0 0 27 27">
          <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
        </symbol>
        <symbol id="in-list" viewBox="0 0 18 14">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5"/>
        </symbol>
        <symbol id="pause" viewBox="0 0 14 21">
          <title>Artboard</title>
          <desc>Created with Sketch.</desc>
          <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"/>
            <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"/>
          </g>
        </symbol>
        <symbol id="play-s" viewBox="0 0 19 19">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
        </symbol>
      </svg>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    films: getFilteredFilms(state),
    filmsCounter: state[`DATA`].filmsCounter,
    filmsToShow: state[`DATA`].filmsToShow,
    activeGenre: getActiveGenre(state),
    genres: getUniqGenres(state),
    isAuthenticationRequired: state[`USER`].isAuthenticationRequired,
    accountData: state[`USER`].accountData,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (evt, genre) => {
    evt.preventDefault();
    dispatch(DataActionCreators.changeActiveGenre(genre));
  },

  onFilmsLimitChange: (amount) => dispatch(DataActionCreators.getMoreFilms(amount)),

  onSignInSubmit: (evt, data) => {
    evt.preventDefault();
    dispatch(UserOperations.sendUserData(data));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
