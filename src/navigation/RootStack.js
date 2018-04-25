import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import DrawerContent from './DrawerContent'
import CustomerSplashScreen from '../containers/CustomerSplashScreen';
import Main from '../containers/Main';
import Login from '../containers/Login';
import About from '../containers/About';
import IPSetting from '../containers/IPSetting';
import Deep from '../containers/Deep';

const DrawerStack = DrawerNavigator(
    {
        Main: {
            screen: Main,
        },
        About: {
            screen: About,
        },
        IPSetting: {
            screen: IPSetting,
        }
    }, {
        // define customComponent here
        contentComponent: DrawerContent,
    }
)

export const RootStack = StackNavigator(
    {
        CustomerSplashScreen: {
            screen: CustomerSplashScreen,
        },
        Drawer: {
            screen: DrawerStack
        },
        Login: {
            screen: Login,
        },
        IPSetting: {
            screen: IPSetting,
        },
        Deep: {
            screen: Deep,
        }
    },
    {
        initialRouteName: 'CustomerSplashScreen',
        navigationOptions: { header:  null  }
    }
);