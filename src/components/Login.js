import React from "react";
import SignForm from "./SignForm";

const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <SignForm
      onSubmit={handleSubmit}
      classAuth="auth__register"
      authTitle="Вход"
      formName="authLogin"
      formClass="auth__form auth__form_register"
      textBtn={"Войти"}
    >
      <label className="auth__input-error">
        <input
          name="email"
          type="email"
          aria-label="электронная почта"
          placeholder="Email"
          value={email || ""}
          onChange={handleEmailChange}
          required
          className="auth__input auth__input_type_email"
        />
        <span className="name-input-error auth__error auth__error_visible"></span>
      </label>
      <label className="auth__input-error">
        <input
          name="password"
          type="password"
          aria-label="Пароль"
          placeholder="Пароль"
          value={password || ""}
          onChange={handlePasswordChange}
          required
          className="auth__input auth__input_type_userjob"
        />
        <span className="password-input-error auth__error auth__error_visible"></span>
      </label>
    </SignForm>
  );
};

export default Login;
