import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigators';
import store from './store'

type Props = {};
export default class App extends Component<Props> {
    render() {
        /**
         * Pass the store to the App framework
         */
        return <Provider store={store}>
            <AppNavigator/>
        </Provider>
    }
}
