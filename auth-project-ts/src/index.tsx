import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store'
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
        <ToastContainer autoClose={8000} pauseOnHover={false} />
        <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

