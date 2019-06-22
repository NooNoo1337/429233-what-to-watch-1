import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';
import {Film} from '../../types';
import {Operations as DataOperations} from '../../reducer/data/data';

interface InjectedProps {
  favoriteFilms: Film[],
  filmsFetched: boolean,
}

const withFavoriteFilms = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithFavoriteFilms extends React.PureComponent<T, null> {
    constructor(props) {
      super(props);
    }

    componentWillMount(): void {
      this.props.loadFavoriteFilms();
    }

    render() {
      const {favoriteFilms} = this.props;
      const filmsFetched = (favoriteFilms.length > 0);

      return <WrappedComponent
        {...this.props}
        filmsFetched={filmsFetched}
      />;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, ownProps, {
      favoriteFilms: state[`DATA`].favoriteFilms,
    });
  };

  const mapDispatchToProps = (dispatch) => ({
    loadFavoriteFilms: () => dispatch(DataOperations.loadFavoriteFilms()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFavoriteFilms);
};

export default withFavoriteFilms;
