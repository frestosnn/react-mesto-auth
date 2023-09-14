import { useState } from 'react';
import * as auth from '../utils/Auth.js';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import signImagePath from '../images/sign-bad.svg';

function Login({ handleLogin, onChangeStatus, isOpen, onClose }) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    //получаем здесь e.target.name и e.target.value
    const { name, value } = e.target;

    //а здесь присваиваем e.target.name: e.target.value
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //деструктурируем стейт formValue
    const { email, password } = formValue;

    //отправляем запрос
    auth.authorize(email, password).then(res => {
      if (res) {
        //вызываем функцию изменения состояния loggedIn
        handleLogin();

        //сбасываем поля
        setFormValue({ email: '', password: '' });

        navigate('/', { replace: true });
      } else {
        //если токена нет, то открываем попап
        onChangeStatus();
      }
    });
  };

  return (
    <>
      <InfoTooltip
        isOpen={isOpen}
        onClose={onClose}
        text="Что-то пошло не так! Попробуйте еще раз."
        src={signImagePath}
      />
      <div className="sign">
        <h2 className="sign__title">Вход</h2>
        <form className="sign__form" onSubmit={handleSubmit}>
          <input
            className="sign__input"
            placeholder="E-mail"
            value={formValue.email}
            onChange={handleChange}
            name="email"
          ></input>

          <input
            className="sign__input"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange}
            name="password"
          ></input>

          <button className="sign__button" onSubmit={handleSubmit}>
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
