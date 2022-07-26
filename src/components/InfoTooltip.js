import React from "react";
import successCheck from "../img/Done.svg";
import failCheck from "../img/Error.svg";
const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup popup_info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <div className="popup__form">
          {isSuccess ? (
            <>
              <img
                src={successCheck}
                alt={"Вы успешно зарегистрировались!"}
                className="popup__union"
              />
              <p className="popup__title">Вы успешно зарегистрировались!</p>
              <button
                onClick={onClose}
                type="button"
                className="popup__close popup__close_info"
                aria-label="закрыть"
              ></button>
            </>
          ) : (
            <>
              <img
                src={failCheck}
                alt={"Что-то пошло не так! Попробуйте ещё раз."}
                className="popup__union"
              />
              <p className="popup__title popup__title_center">
                Что-то пошло не так! Попробуйте ещё раз.
              </p>
              <button
                onClick={onClose}
                type="button"
                className="popup__close popup__close_info"
                aria-label="закрыть"
              ></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
