import React, {Component} from 'react';
import {createBottomTabNavigator, createAppContainer} from "react-navigation";
import {connect} from 'react-redux';
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EventTypes from '../util/EventTypes';
import {BottomTabBar} from 'react-navigation-tabs';
import EventBus from 'react-native-event-bus'

type Props = {};

const TABS = {//Configure page routing here
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "Hot",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    TrendingPage:
        {
            screen: TrendingPage,
            navigationOptions: {
                tabBarLabel: "Trending",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={'md-trending-up'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        }
    ,
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "Star",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    }
    ,
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "MyPage",
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    }
};

class DynamicTabNavigator extends Component<Props> {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};//根据需要定制显示的tab
        PopularPage.navigationOptions.tabBarLabel = 'Hot';//动态配置Tab属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
                tabBarComponent: props => {
                    return <TabBarComponent theme={this.props.theme} {...props}/>
                }
            }
        ))
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab
            onNavigationStateChange={(prevState, newState, action) => {
                EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {//发送底部tab切换的事件
                    from: prevState.index,
                    to: newState.index
                })
            }}
        />
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme.themeColor}
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);
