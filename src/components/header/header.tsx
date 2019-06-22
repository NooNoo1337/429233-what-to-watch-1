import * as React from "react";
import {Link} from 'react-router-dom';

interface Props {
  accountData: Object,
}

const Header = (props: Props) => {
  const {accountData} = props;

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link className="logo__link" to="/">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">
        {
          accountData !== null ?
            (
              <Link to="/mylist">
                <div className="user-block__avatar">
                  <img src="../img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </Link>
            ) :
            (
              <div className="user-block">
                <Link className="user-block__link" to="/login">
                  Sign in
                </Link>
              </div>
            )
        }
      </div>
    </header>
  );
};

export default Header;
