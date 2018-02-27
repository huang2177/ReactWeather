package com.reactweather.moudle;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.reactweather.moudle.MyMoudle;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 *
 * @author 黄双
 * @date 2018/2/1 0001
 */

public class MyPackage implements ReactPackage {

    public MyMoudle myMoudle;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        myMoudle = new MyMoudle(reactContext);
        modules.add(myMoudle);
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }


}
