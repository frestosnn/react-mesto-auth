import { useNavigate } from 'react-router-dom';
import headerLogoPath from '../images/logo.svg';
import { useState } from 'react';

function Header({ email, text }) {
  const navigate = useNavigate();
  const [signedIn, setSignIn] = useState(false);

  const signOut = () => {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
    setSignIn(false);
  };

  const signUp = () => {
    navigate('/sign-up', { replace: true });
    setSignIn(true);
  };

  return (
    <header className="header">
      <img className="header__logo" src={headerLogoPath} alt="Логотип сервиса Место" />
      <div className="header__container">
        <p className="header__text">{email}</p>
        <button onClick={signedIn ? signOut : signUp} className="header__link">
          {text}
        </button>
      </div>
    </header>
  );
}

export default Header;
