package com.reactweather;


import android.content.Intent;
import android.support.v4.content.ContextCompat;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Callback;
import com.reactweather.app.Extras;
import com.yanzhenjie.album.Album;
import com.yanzhenjie.durban.Controller;
import com.yanzhenjie.durban.Durban;

import java.util.ArrayList;

/**
 * @author 黄双
 * @date 2018/2/1 0001
 */

public class MyReactActivity extends ReactActivity {

    private int color;
    private Callback callBack;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactWeather";
    }

    /**
     * 选择图片
     *
     * @param callback
     */
    public void pickPicture(Callback callback) {
        this.callBack = callback;
        color = ContextCompat.getColor(this, R.color.colorAccent);
        Album.albumRadio(this)
                .toolBarColor(color)
                .statusBarColor(color)
                .title("选取图片")
                .columnCount(3)
                .camera(true)
                .start(100);
    }

    /**
     * 裁剪
     *
     * @param pathList
     */
    public void cutPhoto(ArrayList<String> pathList) {
        Durban.with(this)
                // 裁剪界面的标题。
                .title("裁剪")
                .statusBarColor(color)
                .toolBarColor(color)
                // 图片路径list或者数组。
                .inputImagePaths(pathList)
                // 图片输出文件夹路径。
                // 裁剪图片输出的最大宽高。
//                .maxWidthHeight(400, 250)
                // 设置裁剪比例
                .aspectRatio(5, 3)
                // 图片压缩格式：JPEG、PNG。
                .compressFormat(Durban.COMPRESS_JPEG)
                // 图片压缩质量，请参考：Bitmap#compress(Bitmap.CompressFormat, int, OutputStream)
                .compressQuality(100)
                // 裁剪时的手势支持：ROTATE, SCALE, ALL, NONE.
                .gesture(Durban.GESTURE_SCALE)
                .controller(Controller.newBuilder()
                        // 是否开启控制面板。
                        .enable(true)
                        // 是否有旋转按钮。
                        .rotation(true)
                        // 旋转控制按钮上面的标题。
                        .rotationTitle(true)
                        // 是否有缩放按钮。
                        .scale(true)
                        // 缩放控制按钮上面的标题。
                        .scaleTitle(true)
                        // 创建控制面板配置。
                        .build())
                .requestCode(200)
                .start();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        try {
            if (requestCode == 100) {
                if (Album.parseResult(data).size() == 0) {
                    return;
                }
                cutPhoto(Album.parseResult(data));
            } else if (requestCode == 200) {
                if (Durban.parseResult(data).size() == 0) {
                    return;
                }
                upLoad(Durban.parseResult(data).get(0));
            } else if (requestCode == 300) {
                callBack.invoke("csd");
            }
        } catch (Exception e) {

        }
    }

    private void upLoad(String path) {
        Intent intent = new Intent(this, UploadImageActivity.class);
        intent.putExtra(Extras.IMAGE_PATH, path);
        intent.putExtra(Extras.LOCATION, "上海.欧阳路");
        startActivityForResult(intent, 300);
    }

}