import React, {Component} from 'react';

const withActiveCard = (WrappedComponent) => {
  class WithActiveCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeCardId: null,
      };
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    render() {
      return <WrappedComponent
        {...this.props}
        activeCardId={this.state.activeCardId}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />;
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
  }

  return WithActiveCard;
};

export default withActiveCard;
