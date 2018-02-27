import React from "react";
import {Image, StatusBar, StyleSheet, Text, TouchableNativeFeedback, View, Alert, ToastAndroid} from "react-native";
import SearchBox from "./weigth/SearchBox";
import SearchResult from "./weigth/SearchResult";
import CityList from './weigth/IndexListView';
// 下面是数据部分
import DATA_JSON from './json/city-list.json';
import contstans from './constants'

const nativeImageSource = require('nativeImageSource');


const NOW_CITY_LIST = [
    {
        "name": contstans.city,
        "spellName": "shanghai",
        "id": 3100,
        "fullname": "上海/上海",
        "sortLetters": "s"
    }
];
const ALL_CITY_LIST = DATA_JSON.allCityList;
const HOT_CITY_LIST = DATA_JSON.hotCityList;
const LAST_VISIT_CITY_LIST = DATA_JSON.lastVisitCityList;
export default class City extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'City',
        tabBarIcon: ({tintColor}) => (
            <Image
                //source={require('./notify.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            keyword: '',
            showSearchResult: false,
            searchResultList: [],
            allCityList: ALL_CITY_LIST,
            hotCityList: HOT_CITY_LIST,
            lastVisitCityList: LAST_VISIT_CITY_LIST,
            nowCityList: NOW_CITY_LIST,
        };
    }


    onChanegeTextKeyword(newVal) {
        if (newVal === '') {
            this.setState({showSearchResult: false});
        } else {
            // 在这里过滤数据结果
            let dataList = this.filterCityData(newVal);
            this.setState({keyword: newVal, showSearchResult: true, searchResultList: dataList});
        }
    }

    filterCityData(text) {
        console.log('search for list', text);

        let rst = [];
        for (let idx = 0; idx < ALL_CITY_LIST.length; idx++) {
            let item = ALL_CITY_LIST[idx];
            if (item.name.contains(text) || item.spellName.contains(text)) {
                rst.push(item);
            }
        }
        return rst;
    }

    onSelectCity(cityJson) {
        this.changeLastVisitCity(cityJson);
        this.setState({lastVisitCityList: LAST_VISIT_CITY_LIST,});

        Alert.alert('提示信息', '你确定将该城市 [' + cityJson.name + '] 设置为默认城市？', [
            {text: '取消',},
            {
                text: '确定', onPress: () => {
                    if (this.state.showSearchResult) {
                        this.setState({showSearchResult: false, keyword: '',});
                    }
                    contstans.city = cityJson.name;
                    this.props.navigation.goBack();
                }
            }
        ]);
    }


    changeLastVisitCity(cityJson) {

        for (let idx = 0; idx < LAST_VISIT_CITY_LIST.length; idx++) {
            let item = LAST_VISIT_CITY_LIST[idx];
            if (item.name === (cityJson.name) || item.spellName === cityJson.spellName) {
                return;
            }
        }

        LAST_VISIT_CITY_LIST.unshift(cityJson);

        if (LAST_VISIT_CITY_LIST.length > 6) {
            LAST_VISIT_CITY_LIST.pop();
        }
    }


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
                    height: 45,
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor:'#00b7a6'
                }}>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
                        <Image source={nativeImageSource(menu_back)}
                               style={{width: 30, height: 30, resizeMode: 'center', marginLeft: 5}}
                        />
                    </TouchableNativeFeedback>
                    <View>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'white',
                            marginLeft: 10
                        }}>城市管理</Text>
                    </View>
                </View>

                <SearchBox keyword={this.state.keyword}
                           onChanegeTextKeyword={(vv) => {
                               this.onChanegeTextKeyword(vv)
                           }}
                />
                {this.state.showSearchResult
                    ? (
                        <SearchResult keyword={this.state.keyword}
                                      onSelectCity={this.onSelectCity.bind(this)}
                                      searchResultList={this.state.searchResultList}/>
                    )

                    : (
                        <View style={{flex: 1}}>
                            <CityList onSelectCity={this.onSelectCity.bind(this)}
                                      allCityList={this.state.allCityList}
                                      hotCityList={this.state.hotCityList}
                                      lastVisitCityList={this.state.lastVisitCityList}
                                      nowCityList={this.state.nowCityList}/>
                        </View>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    },
    currentCity: {
        backgroundColor: '#ffffff',
        height: 20,
        margin: 5
    },
    currentCityText: {
        fontSize: 16
    }
});