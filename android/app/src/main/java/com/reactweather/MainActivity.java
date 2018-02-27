package com.reactweather;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import com.reactweather.javabean.ImageWeather;
import com.reactweather.utils.StatusUtils;

/**
 * @author Administrator
 */
public class MainActivity extends Activity {

    private MyThread mMyThread = new MyThread();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StatusUtils.setStatusBar(this, false, false);
        StatusUtils.setStatusTextColor(false, this);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        mMyThread.start();
    }

    private class MyThread extends Thread {

        @Override
        public void run() {
            super.run();
            try {
                Thread.sleep(3000);
                goMain();
            } catch (Exception e) {
            }
        }
    }

    /**
     * 跳转到React页面
     */
    public void goMain() {
        startActivity(new Intent(MainActivity.this, MyReactActivity.class));
        finish();
    }

//    /**
//     * 给RN发送消息
//     *
//     * @param view
//     */
//    public void sendMsgToRn(View view) {
//        MainApplication.getReactPackage().myMoudle.nativeCallRn();
//    }
}
