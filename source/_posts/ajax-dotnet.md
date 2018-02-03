---
title: 原生 AJAX 技术在 .NET 环境中的应用
date: 2018-02-01 17:38:02
categories: 技术水文
tags:
  - AJAX
  - .NET
---

这学期首次接触 .NET 开发，个中遇到了许多的问题。其中，以原生 AJAX 异步请求数据的相关问题最是让我困扰。所以，利用空闲时间好好研究了一下。

## AJAX 的封装

首先，我简单地将 AJAX 封装了一下（使用 ES6 标准）。

<!-- more -->

``` js
/**
 * @desc AJAX 的简单封装
 * @param {String} url 请求路径 
 * @param {Object} settings 参数配置
 * @returns {Promise} 包含数据的 Promise 对象
 */
const ajax = function (url, settings) => {
  // set default values
  ({ 
    method = 'GET', 
    responseType = '', 
    header = {}, 
    timeout = 0, 
    isAsync = true 
    data = null, 
  } = settings || {});

  // get XMLHttpRequest object
  let getXhr = () => new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

  // use to format response data 
  class DataFormator {
    constructor(data) {
      this._data = data;
    }
    
    getJson () {
      let __data = typeof this._data === 'object'
        ? this._data
        : JSON.parse(this._data);
      
      return __data === null
        ? __data
        : (__data.d && __data.d !== '' ? JSON.parse(__data.d) : __data);
    }

    getText () {
      return this._data;
    }

    // add other format function here 
  }

  return new Promise((resolve, reject) => {
    const xhr = getXhr();

    xhr.open(method, url, isAsync);
    
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      
      this.status === 200
        ? resolve(new DataFormator(this.response))
        : reject(new Error(this.statusText))
    };

    xhr.responseType = responseType;
    xhr.timeout = timeout;

    // set request header
    for (let item in header) {
      xhr.setRequestHeader(item, `application/${header[item]}`);
    }

    xhr.send(data);
  });
}
```

这里主要应用了 Promise 对象对 AJAX 进行封装，使用起来较为简单：

``` js
// 方式一
// 默认使用 GET 请求
ajax('test.json')
  .then(res => res.getJson()) // or getText
  .then(data => {
    // code here ...
  })
  .catch(error => {
    // code here ...
  });

// 方式二
ajax('./Demo.aspx/ServerMethod', {
  method: 'POST',
  header: {
    'content-type': 'json'
  },
  data: JSON.stringify({
    id: 1
  })
})
  .then(res => res.getJson()) // or getText
  .then(data => {
    // code here ...
  })
  .catch(error => {
    // code here ...
  });
```

> Update ...