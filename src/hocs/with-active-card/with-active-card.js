import React, {Component} from 'react';

const withActiveCard = (WrappedComponent) => {
  return class WithActivePlayer extends Component {
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
        data={this.state.data}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...this.props} />;
    }

    handleMouseEnter(hoveredCardId) {
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
  };
};

export default withActiveCard;
