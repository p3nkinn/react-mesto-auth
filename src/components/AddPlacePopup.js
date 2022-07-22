import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onUpdateCard}) => {
  const [cardName , setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');
  
  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  const handleCardName = (e) => {
    setCardName(e.target.value);
  }

  const handleCardLink = (e) => {
    setCardLink(e.target.value);
  }
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateCard({
          name: cardName,
          link: cardLink
        })
    }

    return (
        <PopupWithForm
        onSubmit={handleSubmit}
        classPopup="newplaces"
        isOpen={isOpen}
        onClose={onClose}
        popupTitle="Новое место"
        formName="newPlace"
        formClass="popup__form popup__new-form"
        textBtn="Создать"
        classBtn="popup__close popup__close_newplaces"
          >
            <label className="popup__input-error">
              <input
                id="title-input"
                name="name"
                value={cardName ? cardName : ''}
                onChange={handleCardName}
                placeholder="Название"
                required
                type="text"
                className="popup__input popup__input_type_title" 
              />
              <span className="title-input-error popup__error popup__error_visible"></span>
            </label>
            <label className="popup__input-error">
              <input
                id="link-input"
                name="link"
                value={cardLink ? cardLink : ''}
                onChange={handleCardLink}
                placeholder="Ссылка на картинку"
                required
                type="url"
                className="popup__input popup__input_type_link"
              />
              <span className="link-input-error popup__error popup__error_visible"></span>
            </label>
          </PopupWithForm>
        
      
    )
}

export default AddPlacePopup;