import React from "react";
import {
    Image,
    StatusBar,
    StyleSheet,
    ScrollView,
    Linking,
    SectionList,
    Text,
    TouchableNativeFeedback,
    View
} from "react-native";

const nativeImageSource = require('nativeImageSource');
export default class About extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'About',
        tabBarIcon: ({tintColor}) => (
            <Image
                //source={require('./notify.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };


    _renderSectionHeader = (info) => {
        return (
            <View><Text key={info.section.key} style={{
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                color: '#00b7a6'
            }}>{info.section.key}</Text></View>
        )
    }

    _renderItem = (info, index) => {
        return (
            <TouchableNativeFeedback onPress={() => this.callAction(info)}
                                     key={index}>
                <View style={{padding: 10,}}>
                    <Text style={{color: '#000', fontSize: 16}}
                          key={info.item.title}>{info.item.title}</Text>
                    <Text key={info.item.content}>{info.item.content}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    };

    _separatorCom = () => {
        return (
            <View style={{height: 1, backgroundColor: '#dbdbdb', marginLeft: 10, marginRight: 10}}/>
        )
    };

    // SectionList的点击事件
    callAction = (info) => {
        if (info.item.title === '微博') {
            Linking.openURL(info.item.content)
                .catch((err) => {
                    alert('An error occurred: ' + err)
                });
        } else if (info.item.title === 'githup' || info.item.title === '给我点赞') {
            Linking.openURL(info.item.content)
                .catch((err) => {
                    alert('An error occurred: ' + err)
                });
        }
    };

    render() {
        let menu_back = {
            android: 'mipmap/ic_back',
        };

        const sections = [];
        const data1 = [], data2 = [], data3 = [];

        data1.push({title: '当前版本', content: 'v2.0'});
        data1.push({title: '给我点赞', content: '前往项目地址给个start，鼓励作者'});
        sections.push({key: '小马天气', data: data1});

        data2.push({title: '微博', content: 'http://blog.csdn.net/huangbryant'});
        data2.push({title: 'githup', content: 'https://github.com/huangbryant210707'});
        sections.push({key: '关于作者', data: data2});

        data3.push({title: '天气数据', content: '和风天气'});
        data3.push({title: '定位服务', content: '高德地图'});
        data3.push({title: '语音合成', content: '百度语音'});
        data3.push({title: '云存储', content: 'Bomb后端云'});
        data3.push({title: '图片素材', content: '图片素材来源于网络，版权属原作者'});
        sections.push({key: '版权', data: data3});

        return (
            <View style={{flex: 1}}>
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
                    <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
                        <Image source={nativeImageSource(menu_back)}
                               style={{width: 30, height: 30, resizeMode: 'center', marginLeft: 5}}
                        />
                    </TouchableNativeFeedback>
                    <View>
                        <Text style={{textAlign: 'center', fontSize: 20, color: 'white', marginLeft: 10}}>关于</Text>
                    </View>
                </View>

                <SectionList
                    style={{marginBottom: 0}}
                    sections={sections}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    ItemSeparatorComponent={this._separatorCom}
                    keyExtractor={(item, index) => {
                        return 'key' + index;
                    }}
                />

            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        icon: {
            width: 26,
            height: 26,
        },
        sectionHeader: {
            paddingTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 2,
            fontSize: 14,
            fontWeight: 'bold',
            backgroundColor: '#00b7a6',
        },
    });