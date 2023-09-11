import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form">
        <input className="sign__input" placeholder="Email"></input>

        <input className="sign__input" placeholder="Пароль"></input>

        <button className="sign__button"></button>
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
