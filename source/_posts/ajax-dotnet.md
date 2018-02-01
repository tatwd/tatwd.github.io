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

``` js
/**
 * @desc AJAX 的简单封装
 * @param {String} url 请求路径
 * @param {Object} settings 参数设置 
 */
const ajax = (url, settings) => {

}

```