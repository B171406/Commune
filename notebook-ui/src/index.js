import React from 'react';
import ReactDOM from 'react-dom';
import '/home/quanteon/notebook1/notebook-ui/src/styles/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store'; // Adjust path based on your project structure
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18next from 'i18next';
import french from '../src/locales/fr.json';
import english from '../src/locales/en.json';
import hindhi from '../src/locales/hn.json'
import { AuthProvider } from './utils/auth';

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: english,
    },
    fr: {
      global: french,
    },
    hn:{
      global: hindhi,
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </I18nextProvider>
);


