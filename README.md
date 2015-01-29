##swiper

为移动端而生的滑动框架，无依赖，轻盈小巧，性能极致

##安装

- 在<https://github.com/wechatui/swiper/releases>下载最新发布的版本

- 使用`bower`进行安装，运行`bower install iswiper`

##用法

```html
<div class="swiper">
    <div class="item item1">
        <h1 class="bear" toggle-class="slide_in">bear</h1>
    </div>
    <div class="item item2">
        <h1 class="hehe" toggle-class="slide_in">kiki</h1>
    </div>
</div>
<script src="../swiper.js"></script>
<script>
    var swpier = new Swiper();
</script>
```

同样，也`swiper.js`也支持`AMD`规范，可以用`requirejs`进行加载。

```html
<script src="path/to/require.js"></script>
<script>
    require(['swiper'], function(Swiper){
        var swiper = new Swiper({direction: 'horizontal'});
    });
</script>
```

##API

###Swiper([option])

**option完整参数如下：**

- `container`：String，容器选择器，默认值`.swiper`

- `item`：String，每一屏的选择器，默认值`.item`

- `direction`：String，滑动方向，默认值`vertical`；横向滑动时为`horizontal`

- `threshold`：Number，滑动距离阀值，默认值`50`，当按住屏幕滑动超过此距离，松开手时，自动滑到下一屏，否则不滑动

- `duration`：Number，滑屏动画时间，单位`ms`，默认值`300`；数值越小，滑动越快，越刺激


###事件

**on**

- `swiped`：滑动**结束时**，触发`swiped`事件，回调函数传入两个参数，分别是上一屏和当前屏索引，从`0`算起。举例，从第一屏滑动到第二屏结束时：

```javascript
    var swiper = new Siper();
    swiper.on('swiped', function(prev, current){
        console.log('上一屏：', prev); // 0
        console.log('当前屏：', current); // 1
    });
```

###HTML属性

通常，制作此类页面，都是滑动时，对某些元素添加或者移除某些`class`，因此`swiper.js`支持在需要切换`class`的元素中，预先写入`toggle-class`属性。当滑动到当前屏时，自动查找拥有`toggle-class`属性的元素，并且为之添加上`toggle-class`的值，同时对上一屏中，拥有`toggle-class`属性的元素，移除`toggle-class`的值。如果需要添加或移除多个`class`，则以空格分隔。

举例：

```html
<div class="swiper">
    <div class="item item1">
        <!-- 当出现第一屏时，自动为以下元素添加“slide_in”类，当滑动到下一屏时，自动移除 -->
        <h1 class="bear" toggle-class="slide_in">bear</h1>
    </div>
    <div class="item item2">
        <!-- 同上 -->
        <h1 class="hehe" toggle-class="slide_in">kiki</h1>
    </div>
</div>
```

##体验

![](http://wechatui.github.io/swiper/images/example.jpg)

![](http://wechatui.github.io/swiper/images/example2.jpg)

##License

swiper is available under the terms of the [MIT License](http://www.opensource.org/licenses/mit-license.php).
