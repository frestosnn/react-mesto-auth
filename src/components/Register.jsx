import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import * as auth from '../utils/Auth.js';

function Register({ onChangeStatus, handleLogin }) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = e => {
    e.preventDefault();

    //деструктурируем стейт formValue
    const { email, password } = formValue;

    //отправляем данные на сервер из formValue
    auth
      .register(email, password)
      .then(res => {
        //если res существует
        if (res) {
          //то меняем стейт попапа-подтверждения на true
          onChangeStatus();

          //меняем стейт isLogged пользователя
          handleLogin(email);

          //направляем на главную страницу
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = e => {
    //получаем здесь e.target.name и e.target.value
    const { name, value } = e.target;

    //а здесь присваиваем e.target.name: e.target.value
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <div className="sign">
        <h2 className="sign__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="sign__form">
          <input
            type="email"
            className="sign__input"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
            name="email"
          />

          <input
            type="password"
            className="sign__input"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange}
            name="password"
          />

          <button className="sign__button">Зарегистрироваться</button>
        </form>
        <p className="sign__span">
          Уже зарегистрированы?{' '}
          <Link to="/sign-in" className="sign__link">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
