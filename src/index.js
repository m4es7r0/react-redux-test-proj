import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './store';

import './styles/index.scss';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);