import React from 'react'
import {DrawerNavigator} from 'react-navigation'

import HomePage from './HomePage'
import MyDrawerContentComponent from "./weigth/MyDrawerContentComponent";
import ImageWeather from "./ImageWeather";
import Setting from "./Setting";
import About from "./About";
import City from "./City";


const MyApp = DrawerNavigator({
    HomePage: {
        screen: HomePage,
    },
    ImageWeather: {
        screen: ImageWeather,
    },
    Setting: {
        screen: Setting,
    },
    City: {
        screen: City,
    },
    About: {
        screen: About,
    }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    drawerWidth: 250,
    contentComponent: MyDrawerContentComponent,
    tabBarOptions: {
        activeTintColor: '#1be9d3',
        inactiveTintColor: '#464240',
        showIcon: true,
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        labelStyle: {
            fontSize: 16,
            textAlign: 'center',
        },
        style: {
            backgroundColor: '#f3f3f3',
        },
    },

});


export default MyApp;