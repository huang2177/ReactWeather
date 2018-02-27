import React from "react";
import {Image, StatusBar, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";

const nativeImageSource = require('nativeImageSource');
export default class Setting extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Setting',
        tabBarIcon: ({tintColor}) => (
            <Image
                //source={require('./notify.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };



    render() {
        let menu_back = {
            android: 'mipmap/ic_back',
        };

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
                        <Text style={{textAlign: 'center', fontSize: 20, color: 'white', marginLeft: 10}}>功能设置</Text>
                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});