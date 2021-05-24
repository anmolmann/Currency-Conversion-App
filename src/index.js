import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './component/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

ReactDOM.render(
  <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
          <App />
      </Suspense>
      <div className={"row","timestamp"}>
          {date} {time}
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
