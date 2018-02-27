package com.reactweather.app;

import android.content.Context;
import android.support.design.widget.FloatingActionButton;
import android.util.Log;

import com.baidu.speechsynthesizer.SpeechSynthesizer;
import com.baidu.speechsynthesizer.SpeechSynthesizerListener;
import com.baidu.speechsynthesizer.publicutility.SpeechError;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * @author huangshuang
 */
public class SpeechListener implements SpeechSynthesizerListener {
    private static final String TAG = "SpeechListener";
    private ReactApplicationContext context;

    public SpeechListener(ReactApplicationContext context) {
        this.context = context;
    }

    public static final String EVENT_NAME = "startSpeek";
    public static final String EVENT_NAME2 = "finishSpeek";

    /**
     * 原生调用RN
     */
    public void startSpeek() {
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_NAME, "");
    }

    /**
     * 原生调用RN
     */
    public void finishSpeek() {
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_NAME2, "");
    }

    @Override
    public void onStartWorking(SpeechSynthesizer speechSynthesizer) {
        Log.i(TAG, "onStartWorking");
        //startCallback.invoke(true);
        startSpeek();
    }

    @Override
    public void onSpeechStart(SpeechSynthesizer speechSynthesizer) {
        Log.i(TAG, "onSpeechStart");
    }

    @Override
    public void onNewDataArrive(SpeechSynthesizer speechSynthesizer, byte[] bytes, boolean b) {
    }

    @Override
    public void onBufferProgressChanged(SpeechSynthesizer speechSynthesizer, int i) {
    }

    @Override
    public void onSpeechProgressChanged(SpeechSynthesizer speechSynthesizer, int i) {
    }

    @Override
    public void onSpeechPause(SpeechSynthesizer speechSynthesizer) {
    }

    @Override
    public void onSpeechResume(SpeechSynthesizer speechSynthesizer) {
    }

    @Override
    public void onCancel(SpeechSynthesizer speechSynthesizer) {
    }

    @Override
    public void onSynthesizeFinish(SpeechSynthesizer speechSynthesizer) {
        Log.i(TAG, "onSynthesizeFinish");
    }

    @Override
    public void onError(SpeechSynthesizer speechSynthesizer, final SpeechError speechError) {
        Log.e(TAG, "SpeechError:" + speechError.errorCode + "," + speechError.errorDescription);
    }

    @Override
    public void onSpeechFinish(SpeechSynthesizer speechSynthesizer) {
        Log.i(TAG, "onSpeechFinish");
//        finishCallBack.invoke();
        finishSpeek();
    }
}
