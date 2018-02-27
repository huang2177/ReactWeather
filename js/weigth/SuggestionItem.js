import React from 'react'
import {Image, Text, View} from "react-native";

var IMG = {};
const nativeImageSource = require('nativeImageSource');
export default class SuggestionItem extends React.Component {
    render() {
        const type = this.props.type;
        this.getImg(type)
        return (
            <View style={{flex: 1, flexDirection: 'row', margin: 5}}>
                <View>
                    <Image source={nativeImageSource(IMG)}
                           style={{width: 60, height: 60}}/>
                    <Text style={{textAlign: 'center', color: '#ffffff',}}>{type}</Text>
                </View>


                <View style={{
                    flex: 1,
                    marginLeft: 10
                }}>
                    <Text style={{
                        color: '#ffffff',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>{this.props.title}</Text>

                    <Text style={{color: '#ffffff'}}
                          numberOfLines={3}>{this.props.content}</Text>

                </View>

            </View>
        );
    }

    getImg(type) {
        switch (type) {
            case '舒适度':
                IMG = {
                    android: 'mipmap/ic_suggestion_comfort',
                };
                break
            case '穿衣':
                IMG = {
                    android: 'mipmap/ic_suggestion_clothe',
                };
                break;
            case '感冒':
                IMG = {
                    android: 'mipmap/ic_suggestion_flu',
                };
                break
            case '洗车':
                IMG = {
                    android: 'mipmap/ic_suggestion_car',
                };
                break
            case '运动':
                IMG = {
                    android: 'mipmap/ic_suggestion_sport',
                };
                break
            case '旅游':
                IMG = {
                    android: 'mipmap/ic_suggestion_travel',
                };
                break
            case '紫外线':
                IMG = {
                    android: 'mipmap/ic_suggestion_uv',
                };
                break
        }
    }
}