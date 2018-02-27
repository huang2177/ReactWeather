package com.reactweather.javabean;

import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.io.Serializable;
import java.util.HashMap;


public class Location implements Serializable,WritableMap{
    private String address;
    private String country;
    private String province;
    private String city;
    private String district;
    private String street;
    private String streetNum;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNum() {
        return streetNum;
    }

    public void setStreetNum(String streetNum) {
        this.streetNum = streetNum;
    }

    @Override
    public void putNull(String key) {

    }

    @Override
    public void putBoolean(String key, boolean value) {

    }

    @Override
    public void putDouble(String key, double value) {

    }

    @Override
    public void putInt(String key, int value) {

    }

    @Override
    public void putString(String key, String value) {

    }

    @Override
    public void putArray(String key, WritableArray value) {

    }

    @Override
    public void putMap(String key, WritableMap value) {

    }

    @Override
    public void merge(ReadableMap source) {

    }

    @Override
    public boolean hasKey(String name) {
        return false;
    }

    @Override
    public boolean isNull(String name) {
        return false;
    }

    @Override
    public boolean getBoolean(String name) {
        return false;
    }

    @Override
    public double getDouble(String name) {
        return 0;
    }

    @Override
    public int getInt(String name) {
        return 0;
    }

    @Override
    public String getString(String name) {
        return null;
    }

    @Override
    public ReadableArray getArray(String name) {
        return null;
    }

    @Override
    public ReadableMap getMap(String name) {
        return null;
    }

    @Override
    public Dynamic getDynamic(String name) {
        return null;
    }

    @Override
    public ReadableType getType(String name) {
        return null;
    }

    @Override
    public ReadableMapKeySetIterator keySetIterator() {
        return null;
    }

    @Override
    public HashMap<String, Object> toHashMap() {
        return null;
    }
}
