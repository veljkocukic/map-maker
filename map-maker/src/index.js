import React from 'react';
import ReactDOM from 'react-dom';
import { DataProvider } from "./Data"
import './index.css';
import App from './App';


ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById('root')
);

