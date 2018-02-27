package com.reactweather;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationListener;
import com.bumptech.glide.Glide;
import com.reactweather.app.Extras;
import com.reactweather.javabean.ImageWeather;
import com.reactweather.utils.KeyboardUtils;
import com.reactweather.utils.Utils;

import java.io.File;

import cn.bmob.v3.datatype.BmobFile;
import cn.bmob.v3.exception.BmobException;
import cn.bmob.v3.listener.SaveListener;
import cn.bmob.v3.listener.UploadFileListener;

/**
 * @author 黄双
 */
public class UploadImageActivity extends Activity implements AMapLocationListener {
    private static final String TAG = "UploadImageActivity";
    private String path, userName;
    private ImageWeather imageWeather;


    private EditText etSay;
    private TextView tvLocation;
    private ImageView ivWeatherImage;
    private AMapLocationClient mAMapLocationClient;
    private String address;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload_image);

        initView();
        startLocation();
    }

    private void initView() {
        imageWeather = new ImageWeather();
        etSay = (EditText) findViewById(R.id.et_say);
//        btnUpload = (Button) findViewById(R.id.btn_upload);
        tvLocation = (TextView) findViewById(R.id.tv_location);
        ivWeatherImage = (ImageView) findViewById(R.id.iv_weather_image);

        path = getIntent().getStringExtra(Extras.IMAGE_PATH);
        Glide.with(this).load(path).into(ivWeatherImage);

        userName = "小马天气";
        imageWeather.setUserName(userName);
        imageWeather.setPraise(0);
        imageWeather.setHeadUrl(Extras.DEF_IMAGE_PATH);

        KeyboardUtils.showKeyboard(etSay);
    }

    /**
     * 上传实景天气
     *
     * @param view
     */
    public void upLoad(View view) {
        final BmobFile file = new BmobFile(new File(path));
        file.uploadblock(new UploadFileListener() {
            @Override
            public void done(BmobException e) {
                if (e == null) {
                    imageWeather.setLocation(address);
                    imageWeather.setImageUrl(file.getFileUrl());
                    imageWeather.setSay(etSay.getText().toString());
                    imageWeather.save(new SaveListener<String>() {
                        @Override
                        public void done(String objectId, BmobException e) {
                            if (e == null) {
                                setResult(RESULT_OK);
                                finish();
                            } else {
                                Log.e(TAG, "upload object fail", e);
                            }
                        }
                    });
                } else {
                    Log.e(TAG, "upload image fail", e);
                }
            }
        });
    }

    /**
     * 开始定位
     */
    private void startLocation() {
        mAMapLocationClient = Utils.initAMapLocation(this, this);
        mAMapLocationClient.startLocation();
    }

    @Override
    public void onLocationChanged(AMapLocation aMapLocation) {
        mAMapLocationClient.stopLocation();
        if (aMapLocation != null && aMapLocation.getErrorCode() == 0) {
            address = aMapLocation.getCity()
                    + "." + aMapLocation.getDistrict()
                    + "." + aMapLocation.getStreet();
            tvLocation.setText(address);
        }
    }

    @Override
    protected void onDestroy() {
        mAMapLocationClient.onDestroy();
        super.onDestroy();
    }
}
