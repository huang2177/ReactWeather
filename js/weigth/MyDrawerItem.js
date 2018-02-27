import React from "react";
import {Image, StyleSheet, Text, TouchableNativeFeedback, View, Share} from "react-native";
import City from "../City";

const nativeImageSource = require('nativeImageSource');

export default class MyDrawerItem extends React.Component {
    render() {
        return (
            <View>
                <TouchableNativeFeedback onPress={() => {
                    if (this.props.lable !== 'ShareToFriends') {
                        this.props.nav.navigate(this.props.lable)
                    } else {
                        Share.share({
                            content: '小马天气',
                            url: 'http://facebook.github.io/react-native/',
                        }, {
                            dialogTitle: '分享给朋友'
                        }).catch((err) => {
                            alert('err' + err);
                        })
                    }
                }}>
                    <View style={styles.itemContainer}>
                        <Image source={nativeImageSource(this.props.img)}
                               style={{width: 20, height: 20, resizeMode: 'center', marginLeft: 20}}
                        />
                        <Text style={{color: '#123', fontSize: 16, marginLeft: 20}}>
                            {this.props.title}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 45,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginTop: 10
    }
});