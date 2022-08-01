import React from "react";
import { Route, Link } from "react-router-dom";
import mestoLogo from "../img/mesto-logo.svg";

function Header({ signOut, email }) {
  return (
    <header className="header">
      <Link className="header__link" to="#">
        <img src={mestoLogo} alt="Mesto логотип" className="header__image" />
      </Link>
      <Route exact path="/">
        <div className="header__user">
          <p className="header__email">{email}</p>
          <button onClick={signOut} className="header__logout">
            Выйти
          </button>
        </div>
      </Route>
      <Route path="/sign-up">
        <Link className="header__auth-link" to="sign-in">
          Войти
        </Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__auth-link" to="sign-up">
          Регистрация
        </Link>
      </Route>
    </header>
  );
}

export default Header;
