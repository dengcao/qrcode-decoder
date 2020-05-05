/*
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
☆                                                                                                 ☆
☆  系 统：二维码（条形码）解码器                                                                    ☆
☆  日 期：2019-07-13                                                                              ☆
☆  开 发：草札(www.caozha.com)                                                                    ☆
☆  鸣 谢：穷店(www.qiongdian.com) 品络(www.pinluo.com)                                             ☆
☆  声 明: 使用本程序源码必须保留此版权声明等相关信息！                                                ☆
☆  Copyright ©2020 www.caozha.com All Rights Reserved.                                            ☆
☆                                                                                                 ☆
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
*/
// pages/index/index.js
const base64 = require("../../utils/base64.js");
var app = getApp();
Page({
  data:{
    banquan: app.globalData.banquan,
    ip: '',
    show_r: '',
    show_img: 'yes',
    imageBase64Str: '',
    location: '',
    height: '100%'
  },  

  banquan: function () {
    
  },
  
  queryIp: function (res) {
    let that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res);
        var location_text = "";

        if (res.result == "*" || res.result == ""){
          location_text = "【解码后内容】：" + base64.decode(res.rawData);
        }else{
          location_text = "【解码后内容】：" + res.result;
        }        

        location_text = location_text + "\r\n\n【解码类型】：" + res.scanType;

        if (res.scanType == "QR_CODE" || res.scanType == "DATA_MATRIX" || res.scanType == "PDF_417"){
          location_text = location_text+"（二维码）";
        } else if (res.scanType == "WX_CODE"){
          location_text = location_text + "（小程序码）";
        }else{
          location_text = location_text + "（一维码）";
        }
        location_text = location_text + "\r\n\n【字符集】：" + res.charSet;
        if (res.path != "undefined" && res.path != "" && res.path != null ){
          location_text = location_text + "\r\n\n【Path】：" + res.path;
        }

        that.setData({
          show_r: 'yes',
          show_img: '',
          location: location_text
        })
      },
      fail(res) {
        console.log(res);
        /*that.setData({
          show_r: 'yes',
          show_img: '',
          location: "识别错误：\r\n" + res.errMsg
        })*/
      },
      complete(res) {

      }
    })    
  },

  // 一键复制事件
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.location,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    },
  onReady:function(){
    // 页面渲染完成    
    
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    app.pages = getCurrentPages();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  // 设置页面分享
  onShareAppMessage: function () {
    return {
      title: '二维码(条形码)解码器',
      path: '/pages/index/index'
    }
  }
})