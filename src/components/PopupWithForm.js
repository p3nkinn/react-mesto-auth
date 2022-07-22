import React from "react";

const PopupWithForm = ({
  classPopup,
  isOpen,
  formName,
  formClass,
  popupTitle,
  children,
  textBtn,
  onClose,
  classBtn,
  onSubmit,
}) => {
  return (
    <div
      className={`popup popup_${classPopup} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <form
          onSubmit={onSubmit}
          name={formName}
          action="#"
          className={formClass}
        >
          <h2 className="popup__title">{popupTitle}</h2>
          {children}
          <button type="submit" className="popup__button">
            {textBtn}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`popup__close popup__close_${classBtn}`}
            aria-label="закрыть"
          ></button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
