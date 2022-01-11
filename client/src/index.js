import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBarLayout from './components/NavBarLayout';
import ContentLayout from './components/ContentLayout';


ReactDOM.render(
  <React.StrictMode>
 
    <Router>
 
          <Layout>
            <NavBarLayout />
            <ContentLayout>
              <App/>  
            </ContentLayout>
          </Layout>

    </Router>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
