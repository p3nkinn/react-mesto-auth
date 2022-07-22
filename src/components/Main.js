import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

const Main = ({
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onEditProfile,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__item">
            <div onClick={onEditAvatar} className="profile__redaction">
              <img
                className="profile__image"
                src={currentUser.avatar}
                alt="Аватар пользователя"
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-button"
                aria-label="редактировать"
              ></button>
            </div>
          </div>
          <button
            onClick={onAddPlace}
            type="button"
            className="profile__add-button"
            aria-label="добавить"
          ></button>
        </div>
      </section>
      <div className="elements">
        <ul className="elements__list">
          {cards.map((cardItems) => (
            <Card
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              card={cardItems}
              key={cardItems._id}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Main;
