import React from "react";
import Done from '../img/Done.svg';
import Error from '../img/Error.svg';
const InfoTooltip = ({isOpen, onClose, isDone}) => {

  return (
    <div
      className={`popup popup_info ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        {isDone ? (
            <>
            <img
            src={Done}
            alt={'Вы успешно зарегистрировались!'}
            className="popup__image"
            />
            <p className="popup__title">Вы успешно зарегистрировались!</p>
          <button
            onClick={onClose}
            type="button"
            className="popup__close popup__close_openimg"
            aria-label="закрыть"
          ></button>
          </>
        ) : (
            <>
            <img
            src={Error}
            alt={'Что-то пошло не так! Попробуйте ещё раз.'}
            className="popup__image"
            />
            <p className="popup__title">Что-то пошло не так! Попробуйте ещё раз.</p>
          <button
            onClick={onClose}
            type="button"
            className="popup__close popup__close_openimg"
            aria-label="закрыть"
          ></button>
          </>
        )}
        </div>
      </div>
  );
};

export default InfoTooltip;
