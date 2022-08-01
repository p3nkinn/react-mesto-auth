import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ConfirmationPopup from "./ConfirmationPopup";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/Auth";
import { CurrentUserContext } from "../context/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/Api";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isCardDelete, setCardDelete] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setloggedIn] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const history = useHistory();
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

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setloggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log("400 — Токен не передан или передан не в том формате");
          } else if (err.status === 401) {
            console.log("401 — Переданный токен некорректен");
          }
        });
    }
  }, [history]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleConfirmDelete = (card) => {
    setCardDelete(card);
    setConfirmPopupOpen(true);
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
    setConfirmPopupOpen(false);
    setInfoTooltip(false);
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

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

  const handleCardDelete = () => {
    api
      .deleteCard(isCardDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== isCardDelete._id)
        );
        closeAllPopups();
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

  const handleRegisterSubmit = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setSuccess(false);
      })
      .finally(() => {
        setInfoTooltip(true);
      });
  };

  const handleLoginSubmit = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setloggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 — не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден ");
        }
        setInfoTooltip(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setloggedIn(false);
    history.push("/sign-in");
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} signOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmDelete}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLoginSubmit} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegisterSubmit} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
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
        <ConfirmationPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
