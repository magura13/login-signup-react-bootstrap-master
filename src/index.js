import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignUpPage from './routes/SignUpPage';
import Login from './routes/Login';
import WelcomePage from './routes/Welcome';
import { LanguageProvider } from './context/LanguageContext';
import './custom.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LanguageProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </LanguageProvider>
);

reportWebVitals();
