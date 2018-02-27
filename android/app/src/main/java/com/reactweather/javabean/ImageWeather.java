package com.reactweather.javabean;


import cn.bmob.v3.BmobObject;

public class ImageWeather extends BmobObject {
    /**
     * 用户名
     */
    private String userName;
    /**
     * 图片
     */
    private String imageUrl;

    private String headUrl;
    /**
     * 这一刻的想法
     */
    private String say;
    /**
     * 位置
     */
    private String location;
    /**
     * 城市
     */
    private String city;
    /**
     * 标签
     */
    private String tag;
    /**
     * 点赞数
     */
    private int praise;

    public void setHeadUrl(String headUrl) {
        this.headUrl = headUrl;
    }

    public String getHeadUrl() {
        return headUrl;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSay() {
        return say;
    }

    public void setSay(String say) {
        this.say = say;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public int getPraise() {
        return praise;
    }

    public void setPraise(int praise) {
        this.praise = praise;
    }
}
