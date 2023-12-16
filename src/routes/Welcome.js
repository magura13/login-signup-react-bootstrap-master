import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLanguage } from '../context/LanguageContext';

function WelcomePage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
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
      text: [
        "Seja Bem-vindo ao Nosso Projeto! Este projeto está hospedado em plataformas gratuitas de deploy, então a primeira requisição pode ser um pouco lenta. Agradecemos a sua paciência e esperamos que você possa interagir com o que está criado. ",
        "Nosso objetivo é aprofundar conhecimentos em Node.js, Programação Orientada a Objetos (POO) e React, experimentando na prática o que aprendemos. ",
        "Ficamos felizes por você estar aqui conosco! Este projeto foi construído por ",
        { text: "Samuel Salvador", url: "https://github.com/SimpleDevSam" },
        " e ",
        { text: "Tiago Lelis", url: "https://github.com/magura13" },
        ".  Adoraríamos receber o seu feedback sobre a experiência!"
      ],
      signUp: 'Cadastre-se'
    },
    en: {
      welcome: 'Welcome',
      text: [
        "Welcome to Our Project! This project is hosted on free deploy platforms, so the initial response might be a bit slow. We appreciate your patience and hope you enjoy exploring and interacting with what we've created. ",
        "Our aim is to deepen our knowledge in Node.js, Object-Oriented Programming (OOP), and React, putting into practice what we've learned. ",
        "We're thrilled to have you here with us! This project has been developed with great dedication and enthusiasm by ",
        { text: "Samuel Salvador", url: "https://github.com/SimpleDevSam" },
        " and ",
        { text: "Tiago Lelis", url: "https://github.com/magura13" },
        ". We would love to receive your feedback on the experience!"
      ],
      signUp: 'Sign Up Now'
    }
  };
  
  

  return (
    <div className="container-fluid h-100" style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100vh' }}>
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col-12 col-md-8 col-lg-6 text-center">
          {!showDetails && (
            <>
              <h1 className="display-5 fw-bold ls-tight mb-5">
                Welcome/Bem Vindo
              </h1>
              <h3 className="mb-5">
                Choose a language/Escolha um idioma
              </h3>
              <button onClick={() => handleLanguageSelect('en')} className="btn btn-secondary m-2" style={{ backgroundColor: '#000', color: '#fff' }}>EN-US</button>
              <button onClick={() => handleLanguageSelect('pt')} className="btn btn-secondary m-2" style={{ backgroundColor: '#000', color: '#fff' }}>PT-BR</button>
            </>
          )}
          {showDetails && (
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <p style={{ color: '#000' }} className="mb-9 mt-5">
              {texts[language].text.map((part, index) => 
                typeof part === 'string' 
                  ? part 
                  : <a key={index} href={part.url} target="_blank" rel="noopener noreferrer">{part.text}</a> 
              )}
            </p>
            <button 
              className="btn btn-block mb-4" 
              onClick={navigateToSignUp}
              style={{ backgroundColor: '#000', color: '#fff' }}>
              {texts[language].signUp}
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
