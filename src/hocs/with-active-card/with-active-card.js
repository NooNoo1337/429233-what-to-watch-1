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
        activeCardId={this.state.activeCardId}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...this.props} />;
    }

    handleMouseEnter(evt) {
      const target = evt.target;
      let hoveredCardId;

      if (!target.classList.contains(`small-movie-card`)) {
        hoveredCardId = +target.parentElement.dataset.filmId;
      } else {
        hoveredCardId = +target.dataset.filmId;
      }

      this.setState({
        activeCardId: (this.state.activeCardId === hoveredCardId) ? null : hoveredCardId,
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
