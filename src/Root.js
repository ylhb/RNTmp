import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store/index.js'
import App from './containers/App';

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}