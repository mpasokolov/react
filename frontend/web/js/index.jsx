import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import initStore from './utils/store';
import { validateToken } from './actions/authActions';
import { getCookie } from './components/Cockie';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const store = initStore([middleware]);

let token =  getCookie('jwt_token');
if (token) {
    store.dispatch(validateToken(token));
}

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
