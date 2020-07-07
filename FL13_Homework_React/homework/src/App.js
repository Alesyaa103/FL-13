import React from 'react';
import './App.css';
import Routing from './containers/Routing';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <header className="App-header">Learn</header>
      <Provider store={store}>
        <BrowserRouter>
          <section className="wrapper">
            <Routing />
          </section> 
        </BrowserRouter>
      </Provider>
      <footer className="App-footer">@Videocourses. All Rights Reserved</footer>
    </div>
    );
  }

export default App;
