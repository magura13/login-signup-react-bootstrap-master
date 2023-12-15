import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLanguage } from '../context/LanguageContext';

function WelcomePage() {
  const navigate = useNavigate();
  const { language ,setLanguage } = useLanguage(); 
  const [showDetails, setShowDetails] = useState(false);

  const navigateToSignUp = () => {
    navigate('/signup');
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowDetails(true);
  };

  const texts = {
    pt: {
      welcome: 'Bem vindo',
      text: 'Texto aqui here',
      signUp: 'Cadastre-se'
    },
    en: {
      welcome: 'Welcome',
      text: 'text here here',
      signUp: 'Sign Up Now'
    }
  }
  
  return (
    <div className="container-fluid h-100" style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100vh' }}>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <h1 className="display-5 fw-bold ls-tight">
            {language ? texts[language].welcome : 'Select Language/Selecione o idioma'}
          </h1>
          {!showDetails && (
            <>
              <button onClick={() => handleLanguageSelect('en')} className="btn btn-secondary m-2">EN-US</button>
              <button onClick={() => handleLanguageSelect('pt')} className="btn btn-secondary m-2">PT-BR</button>
            </>
          )}
          {showDetails && (
            <>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                {texts[language].text}
              </p>
              <button className="btn btn-primary btn-block mb-4" onClick={navigateToSignUp}>
                {texts[language].signUp}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
