import {DrawerItems, SafeAreaView} from "react-navigation";
import {Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import React from 'react';
import MyDrawerItem from "./MyDrawerItem";
import HomePage from "../HomePage";

const nativeImageSource = require('nativeImageSource');

export default class MyDrawerContentComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let ic_home = {
            android: 'mipmap/ic_homepage',
        };
        let ic_moment = {
            android: 'mipmap/ic_moment',
        };
        let ic_setting = {
            android: 'mipmap/ic_setting',
        };
        let ic_share = {
            android: 'mipmap/ic_share',
        };
        let ic_about = {
            android: 'mipmap/ic_about',
        };
        let ic_location = {
            android: 'mipmap/location',
        };
        let pic = 'http://s3.sinaimg.cn/mw600/001napbCty6OyiogZN012&690.jpg';
        return (
            <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>

                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.imgStyle}
                               source={{uri: pic}}/>
                    </View>

                    <MyDrawerItem img={ic_home}
                                  title={'首页'}
                                  lable={'HomePage'}
                                  nav={this.props.navigation}/>

                    <MyDrawerItem img={ic_moment}
                                  title={'实景天气'}
                                  lable={'ImageWeather'}
                                  nav={this.props.navigation}/>

                    <MyDrawerItem img={ic_location}
                                  title={'城市管理'}
                                  lable={'City'}
                                  nav={this.props.navigation}/>

                    <View style={{height: 0.5, backgroundColor: '#bfbfbf', marginTop: 10, marginBottom: 10}}/>

                    <MyDrawerItem img={ic_setting}
                                  title={'功能设置'}
                                  lable={'Setting'}
                                  nav={this.props.navigation}/>

                    <MyDrawerItem img={ic_share}
                                  title={'分享'}
                                  lable={'ShareToFriends'}
                                  nav={this.props.navigation}/>

                    <MyDrawerItem img={ic_about}
                                  title={'关于'}
                                  lable={'About'}
                                  nav={this.props.navigation}/>

                </SafeAreaView>
            </ScrollView>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgStyle: {
        flex: 1,
        // 设置宽度
        width: 250,
        // 设置高度
        height: 150,
        resizeMode: 'cover',
        //marginTop: 30,
    },
    itemContainer: {
        height: 45,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginTop: 10
    }
});