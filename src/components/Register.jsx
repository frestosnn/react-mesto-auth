import { Link, Navigate, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import { useState } from 'react';
import * as auth from '../utils/Auth.js';

function Register() {
  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  });

  const handleSubmit = e => {
    e.preventDefault();

    //деструктурируем стейт formValue
    const { password, email } = formValue;
    console.log(password, email);

    //отправляем данные на сервер из formValue
    auth.register(password, email);

    //после регистрации направляем на страницу входа
    <Navigate to="/sign-in" replace />;
  };

  const handleChange = e => {
    //получаем здесь e.target.name и e.target.value
    const { name, value } = e.target;

    //а здесь присваиваем e.target.name: e.target.value
    setFormValue({ ...formValue, [name]: value });
  };

  return (
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
        ></input>

        <input
          type="text"
          className="sign__input"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          name="password"
        ></input>

        <button className="sign__button">Зарегистрироваться</button>
      </form>
      <p className="sign__span">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="sign__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
