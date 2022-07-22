import React from "react";
import mestoLogo from "../img/mesto-logo.svg";

function Header() {
  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={mestoLogo} alt="Mesto логотип" className="header__image" />
      </a>
    </header>
  );
}

export default Header;
