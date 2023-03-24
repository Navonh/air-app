import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppNavigator from './navigations';
import './css/app.css';
import './css/body.css'
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  
  return (
    <Provider store={store}>
      <div className='app-container'>
        <div id='inner'>
          <Router>
            <Sidebar />
            <AppNavigator />
          </Router>
        </div>
      </div>
    </Provider>
  );
};

export default App;