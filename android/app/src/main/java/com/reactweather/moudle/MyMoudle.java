package com.reactweather.moudle;

import android.app.Activity;
import android.media.AudioManager;
import android.util.Log;
import android.widget.Toast;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationListener;
import com.baidu.speechsynthesizer.SpeechSynthesizer;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reactweather.MyReactActivity;
import com.reactweather.app.Extras;
import com.reactweather.app.SpeechListener;
import com.reactweather.javabean.DailyForecast;
import com.reactweather.javabean.ImageWeather;
import com.reactweather.utils.PermissionReq;
import com.reactweather.utils.Utils;

import java.util.List;

import cn.bmob.v3.BmobQuery;
import cn.bmob.v3.exception.BmobException;
import cn.bmob.v3.listener.FindListener;
import cn.bmob.v3.listener.UpdateListener;


/**
 * @author 黄双
 * @date 2018/2/1 0001
 */

public class MyMoudle extends ReactContextBaseJavaModule implements AMapLocationListener {

    public static final String EVENT_NAME = "nativeCallRn";
    private ReactApplicationContext context;
    private int QUERY_LIMIT = 10;

    private static final String TAG = "----->MyMoudle";

    private SpeechSynthesizer mSpeechSynthesizer;
    private SpeechListener mSpeechListener;
    private AMapLocationClient mAMapLocationClient;
    private Callback callback;

    public MyMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "MyMoudle";
    }


    /**
     * 获取实景天气（RN--->Native）
     */
    @ReactMethod
    public void getImageWeather(final Callback callback) {
        BmobQuery<ImageWeather> mQuery = new BmobQuery<>();
        mQuery.setLimit(QUERY_LIMIT);
        mQuery.order("-createdAt");
        mQuery.setSkip(0);
        mQuery.findObjects(new FindListener<ImageWeather>() {
            @Override
            public void done(List<ImageWeather> list, BmobException e) {
                if (e == null) {
                    callback.invoke(javaBean2WriteArray(list));
                } else {
                    callback.invoke();
                    Toast.makeText(context, "数据请求失败了！", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    /**
     * 点赞（RN--->Native）
     */
    @ReactMethod
    public void praise(String id, int praise, final Callback callback) {
        ImageWeather imageWeather = new ImageWeather();
        imageWeather.setPraise(praise);
        imageWeather.update(id, new UpdateListener() {
            @Override
            public void done(BmobException e) {
                if (e == null) {
                    callback.invoke();
                } else {
                    Toast.makeText(context, "数据请求失败了！", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    /**
     * 发布实景天气（RN--->Native）
     */
    @ReactMethod
    public void pubImageWeather(final Callback callback) {
        Activity act = context.getCurrentActivity();
        if (act instanceof MyReactActivity) {
            ((MyReactActivity) act).pickPicture(callback);
        }
    }


    /**
     * 语音播报（RN--->Native）
     */
    @ReactMethod
    public void speech(ReadableMap map) {

        ReadableMap tmp = map.getMap("tmp");
        ReadableMap cond = map.getMap("cond");
        ReadableMap wind = map.getMap("wind");


        DailyForecast.TmpBean tmpBean = new DailyForecast.TmpBean();
        tmpBean.setMax(tmp.getString("max"));
        tmpBean.setMin(tmp.getString("min"));

        DailyForecast.CondBean condBean = new DailyForecast.CondBean();
        condBean.setTxt_d(cond.getString("txt_d"));
        condBean.setTxt_n(cond.getString("txt_n"));

        DailyForecast.WindBean windBean = new DailyForecast.WindBean();
        windBean.setSc(wind.getString("sc"));
        windBean.setDir(wind.getString("dir"));

        final DailyForecast dailyForecast = new DailyForecast();
        dailyForecast.setTmp(tmpBean);
        dailyForecast.setCond(condBean);
        dailyForecast.setWind(windBean);

        final Activity act = context.getCurrentActivity();
        PermissionReq.with(act)
                .permissions(android.Manifest.permission.READ_PHONE_STATE)
                .result(new PermissionReq.Result() {
                    @Override
                    public void onGranted() {
                        if (mSpeechSynthesizer == null) {
                            mSpeechListener = new SpeechListener(context);
                            mSpeechSynthesizer = new SpeechSynthesizer(context, "holder", mSpeechListener);
                            mSpeechSynthesizer.setApiKey(Extras.BD_TTS_API_KEY, Extras.BD_TTS_SECRET_KEY);
                            mSpeechSynthesizer.setAudioStreamType(AudioManager.STREAM_MUSIC);
                        }
                        String text = Utils.voiceText(context, dailyForecast);
                        mSpeechSynthesizer.speak(text);
                    }

                    @Override
                    public void onDenied() {
                        Toast.makeText(context, "没有权限进行语音播报！", Toast.LENGTH_SHORT).show();
                    }
                })
                .request();
    }

    /**
     * 首页定位
     *
     * @param callback
     */
    @ReactMethod
    public void location(Callback callback) {
        this.callback = callback;
        mAMapLocationClient = Utils.initAMapLocation(context, this);
        mAMapLocationClient.startLocation();
    }

    @Override
    public void onLocationChanged(AMapLocation aMapLocation) {
        mAMapLocationClient.stopLocation();
        if (aMapLocation != null && aMapLocation.getErrorCode() == 0) {
            callback.invoke(aMapLocation.getCity());
        }
    }

    /**
     * 将java对象转换为js对象
     *
     * @param list
     * @return
     */
    public WritableArray javaBean2WriteArray(List<ImageWeather> list) {
        WritableArray array = Arguments.createArray();
        for (int i = 0; i < list.size(); i++) {
            WritableMap map = Arguments.createMap();

            map.putString("say", list.get(i).getSay());
            map.putInt("praise", list.get(i).getPraise());
            map.putString("id", list.get(i).getObjectId());
            map.putString("headUrl", list.get(i).getHeadUrl());
            map.putString("userName", list.get(i).getUserName());
            map.putString("imageUrl", list.get(i).getImageUrl());
            map.putString("location", list.get(i).getLocation());

            array.pushMap(map);
        }
        return array;
    }
}
