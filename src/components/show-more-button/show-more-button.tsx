import * as React from 'react';

interface Props {
  onFilmsLimitChange: (amount: number) => void,
  filmsCounter: number,
  filmsToShow: number,
}

export default class ShowMoreButton extends React.PureComponent<Props, null> {
  render() {
    const {onFilmsLimitChange, filmsCounter, filmsToShow} = this.props;
    const areAllFilmsShown = (filmsToShow >= filmsCounter);
    const multiplier = areAllFilmsShown ? 1 : 2;
    return (
      <div className="catalog__more" style={{display: areAllFilmsShown ? 'none' : 'block' }}>
        <button
          className="catalog__button"
          type="button"
          onClick={() => onFilmsLimitChange(filmsCounter * multiplier)}
        >
          Show more
        </button>
      </div>
    );
  }
}
