import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { CurrentUserContext } from "../context/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/Api";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setloggedIn] = React.useState(false);

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  };

  const handleUpdateUser = (userData) => {
    setIsLoading(true);
    api
      .setProfileInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (userData) => {
    setIsLoading(true);
    api
      .addNewAvatar(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (userData) => {
    setIsLoading(true);
    api
      .addNewCard(userData)
      .then((userData) => {
        setCards([userData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Switch>
        <Route  path='/sign-up'>
          <Login />
        </Route>
        <Route  path='/sign-in'>
          <Register />
        </Route>
        <ProtectedRoute
          exact
          path='/'
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        >
        </ProtectedRoute>
        <Route exact path='*'>
        {!loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
        </Switch>
        <Footer />
        <AddPlacePopup
          isLoading={isLoading}
          onUpdateCard={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          classPopup="confirm"
          popupTitle="Вы уверены?"
          formName="delCard"
          formClass="popup__form popup__form_confirm"
          textBtn="Да"
          classBtn="popup__close popup__close_profile"
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
