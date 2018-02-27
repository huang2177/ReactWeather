package com.reactweather.utils;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.media.ExifInterface;

import com.reactweather.R;

import java.io.IOException;
import java.util.Calendar;


public class ImageUtils {

    public static int getIconByCode(Context context, String code) {
        return context.getResources().getIdentifier("ic_weather_icon_" + code, "mipmap", context.getPackageName());
    }

    public static int getWeatherImage(String weather) {
        if (weather.contains("转")) {
            weather = weather.substring(0, weather.indexOf("转"));
        }
        int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        if (hour >= 7 && hour < 19) {
            if (weather.contains("晴")) {
                return R.mipmap.header_weather_day_sunny;
            }
            if (weather.contains("云") || weather.contains("阴")) {
                return R.mipmap.header_weather_day_cloudy;
            }
            if (weather.contains("雨")) {
                return R.mipmap.header_weather_day_rain;
            }
            if (weather.contains("雪") || weather.contains("冰雹")) {
                return R.mipmap.header_weather_day_snow;
            }
            if (weather.contains("雾") || weather.contains("霾") || weather.contains("沙") || weather.contains("浮尘")) {
                return R.mipmap.header_weather_day_fog;
            }
            return R.mipmap.header_sunrise;
        } else {
            if (weather.contains("晴")) {
                return R.mipmap.header_weather_night_sunny;
            }
            if (weather.contains("云") || weather.contains("阴")) {
                return R.mipmap.header_weather_night_cloudy;
            }
            if (weather.contains("雨")) {
                return R.mipmap.header_weather_night_rain;
            }
            if (weather.contains("雪") || weather.contains("冰雹")) {
                return R.mipmap.header_weather_night_snow;
            }
            if (weather.contains("雾") || weather.contains("霾") || weather.contains("沙") || weather.contains("浮尘")) {
                return R.mipmap.header_weather_day_fog;
            }
            return R.mipmap.header_sunset;
        }
    }


    /**
     * 图片自动旋转
     */
    public static Bitmap autoRotate(String path, Bitmap source) {
        ExifInterface exif = null;
        try {
            exif = new ExifInterface(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (exif == null) {
            return source;
        }

        int ori = exif.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
        if (ori == ExifInterface.ORIENTATION_NORMAL) {
            return source;
        }

        int degree = 0;
        switch (ori) {
            case ExifInterface.ORIENTATION_ROTATE_90:
                degree = 90;
                break;
            case ExifInterface.ORIENTATION_ROTATE_180:
                degree = 180;
                break;
            case ExifInterface.ORIENTATION_ROTATE_270:
                degree = 270;
                break;
            default:
                break;
        }
        // 旋转图片
        Matrix matrix = new Matrix();
        matrix.postRotate(degree);
        return Bitmap.createBitmap(source, 0, 0, source.getWidth(), source.getHeight(), matrix, true);
    }
}
