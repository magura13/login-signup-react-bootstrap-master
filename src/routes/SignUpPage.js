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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { userName, email, password };
    try {
      const response = await SignUp(data);
      if (response.response.default === "User added successfully") {
        setUserName("");
        setEmail("");
        setPassword("");
        alert('Logged Successfully!')
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Email / UserName / Password already exists");
      } else if (error.response.data.ValidationErrors[0].msg === "Password must contain at least one number, one uppercase and one lowercase letter, and be 6-20 characters long") {
        alert("Password must contain at least one number, one uppercase and one lowercase letter, and be 6-20 characters long");
      } 
      else {
        console.log(error);
      }
    }
  };

  const texts = {
    en: {
      header: 'Sign Up',
      userName: 'User Name',
      email: 'Email address',
      password: 'Password',
      signUpButton: 'Sign up'
    },
    pt: {
      header: 'Cadastre-se',
      userName: 'Nome de Usuário',
      email: 'Endereço de Email',
      password: 'Senha',
      signUpButton: 'Cadastrar'
    }
  };

  return (
    <div className="container-fluid h-100" style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100vh' }}>
      <div className="row h-100">
        <div className="col-12 d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
          <section style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
            <div className="text-center">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                {texts[language].header} <br />
                <span className="text-primary">Page</span>
              </h1>
            </div>
          </section>

          <div className="card my-5">
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
                <button type="submit" className="btn btn-primary btn-block mb-4">
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