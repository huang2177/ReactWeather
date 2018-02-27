import React from "react";
import {
    DeviceEventEmitter, FlatList, Image, NativeModules, RefreshControl, ScrollView, StatusBar, StyleSheet, Text,
    ToastAndroid, TouchableNativeFeedback, View
} from "react-native";
import NetUtils from "./net/NetUtils";
import Weather from './json/weather.json'
import SuggestionItem from "./weigth/SuggestionItem";
import voice_gif from '../img/voice.gif'
import constans from './constants'
import ImageUtils from './utils/ImageUtils'

var isSpeeching = false;
const nativeImageSource = require('nativeImageSource');
let menu_back = {
    android: 'mipmap/ic_more',
};
let voice_static = {
    android: 'mipmap/ic_menu_voice_3',
};

export default class HomePage extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'HomePage',
        tabBarIcon: ({tintColor}) => (
            <Image style={{width: 26, height: 26}}
                   source={{uri: 'http://s3.sinaimg.cn/mw600/001napbCty6OyiogZN012&690.jpg'}}
            />
        ),
    };

    constructor(props) {
        super(props)
        this.state = {
            city: constans.city,
            refreshing: true,
            weather: Weather,
            voice: nativeImageSource(voice_static)
        }
    }

    render() {
        const aqi = this.state.weather.aqi;
        const now = this.state.weather.now;
        const suggestion = this.state.weather.suggestion;
        const daily_forecast = this.state.weather.daily_forecast;
        const hourly_forecast = this.state.weather.hourly_forecast;

        const week = "星期" + "日一二三四五六".charAt(new Date().getDay());
        return (
            <View
                style={styles.imageBackgroud}>
                <StatusBar backgroundColor='#00000000'
                           translucent={true}/>
                {/*TitleBar*/}
                <View style={{
                    marginTop: StatusBar.currentHeight,
                    height: 45,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Image source={nativeImageSource(menu_back)}
                               style={{width: 30, height: 25, resizeMode: 'center', marginLeft: 5}}

                        />
                    </TouchableNativeFeedback>
                    <View>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'white',
                            marginLeft: 10
                        }}>{this.state.city}</Text>
                    </View>
                </View>


                <ScrollView showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }>
                    {/*今日温度*/}
                    <View style={[styles.childContainer, {flexDirection: 'row'}]}>
                        <Image source={nativeImageSource(ImageUtils.getIconByCode(now.cond.code))}
                               style={{width: 80, height: 80, marginLeft: 10}}/>

                        <View style={{flex: 1,}}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#ffffff',
                                fontSize: 35,
                                fontWeight: 'bold'
                            }}>{now.tmp}℃</Text>
                            <Text style={{
                                textAlign: 'center',
                                color: '#ffffff',
                            }}>{daily_forecast[0]['tmp'].min}℃~{daily_forecast[0]['tmp'].max}℃</Text>
                            <Text style={{
                                textAlign: 'center',
                                color: '#ffffff',
                            }}>体感{now.fl}℃{' ' + aqi['city'].qlty + '  ' + now['wind'].dir + now['wind'].sc}</Text>
                        </View>
                    </View>

                    {/*未来24小时天气预报*/}
                    <View style={[styles.childContainer, {flexDirection: 'row'}]}>
                        <FlatList
                            data={hourly_forecast}
                            horizontal={true}
                            keyExtractor={(item, index) => {
                                return 'key' + index;
                            }}
                            renderItem={({item, index}) => (
                                <View key={index}
                                      style={{
                                          marginLeft: 10,
                                          marginTop: 5,
                                          marginRight: 10,
                                          marginBottom: 5,
                                          justifyContent: 'center'
                                      }}>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#ffffff'
                                        }}>{item.date.substring(11)}</Text>
                                    </View>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        {/*<Image source={nativeImageSource(ic_hourly_forecast_temp)}*/}
                                        {/*style={{width: 15, height: 15, resizeMode: 'contain'}}/>*/}
                                        <Text style={{fontSize: 16, color: '#ffffff',}}>{item.tmp}℃</Text>
                                    </View>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#ffffff',
                                        }}>{item['cond'].txt}</Text>
                                    </View>
                                </View>
                            )}/>
                    </View>

                    {/*未来三天天气详情*/}
                    <View style={[styles.childContainer, {flexDirection: 'row'}]}>
                        <FlatList
                            data={daily_forecast}
                            keyExtractor={(item, index) => {
                                return 'key' + index;
                            }}
                            renderItem={({item, index}) => (
                                <View style={{flexDirection: 'row'}}
                                      key={index}>
                                    <Image source={nativeImageSource(ImageUtils.getIconByCode(item.cond.code_d))}
                                           style={{width: 60, height: 60}}/>

                                    <View style={{flex: 1, margin: 5}}>
                                        <View style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#ffffff',
                                                fontSize: 18,
                                                fontWeight: 'bold'
                                            }}>{index == 0 ? '今天' : index == 1 ? '明天' : week}</Text>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#ffffff',
                                                fontWeight: 'bold'
                                            }}>{item['tmp'].min + '~' + item['tmp'].max}℃</Text>
                                        </View>

                                        <Text style={{color: '#ffffff',}}
                                              numberOfLines={2}>{
                                            (item['cond'].txt_n === item['cond'].txt_d
                                                ? item['cond'].txt_d
                                                : item['cond'].txt_d + '转' + item['cond'].txt_n) + '，' +
                                            item['wind'].dir + item['wind'].sc + '，' +
                                            '紫外线指数' + item.uv + '，' +
                                            '湿度' + item.hum + '%，' +
                                            '日出' + item['astro'].sr + '，' +
                                            '日落' + item['astro'].ss + '.'
                                        }</Text>
                                    </View>
                                </View>
                            )}/>
                    </View>


                    {/*当天注意事项*/}
                    <View style={[styles.childContainer, {flexDirection: 'column'}]}>
                        <SuggestionItem type={'舒适度'}
                                        title={suggestion['comf'].brf}
                                        content={suggestion['comf'].txt}/>

                        <SuggestionItem type={'穿衣'}
                                        title={suggestion['drsg'].brf}
                                        content={suggestion['drsg'].txt}/>

                        <SuggestionItem type={'感冒'}
                                        title={suggestion['flu'].brf}
                                        content={suggestion['flu'].txt}/>

                        <SuggestionItem type={'洗车'}
                                        title={suggestion['cw'].brf}
                                        content={suggestion['cw'].txt}/>

                        <SuggestionItem type={'运动'}
                                        title={suggestion['sport'].brf}
                                        content={suggestion['sport'].txt}/>

                        <SuggestionItem type={'旅游'}
                                        title={suggestion['trav'].brf}
                                        content={suggestion['trav'].txt}/>

                        <SuggestionItem type={'紫外线'}
                                        title={suggestion['uv'].brf}
                                        content={suggestion['uv'].txt}/>
                    </View>
                </ScrollView>

                <View style={styles.voiceContainer}>
                    <TouchableNativeFeedback onPress={() => this._speech(daily_forecast)}>
                        <Image style={styles.voice}
                               source={this.state.voice}/>
                    </TouchableNativeFeedback>
                </View>

            </View>
        );
    }

    _onRefresh = () => {
        const params = {key: '6ee2cc51eff749c1b51cc506a3356d03', city: this.state.city};
        NetUtils.get(params, (data) => {
            this.setState({
                refreshing: false,
            });
            if (data.HeWeather5[0].status === 'ok') {
                this.setState({
                    weather: data.HeWeather5[0],
                });
            }
        })
    };

    _speech = (daily_forecast) => {

        if (!isSpeeching) {
            NativeModules.MyMoudle.speech(daily_forecast[0],);
        } else {
            ToastAndroid.show("正在为您播报，请勿重复点击！", ToastAndroid.SHORT);
        }
    };

    componentDidMount() {
        DeviceEventEmitter.addListener('startSpeek', () => {
            isSpeeching = true;
            this.setState({
                voice: voice_gif,
            });
        });
        DeviceEventEmitter.addListener('finishSpeek', () => {
            isSpeeching = false;
            this.setState({
                voice: nativeImageSource(voice_static),
            });
        });
        if (!constans.isLocationed) {
            NativeModules.MyMoudle.location((city) => {
                this.setState({
                    city: city,
                });
                this._onRefresh();
                constans.city = city;
                constans.isLocationed = true;
            });
        } else {
            this._onRefresh();
        }
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },

    childContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        margin: 10,
        padding: 8,
        alignItems: 'center',

        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 2,
    },

    voiceContainer: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        height: 50,
        width: 50,
        backgroundColor: '#ffda0e',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
        elevation: 5,


    },
    voice: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    imageBackgroud: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#00b7a6'
    }
});