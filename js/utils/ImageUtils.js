export default class ImageUtils {

    static getWeatherImage(weather) {
        if (weather.contains("转")) {
            weather = weather.substring(0, weather.indexOf("转"));
        }
        const hour = new Date().getHours();
        if (hour >= 7 && hour < 19) {
            if (weather.contains("晴")) {
                return {android: 'mipmap/header_weather_day_sunny'}
            }
            if (weather.contains("云") || weather.contains("阴")) {
                return {android: 'mipmap/header_weather_day_cloudy'}
            }
            if (weather.contains("雨")) {
                return {android: 'mipmap/header_weather_day_rain'}
            }
            if (weather.contains("雪") || weather.contains("冰雹")) {
                return {android: 'mipmap/header_weather_day_snow'}
            }
            if (weather.contains("雾") || weather.contains("霾") || weather.contains("沙") || weather.contains("浮尘")) {
                return {android: 'mipmap/header_weather_day_fog'}
            }
            return {android: 'mipmap/header_sunrise'}
        } else {
            if (weather.contains("晴")) {
                return {android: 'mipmap/header_weather_night_sunny'}
            }
            if (weather.contains("云") || weather.contains("阴")) {
                return {android: 'mipmap/header_weather_night_cloudy'}
            }
            if (weather.contains("雨")) {
                return {android: 'mipmap/header_weather_night_rain'}
            }
            if (weather.contains("雪") || weather.contains("冰雹")) {
                return {android: 'mipmap/header_weather_night_snow'}
            }
            if (weather.contains("雾") || weather.contains("霾") || weather.contains("沙") || weather.contains("浮尘")) {
                return {android: 'mipmap/header_weather_day_fog'}
            }
            return {android: 'mipmap/header_sunset'}
        }
    }

    static getIconByCode(code) {
        return {android: "mipmap/ic_weather_icon_" + code};
    }
}
