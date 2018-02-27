'use strict';
import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Image} from 'react-native';

const nativeImageSource = require('nativeImageSource');
export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

    }

    onEndEditingKeyword(vv) {
        console.log(vv);
    }

    onChanegeTextKeyword(vv) {
        console.log('onChanegeTextKeyword', vv);

        this.setState({value: vv});
        this.props.onChanegeTextKeyword(vv);
    }

    render() {
        let ic_search = {
            android: 'mipmap/ic_search',
        };
        return (
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <Image style={styles.inputIcon}
                           source={nativeImageSource(ic_search)}>
                    </Image>
                    <TextInput ref="keyword"
                               autoCapitalize="none"
                               value={this.props.keyword}
                               onChangeText={this.onChanegeTextKeyword.bind(this)}
                               returnKeyType="search"
                               maxLength={20}
                               style={styles.inputText}
                               underlineColorAndroid="transparent"
                               placeholder={'输入城市名或拼音查询'}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
        container: {
            height: 45,
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: '#cdcdcd',
            paddingBottom: 5
        },
        inputBox: {
            marginLeft: 5,
            marginRight: 5,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#E6E7E8',
            alignItems:'center'
        },
        inputIcon: {
            width: 20,
            height: 20,
            marginLeft:8,
            resizeMode: 'center'
        },


        inputText: {
            alignSelf: 'flex-end',
            flex: 1,
            marginRight: 5,
            fontSize: 14,
            textDecorationLine: 'none'
        }
    })
;
