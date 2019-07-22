import {createStackNavigator, createSwitchNavigator, createAppContainer} from "react-navigation";
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import WebViewPage from '../page/WebViewPage';
import DetailPage from '../page/DetailPage';
import SortKeyPage from '../page/SortKeyPage';
import SearchPage from '../page/SearchPage';
import CustomKeyPage from '../page/CustomKeyPage';
import AboutPage from '../page/about/AboutPage';
import AboutMePage from '../page/about/AboutMePage';
import CodePushPage from '../page/CodePushPage';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';

export const rootCom = 'Init';

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,
        }
    }
});
const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            header: null,// block StackNavigator's Navigation Bar
        }
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            header: null,
        }
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            header: null,
        }
    },
    AboutMePage: {
        screen: AboutMePage,
        navigationOptions: {
            header: null,
        }
    },
    CustomKeyPage: {
        screen: CustomKeyPage,
        navigationOptions: {
            header: null,
        }
    },
    SortKeyPage: {
        screen: SortKeyPage,
        navigationOptions: {
            header: null,
        }
    },
    SearchPage: {
        screen: SearchPage,
        navigationOptions: {
            header: null,
        }
    },
    CodePushPage: {
        screen: CodePushPage,
        navigationOptions: {
            header: null,
        }
    },
}, {
    defaultNavigationOptions: {
        header: null,
    }
});
export const RootNavigator = createAppContainer(createSwitchNavigator({
    [rootCom]: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,
    }
}));
/**
 * 1.Initialize react-navigation and Redux Middleware
 * One of the great functions of this method is to set actionSubscribers (behavior subscribers) for the key of createReduxContainer.
 * @https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * @https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);

/**
 * 2.Pass the root navigator component to the createReduxContainer function.
 * And return a new component that takes navigation state and dispatch functions as props.
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * State - Props relationship
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,//v2
});
/**
 * 3.connect React and Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);