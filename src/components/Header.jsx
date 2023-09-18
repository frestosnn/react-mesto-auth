import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import headerLogoPath from '../images/logo.svg';

function Header({ email, handleLogin }) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('jwt');

    navigate('/sign-in', { replace: true });

    handleLogin();
  };

  return (
    <>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <header className="header">
              <img className="header__logo" src={headerLogoPath} alt="Логотип сервиса Место" />
              <div className="header__container">
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              </div>
            </header>
          }
        />
        <Route
          path="/sign-up"
          element={
            <header className="header">
              <img className="header__logo" src={headerLogoPath} alt="Логотип сервиса Место" />
              <div className="header__container">
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              </div>
            </header>
          }
        />
        <Route
          path="/"
          element={
            <header className="header">
              <img className="header__logo" src={headerLogoPath} alt="Логотип сервиса Место" />
              <div className="header__container">
                <p className="header__text">{email}</p>
                <Link to="sign-in" onClick={signOut} className="header__link">
                  Выйти
                </Link>
              </div>
            </header>
          }
        />
      </Routes>
    </>
  );
}

export default Header;
