import {View, Text, TouchableHighlight,StyleSheet} from 'react-native';
import React from "react";

export default class PubImageWeather extends React.Component {
    clickJump() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();　　//navigator.pop 使用当前页面出栈, 显示上一个栈内页面.
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>我是第二个页面</Text>
                <TouchableHighlight
                    underlayColor="rgb(180, 135, 250)"
                    activeOpacity={0.5}
                    style={{
                        borderRadius: 8,
                        padding: 8,
                        marginTop: 5,
                        backgroundColor: "#F30"
                    }}
                    onPress={this.clickJump.bind(this)}>
                    <Text>点击返回第一个页面</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});