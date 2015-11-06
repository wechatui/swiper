##swiper

为移动端而生的滑动框架，无依赖，轻盈小巧，性能极致

## 体验

扫描二维码

![demo](./dist/example/qrcode.png)

[http://wechatui.github.io/swiper](http://wechatui.github.io/swiper)

##安装

- 你可以在<https://github.com/wechatui/swiper/releases>下载最新发布的版本

- 也可以使用`bower`进行安装，运行`bower install iswiper`

##用法

```html
<div class="swiper">
    <div class="item">
        <h2 class="title fadeInUp animated">它无孔不入</h2>
    </div>
    <div class="item">
        <h2 class="title fadeInUp animated">你无处可藏</h2>
    </div>

    <div class="item">
        <h2 class="title fadeInUp animated">不是它可恶</h2>
    </div>

    <div class="item">
        <h2 class="title fadeInUp animated">而是它不懂你</h2>
    </div>

    <div class="item">
        <h2 class="title fadeInUp animated">我们试图</h2>
    </div>

    <div class="item">
        <h2 class="title fadeInUp animated">做些改变</h2>
    </div>
</div>
<script src="../swiper.js"></script>
<script>
    var swpier = new Swiper();
</script>
```

同样，也`swiper.js`也支持`AMD`或`CMD`规范，可以用`requirejs`或`seajs`进行加载。

```html
<script src="path/to/require.js"></script>
<script>
    require(['swiper'], function(Swiper){
        var swiper = new Swiper({direction: 'horizontal'});
    });
</script>
```

```html
<script src="path/to/sea.js"></script>
<script>
    seajs.use(['swiper'], function(Swiper){
        var swiper = new Swiper();
    });
    //define(function(require, exports, module){
    //    var Swiper = require('Swiper');
    //    var swiper = new Swiper();
    //    //do something
    //});
</script>
```

##API

###Swiper([option])

**option完整参数如下：**

- `container`：String，容器选择器，默认值`.swiper`

- `item`：String，每一屏的选择器，默认值`.item`

- `direction`：String，滑动方向，默认值`vertical`；横向滑动时为`horizontal`

- `activeClass`: String，当前屏激活时添加的类名；默认值`active`

- `threshold`：Number，滑动距离阀值，默认值`50`，当按住屏幕滑动超过此距离，松开手时，自动滑到下一屏，否则不滑动

- `duration`：Number，滑屏动画时间，单位`ms`，默认值`300`；数值越小，滑动越快，越刺激


###事件

**on**

- `swiped`：滑动**结束时**，触发`swiped`事件，回调函数传入两个参数，分别是上一屏和当前屏索引，从`0`算起。举例，从第一屏滑动到第二屏结束时：

```javascript
    var swiper = new Swiper();
    swiper.on('swiped', function(prev, current){
        console.log('上一屏：', prev); // 0
        console.log('当前屏：', current); // 1
    });
```

### 方法

- `next`: 主动滑动到下一屏。

```
    var swiper = new Swiper();
    swiper.next();
```

##License

swiper is available under the terms of the [MIT License](http://www.opensource.org/licenses/mit-license.php).
