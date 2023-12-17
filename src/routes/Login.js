import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginService } from '../services/Login';
import { useLanguage } from '../context/LanguageContext';

function Login() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const texts = {
    en: {
      header: 'Login',
      emailLabel: 'Email address',
      passwordLabel: 'Password',
      signInButton: 'Sign In',
      invalidCredentials: 'Invalid email/password',
      errorOccurred: 'An error occurred. Please try again.',
      loggedInSuccess: 'Logged Successfully! Here is your AccessToken: '
    },
    pt: {
      header: 'Entrar',
      emailLabel: 'Endereço de email',
      passwordLabel: 'Senha',
      signInButton: 'Entrar',
      invalidCredentials: 'Email/senha inválidos',
      errorOccurred: 'Ocorreu um erro. Por favor, tente novamente.',
      loggedInSuccess: 'Login efetuado com sucesso! Aqui está o seu AccessToken: '
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const data = { email, password };
    try {
      const response = await LoginService(data);
      if (response.accessToken) {
        setEmail("");
        setPassword("");
        alert(texts[language].loggedInSuccess + response.accessToken);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(texts[language].invalidCredentials);
      } else {
        setError(texts[language].errorOccurred);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid h-100" style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 mb-5 text-center">
          <h1 className="my-5 display-3 fw-bold ls-tight">
            {texts[language].header} <br />
          </h1>
        </div>
        <div className="col-lg-6 mb-5">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example3" className="form-control" />
                  <label className="form-label" htmlFor="form3Example3">
                    {texts[language].emailLabel}
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4" className="form-control" />
                  <label className="form-label" htmlFor="form3Example4">
                    {texts[language].passwordLabel}
                  </label>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#000', color: '#fff' }} disabled={isLoading}>
                    {texts[language].signInButton}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
