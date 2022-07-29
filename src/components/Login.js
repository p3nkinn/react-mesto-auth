import React from "react";





const Login = ({onLogin}) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onLogin({
      email,
      password: password,
    });
  };
    return (
      <>
      onSubmit={handleSubmit}
      classPopup="auth__login" popupTitle="Зарегистрироваться"
      formName="authLogin" formClass="popup__form popup__form_login"
      textBtn={"Войти"}
      classBtn="popup__close popup__close_login"
      
      <label className="popup__input-error">
        <input
          id="email-input"
          name="email"
          type="text"
          value={email ? email : ""}
          onChange={handleEmailChange}
          required
          className="popup__input popup__input_type_email"
        ></input>
        <span className="name-input-error popup__error popup__error_visible"></span>
      </label>
      <label className="popup__input-error">
        <input
          id="password-input"
          name="password"
          type="text"
          value={password ? password : ""}
          onChange={handlePassChange}
          required
          className="popup__input popup__input_type_password"
        />
        <span className="job-input-error popup__error popup__error_visible"></span>
      </label>
      </>
      );
}

export default Login;