import React from "react";
import { Link } from "react-router-dom";




const Register = ({onRegister}) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // const handlePassChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onRegister({
      email,
      password: password,
    });
  };
    return (
      <div className="register">
        <p className="register__welcome">
            Пожалуйста, зарегистрируйтесь.
        </p>
        <form onSubmit={handleSubmit} className="register__form">
          <label htmlFor="username">
            Логин:
          </label>
          <input id="username" name="username" type="text"  onChange={handleChange} />
          <label htmlFor="email">
            Email:
          </label>
          <input id="email" name="email" type="email" value={email} onChange={handleChange} />
          <label htmlFor="password">
            Пароль:
          </label>
          <input id="password" name="password" type="password" value={password} onChange={handleChange} />
          <label htmlFor="confirmPassword">
            Повторите пароль:
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={setPassword} onChange={handleChange} />
          <label htmlFor="calGoal">
            Калории за день:
          </label>
          <input id="calGoal" name="calGoal" type="number" onChange={handleChange} />
          <div className="register__button-container">
            <button type="submit" onSubmit={handleSubmit} className="register__link">Зарегистрироваться</button>
          </div>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="login" className="register__login-link">Войти</Link>
        </div>
        </div>
      );
}

export default Register;