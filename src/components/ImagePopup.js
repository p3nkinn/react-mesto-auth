import React from "react";

const ImagePopup = ({card , isOpen, onClose}) => {
  return (
    <div
      className={`popup popup_openimg ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <div className="popup__photo">
          <img
            src={card.link}
            alt={card.name}
            className="popup__image"
          />
          <p className="popup__subtitle">{card.name}</p>
          <button
            onClick={onClose}
            type="button"
            className="popup__close popup__close_openimg"
            aria-label="закрыть"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
