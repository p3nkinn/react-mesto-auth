import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmationPopup = ({ isOpen, onClose, onConfirmDelete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmDelete();
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      classPopup="confirm"
      popupTitle="Вы уверены?"
      formName="delCard"
      formClass="popup__form popup__form_confirm"
      textBtn="Да"
      classBtn="popup__close popup__close_profile"
    ></PopupWithForm>
  );
};

export default ConfirmationPopup;
