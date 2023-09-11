function Login() {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form">
        <input className="sign__input" placeholder="E-mail"></input>

        <input className="sign__input" placeholder="Пароль"></input>

        <button className="sign__button" onSubmit={handleSubmit}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
