import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import { renderRoutes } from 'react-router-config'
//import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
//import routes from './router'
import store from './store'
import './assets/css/overWrite.css'

ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
    document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


