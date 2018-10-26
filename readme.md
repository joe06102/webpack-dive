# **Webpack 打包原理浅析**

## Webpack基本概念

### Bundle
所有相关的代码最终打包到一个主体js文件中，这个js文件一般就叫做bundle。

### Chunk
如果把所有文件都放到一个bundle中，可能会导致bundle体积过大，所以需要分割bundle，把代码分散到不同的文件中，这些文件就叫做chunk。例如使用CommonChunkPlugin生成的文件。

### Module
模块就是我们自己定义的功能单元，一般都是单个包含export的文件。一个chunk可能包含很多module。

## 打包基本流程

### 流程
![流程图](http://on-img.com/chart_image/5bd19d2de4b09b21f32fb8e8.png)

1. webpack把各个模块分别包裹在一个函数中，函数定义如下：
```javascript
(function(module, __webpack_exports__, __webpack_require__) {
    ///your module
})
```
    其中module指的是一个模块对象，__webpack_exports__指的是module.exports，__webpack_require__指的是导入函数

2. __webpack_require__ 接收一个moduleId，返回该module的exports对象，并且利用闭包，将已加载的模块挂载在installedModules对象上，以moduleId为key。

3. 如果被加载的模块又依赖了别的模块，就递归的调用__webpack_require__加载模块

4. 加载完成后，就可以获取exports对象，正常执行函数了
