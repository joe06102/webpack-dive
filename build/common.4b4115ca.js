//#region 主体IIFE函数，接收模块数组作为形参
(function (modules) {

  var parentJsonpFunction = window["webpackJsonp"];

  // 模块缓存，以模块id作为key
  // 被webpackJSONP引用，形成闭包
  var installedModules = {};

  // chunk缓存，以chunkId作为key, 如果模块加载完成，则用0表示，否则用[resolve, reject, promise]对象表示正在加载的模块（详情见下文）
  // 被webpackJSONP引用，形成闭包
  var installedChunks = {
    2: 0
  };

  //#region webpackJSONP 方法，用于异步加载模块完成后调用的回调方法
  //该方法必须定义在window对象上，并且在任何异步模块加载完成之前定义
  window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0, resolves = [], result;
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (installedChunks[chunkId]) {
        //如果chunk已经加载过，但还没有resolve（仍然是一个[resolve, reject, promise]数组），
        //将resolve方法存入resolves队列
        resolves.push(installedChunks[chunkId][0]);
      }

      //将该chunk标记为0，表示已经加载并且resolve
      installedChunks[chunkId] = 0;
    }

    //将所有已经加载的模块复制到当前modules对象
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }

    //暂时没搞懂
    if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);

    //将resolves队列的方法挨个出队，并且resolve
    while (resolves.length) {
      resolves.shift()();
    }
    if (executeModules) {
      for (i = 0; i < executeModules.length; i++) {
        result = __webpack_require__(__webpack_require__.s = executeModules[i]);
      }
    }
    return result;
  };
  //#endregion

  //#region 真正的import函数主体
  //接收模块id，返回该模块的exports对象
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }
  //#endregion

  //#region chunk异步加载方法
  __webpack_require__.e = function requireEnsure(chunkId) {
    var installedChunkData = installedChunks[chunkId];

    //0代表模块已经加载，直接返回一个resolved promise
    if (installedChunkData === 0) {
      return new Promise(function (resolve) { resolve(); });
    }

    // a Promise means "currently loading".
    // 如果chunk != 0，但也不为空，肯定是一个数组，返回数组第三个元素（promise）具体见下一步
    if (installedChunkData) {
      return installedChunkData[2];
    }

    // setup Promise in chunk cache
    // chunk第一次被加载
    var promise = new Promise(function (resolve, reject) {
      installedChunkData = installedChunks[chunkId] = [resolve, reject];
    });
    installedChunkData[2] = promise;

    // start chunk loading
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.charset = 'utf-8';
    script.async = true;
    script.timeout = 120000;

    if (__webpack_require__.nc) {
      script.setAttribute("nonce", __webpack_require__.nc);
    }
    script.src = __webpack_require__.p + "" + chunkId + "." + "4b4115ca" + ".bundle.js";
    var timeout = setTimeout(onScriptComplete, 120000);
    script.onerror = script.onload = onScriptComplete;
    function onScriptComplete() {
      // avoid mem leaks in IE.
      script.onerror = script.onload = null;
      clearTimeout(timeout);
      var chunk = installedChunks[chunkId];
      if (chunk !== 0) {
        if (chunk) {
          chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
        }
        installedChunks[chunkId] = undefined;
      }
    };
    head.appendChild(script);

    return promise;
  };
  //#endregion

  //#region 一些模块导入的辅助方法定义
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable: false,
        enumerable: true,
        get: getter
      });
    }
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";

  // on error function for async loading
  __webpack_require__.oe = function (err) { console.error(err); throw err; };
})
  //#endregion

  //#region IIFE入参
  //如果用了CommonChunkPlugin，则只包含需要提取的公共模块，其他模块被定义在另外的chunk中
  ([
/* 0 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_exports__["a"] = ({
        A: function A(a) {
          return console.log(a);
        }
      });

/***/
    })
  ]);
  //#endregion
//#endregion