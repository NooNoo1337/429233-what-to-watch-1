import * as React from 'react';
import {Subtract} from 'utility-types';

interface InjectedProps {
  activeCardId: number,
}

interface State {
  activeCardId: number,
}

const withActiveCard = (WrappedComponent) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, InjectedProps>;

  class WithActiveCard extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        activeCardId: null,
      };
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter(evt) {
      const target = evt.currentTarget;
      const hoveredCardId = +target.dataset.filmId;

      this.setState({
        activeCardId: hoveredCardId,
      });

      return hoveredCardId;
    }

    handleMouseLeave() {
      this.setState({
        activeCardId: null
      });
    }

    render() {
      return <WrappedComponent
        {...this.props}
        activeCardId={this.state.activeCardId}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />;
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
