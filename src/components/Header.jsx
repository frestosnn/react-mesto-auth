import headerLogoPath from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogoPath} alt="Логотип сервиса Место" />
    </header>
  );
}

export default Header;
