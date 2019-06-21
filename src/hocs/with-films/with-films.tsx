import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';
import {Film} from '../../types';

interface InjectedProps {
  films: Film[]
  render: Boolean
}

const withFilms = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithFilms extends React.PureComponent<T, null> {
    constructor(props) {
      super(props);
    }

    render() {
      const {films} = this.props;
      const filmsFetched = (films.length > 0);

      return <WrappedComponent
        {...this.props}
        filmsFetched={filmsFetched}
      />;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, ownProps, {
      films: state[`DATA`].films,
    });
  };

  return connect(mapStateToProps, null)(WithFilms);
};

export default withFilms;
