import React from "react";

export default class WeatherUtils {

    /*
     *  get请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     * */
    static get(params, callback) {
        let URL = 'https://free-api.heweather.com/v5/weather';
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (URL.search(/\?/) === -1) {
                URL += '?' + paramsArray.join('&')
            } else {
                URL += '&' + paramsArray.join('&')
            }

        }
        //fetch请求
        fetch(URL, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson)
            })
            .catch((error) => {
                alert(error)
            });
    }
}