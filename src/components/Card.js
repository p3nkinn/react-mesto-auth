import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `elements__likes ${
    isLiked ? "elements__likes_active" : ""
  }`;

  const cardDeleteButtonClassName = `elements__remove ${
    isOwn ? "elements__remove_active" : ""
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleCardDelete = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  return (
    <li className="elements__item">
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="elements__image"
      />
      <div className="elements__description">
        <h3 className="elements__title">{card.name}</h3>
        <div className="elements__hearts">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
            aria-label="лайк"
          ></button>
          <span className="elements__likes_count">{card.likes.length}</span>
        </div>
      </div>
      <button
        onClick={handleCardDelete}
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="удалить"
      ></button>
    </li>
  );
};

export default Card;
