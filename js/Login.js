import React from 'react';
import {Image, Keyboard, StyleSheet, Text, TextInput, TouchableNativeFeedback, View, ToastAndroid} from 'react-native';

const nativeImageSource = require('nativeImageSource');

var userName, passWord;
export default class Login extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={{uri: 'http://s3.sinaimg.cn/mw600/001napbCty6OyiogZN012&690.jpg'}}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    }

    constructor(props) {
        super(props)
        this.state = {width: 72, height: 72}
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
    }

    componentWillMount() {
        //监听键盘弹出事件
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this.keyboardDidShowHandler.bind(this));
        //监听键盘隐藏事件
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this.keyboardDidHideHandler.bind(this));
    }

    componentWillUnmount() {
        //卸载键盘弹出事件监听
        if (this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardDidHideListener != null) {
            this.keyboardDidHideListener.remove();
        }
    }

    render() {
        let img1 = {
            android: 'mipmap/skin_about_brand',
            width: 72,
            height: 72
        };
        let img2 = {
            android: 'mipmap/ic_phone_iphone_black_48dp',

            width: 60,
            height: 60
        };
        let img3 = {
            android: 'mipmap/ic_lock_outline_black_48dp',
            width: 60,
            height: 60
        };

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={nativeImageSource(img1)} style={{
                    width: this.state.width,
                    resizeMode: 'contain'
                }}/>

                {/*手机号*/}
                <View style={styles.hViewStyle}>
                    <Image source={nativeImageSource(img2)} style={styles.imgStyle}/>
                    <TextInput placeholder="请输入用户名"
                               style={styles.inputStyle}
                               onChangeText={(text) => {
                                   userName = text;
                               }}
                               autoFocus={true}
                               clearButtonMode='while-editing'
                    />
                </View>
                <View style={{height: 2, backgroundColor: '#787470'}}/>

                {/*密码*/}
                <View style={styles.hViewStyle}>
                    <Image source={nativeImageSource(img3)} style={styles.imgStyle}/>
                    <TextInput placeholder="请输入密码"
                               style={styles.inputStyle}
                               onChangeText={(text) => {
                                   passWord = text;
                               }}
                    />
                </View>
                <View style={{height: 2, backgroundColor: '#787470'}}/>

                {/*登录按钮*/}
                <TouchableNativeFeedback
                    onPress={() => this.goToMainPage()}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.viewForTextStyle}>
                        <Text style={styles.textStyle}>登 录</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    /**
     * 键盘弹出事件响应
     */
    keyboardDidShowHandler(event) {
        this.setState({
            width: 48,
            height: 48
        })
    }

    /**
     * 键盘隐藏事件响应
     */
    keyboardDidHideHandler(event) {
        this.setState({
            width: 72,
            height: 72
        })
    }

    /**
     * 点击登录
     */
    goToMainPage() {
        if (userName != null && passWord != null) {
            if (userName === 'kobe' && passWord === '24') {
                userName = null;
                passWord = null;
                this.props.navigation.navigate('Notifications');
            } else {
                ToastAndroid.show('用户名或者密码错误！', ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show('请输入用户名和密码！', ToastAndroid.SHORT);
        }
    }
}
const styles = StyleSheet.create({
    imgStyle: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
    },
    hViewStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flexDirection: 'row',
        //flex: 1,
        backgroundColor: 'red',
        color: 'white',
        height: 40,
        margin: 20,
        borderRadius: 5,
        textAlign: 'center'
    },
    inputStyle: {
        width: 200,
        paddingLeft: 8,
        fontSize: 16
    },
    textStyle: {
        color: '#ffffff',
        fontSize: 16
    },
    viewForTextStyle: {
        margin: 5,
        backgroundColor: "#08c7ae",
        height: 40,
        width: 250,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
})