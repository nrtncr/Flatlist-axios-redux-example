/**
 * @format
 */
import 'react-native-gesture-handler';

import App from './App';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux'
import React from 'react';
import {name as appName} from './app.json';
import configureStore from './src/redux/reducers/configureStore'

const store = configureStore();

const Redux = () =>(
    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
