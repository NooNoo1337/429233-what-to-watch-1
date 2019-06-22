import * as React from 'react';
import * as classNames from 'classnames';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {accountData} from '../../types';

interface Props {
  handleFieldChange: (evt) => void,
  onSignInSubmit: (evt) => void,
  formErrors: boolean | object,
  fetchData: object,
}

class SignIn extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const {fetchData, onSignInSubmit} = this.props;

    onSignInSubmit(fetchData);
  }

  render() {
    const {
      handleFieldChange,
      formErrors
    } = this.props;

    const classes = classNames({
      'sign-in__field': true,
      'sign-in__field--error': formErrors,
    });

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link className="logo__link" to="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this.handleSubmit}>

            {
              formErrors &&
              <div className="sign-in__message">
                <p>Please enter a valid email address</p>
              </div>
            }

            <div className="sign-in__fields">
              <div className={classes}>
                <input className="sign-in__input" type="email" placeholder="Email address" name="email" id="user-email" onChange={handleFieldChange} required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="password" id="user-password" onChange={handleFieldChange} required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <Link className="logo__link logo__link--light" to="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    formErrors: state[`USER`].formErrors,
  });
};

export {SignIn}

export default  connect(mapStateToProps, null)(SignIn);
