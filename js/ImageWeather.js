import React from 'react'
import {
    Image, StatusBar, Text, TouchableNativeFeedback, View, FlatList, ToastAndroid,
    DeviceEventEmitter, NativeModules, Dimensions, StyleSheet
} from "react-native";
import HomePage from "./HomePage";
import IMAGE_WEATHER from './json/imageWeather.json'
import PubImageWeather from "./PubImageWeather";


const nativeImageSource = require('nativeImageSource');
let menu_heart = {
    android: 'mipmap/ic_image_weather_praise',
};
let menu_add = {
    android: 'mipmap/ic_menu_add',
};

var lastUpdateTime = 0;
const {width, height} = Dimensions.get('window');


export default class ImageWeather extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'ImageWeather',
        tabBarIcon: ({tintColor}) => (
            <Image style={{width: 26, height: 26}}
                   source={{uri: 'http://s3.sinaimg.cn/mw600/001napbCty6OyiogZN012&690.jpg'}}
            />
        ),
    };

    constructor(props) {
        super(props)
        this.state = {
            refreshing: true,
            imageWeather: IMAGE_WEATHER,
        }
    }

    componentWillMount() {
        NativeModules.MyMoudle.getImageWeather((weather) => {
            this.setState({
                imageWeather: weather === null ? this.state.weather : weather,
                refreshing: false
            })
        });
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('nativeCallRn', (weather) => {
            var title = 'React Native界面收到的数据：' + weather.length;
            ToastAndroid.show(title, ToastAndroid.SHORT);
        })
    }

    _renderItem = (item, index) => {

        return (
            <View style={{flex: 1, flexDirection: 'row', margin: 10}}
                  key={index}>
                <Image source={{uri: item.headUrl}}
                       style={{width: 30, height: 30, resizeMode: 'cover'}}/>
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginRight: 10}}>
                    <Text style={{color: '#000000', fontSize: 14}}>{item.userName}</Text>
                    <Text>{item.say}</Text>

                    <Image source={{uri: item.imageUrl}}
                           style={{
                               width: Dimensions.get('window').width -60,
                               height: 200,
                               resizeMode: 'contain',
                               marginTop: 10,
                               marginBottom: 10,
                           }}/>


                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{flex: 1, marginRight: 10}}
                              numberOfLines={1}>{item.location}</Text>
                        <TouchableNativeFeedback onPress={() => this._praise(index)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                    style={{width: 20, height: 20, resizeMode: 'center', marginRight: 5, marginLeft: 5}}
                                    source={nativeImageSource(menu_heart)}/>
                            </View>

                        </TouchableNativeFeedback>

                        <Text>{item.praise}</Text>

                    </View>
                </View>
            </View>
        )

    }

    _space() {
        return (<View style={{height: 0.5, backgroundColor: '#dbdbdb'}}/>)
    }

    _onRefresh = () => {
        NativeModules.MyMoudle.getImageWeather((weather) => {
            ToastAndroid.show('已更新为最新实景天气', ToastAndroid.SHORT);
            this.setState({
                imageWeather: weather,
                refreshing: false
            })
        });
    }


    //点赞
    _praise = (index) => {
        const time = new Date().getTime();
        if (time - lastUpdateTime > 10000) {
            const weather = this.state.imageWeather;
            const id = weather[index].id;
            const praise = weather[index].praise + 1;

            NativeModules.MyMoudle.praise(id, praise, () => {
                NativeModules.MyMoudle.getImageWeather((weather) => {
                    lastUpdateTime = new Date().getTime();
                    this.setState({
                        imageWeather: weather,
                    })
                });
            });
        } else {
            ToastAndroid.show("您的操作过于频繁，请稍后重试！", ToastAndroid.SHORT);
        }
    }

    //发布
    _pubImageWeather = () => {
        NativeModules.MyMoudle.pubImageWeather((weather) => {
            this._onRefresh();
        });
    };


    render() {
        let menu_back = {
            android: 'mipmap/ic_back',
        };

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#00b7a6'
                           translucent={true}/>
                {/*TitleBar*/}
                <View style={{
                    marginTop: StatusBar.currentHeight,
                    backgroundColor: '#00b7a6',
                    height: 45,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                        <Image source={nativeImageSource(menu_back)}
                               style={{width: 30, height: 30, resizeMode: 'center', marginLeft: 5}}
                        />
                    </TouchableNativeFeedback>
                    <View>
                        <Text style={{textAlign: 'center', fontSize: 20, color: 'white', marginLeft: 10}}>身边此刻</Text>
                    </View>
                </View>

                <FlatList style={{marginBottom: 0}}
                          data={this.state.imageWeather}
                          renderItem={({item, index}) => this._renderItem(item, index)}
                          ItemSeparatorComponent={this._space}
                          onRefresh={this._onRefresh}
                          refreshing={this.state.refreshing}
                          keyExtractor={(item, index) => {
                              return 'key' + index;
                          }}
                />

                <View style={styles.addContainer}>
                    <TouchableNativeFeedback onPress={this._pubImageWeather}>
                        <Image style={styles.add}
                               source={nativeImageSource(menu_add)}/>
                    </TouchableNativeFeedback>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    addContainer: {
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
    add: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
});