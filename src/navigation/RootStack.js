import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import DrawerContent from './DrawerContent'
import CustomerSplashScreen from '../containers/CustomerSplashScreen';
import Main from '../containers/Main';
import Login from '../containers/Login';
import About from '../containers/About';

const DrawerStack = DrawerNavigator(
    {
        Main: {
            screen: Main,
        },
        About: {
            screen: About,
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
        Login: {
            screen: Login,
        },
        Drawer: {
            screen: DrawerStack
        }
    },
    {
        initialRouteName: 'CustomerSplashScreen',
        navigationOptions: { header:  null  }
    }
);