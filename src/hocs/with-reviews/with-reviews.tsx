import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';
import {Review} from '../../types';
import {Operations as DataOperations} from '../../reducer/data/data';

interface InjectedProps {
  comments: Review[]
}

const withComments = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithComments extends React.PureComponent<T, null> {
    constructor(props) {
      super(props);
    }

    componentWillMount(): void {
      this.props.loadComments(this.props.id);
    }

    render() {
      const {comments} = this.props;
      const commentsFetched = (comments.length > 0);

      return <WrappedComponent
        {...this.props}
        commentsFetched={commentsFetched}
      />;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, ownProps, {
      comments: state[`DATA`].comments,
    });
  };

  const mapDispatchToProps = (dispatch) => ({
    loadComments: (id) => dispatch(DataOperations.loadComments(id)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithComments);
};

export default withComments;
