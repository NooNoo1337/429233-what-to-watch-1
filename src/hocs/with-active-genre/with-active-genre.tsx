import * as React from 'react';
import {connect} from 'react-redux'
import {Subtract} from 'utility-types';

// Reducers
import {ActionCreators as DataActionCreators} from "../../reducer/data/data";
import {getActiveGenre} from '../../reducer/data/selectors';

interface InjectedProps {
  activeGenre: string,
  onGenreChange: (evt, genre: string) => void,
  sas: (evt, genre: string) => void,
}

interface State {
  activeGenre: string,
}

const withActiveGenre = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithActiveGenre extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        activeGenre: `All genres`,
      };
      this.onGenreChange = this.onGenreChange.bind(this);
    }

    onGenreChange(evt, genre) {
      evt.preventDefault();

      this.setState({
        activeGenre: genre
      })
    }

    render() {
      return <WrappedComponent
        {...this.props}
        activeGenre={this.state.activeGenre}
        onGenreChange={this.onGenreChange}
      />;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, ownProps, {
      activeGenre: getActiveGenre(state)
    });
  };

  const mapDispatchToProps = (dispatch) => ({
    onGenreChange: (evt, genre) => {
      evt.preventDefault();
      dispatch(DataActionCreators.changeActiveGenre(genre));
      dispatch(DataActionCreators.getFilmsByGenre(genre));
    },
  });

  return connect(mapStateToProps,mapDispatchToProps)(WithActiveGenre);
};

export default withActiveGenre;
