import '../index.css';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { api } from '../utils/Api.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [isLoggedIn, setLoggedIn] = useState(false);

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleChangeInfoTooltipStatus = () => {
    setInfoTooltipPopupOpen(state => !state);
  };

  const handleLogin = () => {
    setLoggedIn(state => !state);
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const tokenCheck = () => {
    //если есть токен в LocalStorage
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        //отправляем запрос на сервер
        auth.getUser(jwt).then(res => {
          if (res) {
            //получили данные об email
            const userData = {
              email: res.data.email
            };

            //поменяли стейт
            setLoggedIn(true);

            //изменили email
            setEmail(userData.email);

            //отправили на страницу
            navigate('/', { replace: true });
          }
        });
      }
    }
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(state => !state);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(state => !state);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(state => !state);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  //эта функция передается по ссылке onUpdateUser в EditProfilePopup
  const handleUpdateUser = obj => {
    api
      .editUserInfo(obj)
      .then(res => {
        //обновляем  глобальный контекст
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = data => {
    api
      .changeAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then(res => {
        setCards(state => (state = res));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleCardDelete = cardId => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(state => state.filter(card => card._id !== cardId));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCardLike = card => {
    // Определяем, лайкнута ли карточка
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    // В зависимости от того, лайкнута карточка или нет, отправляем разные запросы к API
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then(updatedCard => {
          //как работает проверка: если в массиве карточек стейта есть карточка из res(т е updatedCard)(то есть, это значит, что текущая карточка была изменена), то мы заменяем эту карточку на обновленную(то есть, новую версию карточки, где обновлен массив likes), если нет,то оставляем без изменений.
          setCards(state => state.map(c => (c._id === updatedCard._id ? updatedCard : c)));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // Если карточка не лайкнута, отправляем запрос на добавление лайка
      api
        .addLike(card._id)
        .then(updatedCard => {
          setCards(state => state.map(c => (c._id === updatedCard._id ? updatedCard : c)));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleAddPlaceSubmit = newCard => {
    api
      .postNewCard(newCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <>
              <Header text={'Регистрация'} />
              <Login
                handleLogin={handleLogin}
                onChangeStatus={handleChangeInfoTooltipStatus}
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
              />
            </>
          }
        ></Route>

        <Route
          path="/sign-up"
          element={
            <>
              <Header text={'Войти'} />
              <Register
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
                onChangeStatus={handleChangeInfoTooltipStatus}
              />
            </>
          }
        ></Route>

        <Route
          path="/"
          element={
            <ProtectedRouteElement loggedIn={isLoggedIn}>
              <Header email={email} text={'Выйти'} />

              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />

              <ImagePopup card={selectedCard} onClose={closeAllPopups} />

              <Footer />
            </ProtectedRouteElement>
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
