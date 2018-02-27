package com.reactweather.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactweather.BuildConfig;
import com.reactweather.moudle.MyPackage;

import java.util.Arrays;
import java.util.List;

import cn.bmob.v3.Bmob;


/**
 * @author huangshuang
 */
public class MainApplication extends Application implements ReactApplication {
    public static final MyPackage myPackage = new MyPackage();

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
        Bmob.initialize(this, Extras.BMOB_KEY);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(), myPackage
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    /**
     * 获取 reactPackage
     *
     * @return
     */
    public static MyPackage getReactPackage() {
        return myPackage;
    }
}
