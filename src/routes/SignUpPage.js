import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUp } from "../services/SignUp";
import { useLanguage } from '../context/LanguageContext';

function SignUpPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
  
    const data = { userName, email, password };
    try {
      const response = await SignUp(data);
  
      if (response && response.status === 200) {
        alert('Registered Successfully!');
        navigate("/login");
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert("Email / UserName / Password already exists");
        } else if (error.response.data && error.response.data.ValidationErrors) {
          const validationErrors = error.response.data.ValidationErrors.map(err => err.msg).join('\n');
          alert(validationErrors);
        } else {
          alert('An error occurred. Please try again.');
        }
      } else {
        alert("Unable to connect to the server. Please check your internet connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  const texts = {
    en: {
      header: 'Sign Up',
      userName: 'User Name',
      email: 'Email address',
      password: 'Password (Password must contain at least one number, one uppercase and one lowercase letter, and be 6-20 characters long)',
      signUpButton: 'Sign up'
    },
    pt: {
      header: 'Cadastre-se',
      userName: 'Nome de Usuário',
      email: 'Endereço de Email',
      password: 'Senha (A senha deve conter pelo menos um número, uma letra maiúscula e uma letra minúscula, e ter de 6 a 20 caracteres de comprimento.)',
      signUpButton: 'Cadastrar'
    }
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <h1 className="display-5 fw-bold ls-tight mb-4">
            {texts[language].header}
          </h1>
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" id="form3Example1" className="form-control" />
                  <label className="form-label" htmlFor="form3Example1">
                    {texts[language].userName}
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example3" className="form-control" />
                  <label className="form-label" htmlFor="form3Example3">
                    {texts[language].email}
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4" className="form-control" />
                  <label className="form-label" htmlFor="form3Example4">
                    {texts[language].password}
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-block"
                  style={{ backgroundColor: '#000', color: '#fff' }}
                  disabled={isLoading || !userName || !email || !password}
                >
                  {texts[language].signUpButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;