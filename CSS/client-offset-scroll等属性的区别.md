---
title: CSS中client-offset-scroll等属性的区别
categories:
  - CSS
date: 2021-01-06 21:46:55
tags: 
---

# client-offset-scroll等属性的区别

## 需要记的边角料小结论

**以下内容都基于将自己写的小Demo在浏览器内进行测试后得到的结论：**

+ ⭐ 接下来要讨论的client、offset、scroll前缀的属性，其属性值都不带单位，默认单位为css像素。

+ PC端，如果页面中某个元素出现滚动条，滚动条的宽度默认是由各个浏览器决定的。Chrome中是17px。
+ 不确定❓ 移动端，滚动条好像不占宽度 ❓
+ 对于开启了绝对定位的元素，left和right属性都为auto时，left值可以认为等于包含块的padding-left。top同理

## client前缀的四个属性

### clientWidth和clientHeight

这两个属性是所有DOM元素的自有属性，包括html标签`(document.documentElement对象)`。

简单来说，这两个属性表示DOM元素的`可视区域的横向尺寸和纵向尺寸`。

**对一般DOM元素而言：**

```mathematica
可视区域长度 = 左右padding + 内容区宽度 - 纵向滚动条宽度(若存在滚动条，Chrome默认17px。否则为0px)

可视区域高度 = 上下padding + 内容区高度 - 横向滚动条宽度(若存在滚动条，Chrome默认17px。否则为0px)
```



### html的clientWidth和clientHeight

**对于html标签而言，`可视区域的定义比较特殊`：**

❗  `document.documentElement.clientWidth`和`document.documentElement.clientHeght`是整个DOM参考的最外层盒子尺寸，即为html元素设置尺寸的值为一个百分比时，参考的是自己的clientWidth和clientHeight属性。

*一般来说也不会为html元素设置border、margin、padding，所以可以认为html宽度为父容器的百分之百，即默认情况下 html.width  = clientWidth。*

+ ⭐移动端

```mathematica
html.clientWidth = 布局视口宽度

html.clientHeight = 布局视口高度 
```

> 布局视口高度可以在meta viewport标签中通过height属性设置。如果只指定viewport的width和init-scale分别为一个数字，而不指定height，则 布局视口高度 = 布局视口宽度 × 设备屏幕纵横比例

+ ⭐PC端

```mathematica
可视区域宽度 = 浏览器窗口中页面区域宽度（浏览器视口） - html自己的纵向滚动条宽度

可视区域高度 = 浏览器窗口中页面区域高度（浏览器视口） - html自己的横向滚动条高度
```

*只有当html的scrollHeight和scrollWidth大于浏览器视口（html.clientHeight、html.clientWidth）才会出现属于html元素的滚动条*

> 注意：是浏览器显示页面区域，而非整个屏幕，因为浏览器一般都会有菜单、选项卡、地址栏等区域。
>
> ❓由于选项卡、地址栏之类浏览器控件的存在，所以在**移动端** document.ducomentElement.clientHeight只代表布局视口高度，不能代表浏览器窗口中网页页面区域的高度。

1. 对于body标签而言：

   body标签也属于一般的块级DOM元素，其可视区域为padding+content，只不过他的父元素为html标签对象。

   body标签默认宽度为html的100%, 高度由内容撑开。



### clientLeft和clientTop

这两个属性是所由DOM元素的自有属性，其属性值分别等于DOM元素的左边框宽度和上边框宽度（不带单位px）。





## offset前缀的五个属性

### offsetParent

1. 除html、body以外的元素：

   offsetParent指向第一个开启定位的祖先元素，如果没有开启定位的祖先元素，则包含块为body元素

2. html、body元素的offsetParent属性值为null

3. 开启固定定位的元素的offsetParent属性值为null

> ❗ offsetParent不同于之前学的包含块的概念。
>
> 其实可以认为开启固定定位的offsetParent是浏览器视口，因为开启固定定位的元素的offsetLeft和offsetTop是基于浏览器视口计算偏移量的。



### offsetWidth和offsetHeight

`offsetWidth`和`offsetHeight`分别表示**DOM元素的盒模型横向、纵向尺寸**。

对于所有DOM元素（包括html、body），offsetWidth和offsetHeight属性值计算方法如下：

offsetWidth = 左右boder + 左右padding + contentWidth

offsetHeight = 上下boder + 上下padding + contentHeight



### html的offsetWidth和offsetHeight

> 最特殊的盒子一定是html，因为他是最外面的盒子。那么html的盒模型尺寸怎么算 ❓

⭐ **html盒模型的计算方法：**

<font color="red">前提：html没有设置margin、border、padding，一般也不会设置</font>

+ 宽度

  ```mathematica
  html.offsetWidth = html.width
  当为 html 的 width 设置为 n px时，其内容区宽度就为n px。
  当为 html 的 width 设置为 n% 时，其内容区宽度为 n% × html.clientWidth
  当为 html 的 width 默认为 auto 时，html.offsetWidth = html.clientWidth
  ```

+ 高度

  ```mathematica
  html.offsetHeight = height
  当为 html 的 height 设置为 n px时，其内容区高度就为n px。
  当为 html 的 height 设置为 n% 时，其内容区高度为 n% × html.clientHeight
  当为 html 的 height 默认为 auto 时，其内容区高度为由body撑开。
  ```







### offsetLeft和offsetTop

offsetLeft和offsetTop属性表示DOM元素相对于offsetParent可视区域左边界、上边界的偏移量，不带单位px。

简单来说，offsetParent可视区域的左边界、上边界就是offsetParent内边距的外侧。

```html
<!-- 举例1 -->
<style>
    *{
        padding: 0;
        margin: 0;
    }
    body {
        padding-left: 10px;
        padding-top: 10px;
    }
    .box {
        width: 200px;
        height: 200px;
        border: 1px solid #000;
    }
    .content {
        width: 100px;
        height: 100px;
        margin-left: 50px;
        margin-top: 50px;
        background-color: pink
    }
</style>
<body>
    <div class="box">
        <div class="content"></div> <!-- ⭐此时div.content的offsetLeft和offsetTop为61 -->
    </div>
</body>
```

![image-20210105202533732](client-offset-scroll%E7%AD%89%E5%B1%9E%E6%80%A7%E7%9A%84%E5%8C%BA%E5%88%AB.assets/image-20210105202533732.png) 



```html
<!-- 举例2 -->
<style>
    *{
        padding: 0;
        margin: 0;
    }
    body {
        padding-left: 10px;
        padding-top: 10px;
    }
    .box {
        position: relative;
        width: 200px;
        height: 200px;
        border: 1px solid #000;
        padding: 10px;
        background-color: grey;
        background-clip: content-box;
    }
    .content {
        position: absolute;
        left:50px;
        width: 100px;
        height: 100px;
        margin-left: 50px;
        margin-top: 50px;
        background-color: pink
    }
</style>
<body>
    <div class="box">
        <div class="content"></div> 
        <!-- ⭐此时div.content的offsetLeft和offsetTop为100 
			等于left + margin-left，因为绝对定位定位原点是div.box的padding左上角
        -->
    </div>
</body>
```

![image-20210105202429426](client-offset-scroll%E7%AD%89%E5%B1%9E%E6%80%A7%E7%9A%84%E5%8C%BA%E5%88%AB.assets/image-20210105202429426.png) 

> html、body元素的offsetLeft和offsetTop值在不同浏览器中计算方法不同。（火狐和Chrome就不相同）

> ❗ 注意：当为body、html设置了padding、border等情况时，offsetParent为body的元素的offsetLeft和offsetTop值会和意想的不一样，所以尽量不要为body和html设置padding和margin还有border。



## scroll前缀的四个属性

scrollWidth和scrollHeight这两个属性用来获取指定元素`内容层的真实宽度和高度`。

> “内容层”不是内容区，是一个抽象概念。

### scrollHeight和scrollHeight

**MDN官方解释**：

The **`Element.scrollHeight`** read-only property is a measurement of the height of an element's content, including content not visible on the screen due to overflow.

翻译：Element.scrollHeight 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的不可见内容。

The **`Element.scrollWidth`** read-only property is a measurement of the width of an element's content, including content not visible on the screen due to overflow.

翻译：Element.scrollHeight 这个只读属性是一个元素内容宽度的度量，包括由于溢出导致的不可见内容。

**以scrollHeight为例：**

1. **`scrollHeight `的值等于该元素在不使用滚动条的情况下为了适应视口中所有内容所需的最小高度（包括padding，不包括border、margin和滚动条）。** 

2. **没有垂直滚动条的情况下（没有设置height或没有溢出的情况发生），scrollHeight值与元素视图填充所有内容所需要的最小值`clientHeight`相同。包括元素的padding，但不包括元素的border、margin、scrollHeight和滚动条，也包括 `::before`和 `::after`这样的伪元素。**

**scrollHeight的计算方法：**

1. Chrome中：

```mathematica
隐藏的高度 = 可见的后代元素在布局之后溢出该元素内容区的最大高度
scrollHeight = padding-top + contentHeight + 隐藏内容的高度 + padding-bottom
```

2. 火狐、Edge：

```mathematica
scrollHeight = padding-top + contentHeight + Max(隐藏内容的高度, padding-bottom)
```

> 感觉Chrome更为合理。
>
> 火狐和Edge在隐藏区域的高度小于padding-bottom时是无法滚动的。







### scrollTop和scrollLeft

`scrollTop`：对象的最顶部到对象在当前窗口显示的范围内的顶边的距离，即在出现了纵向滚动条的情况下，滚动条拉动的距离。

`scrollLeft`：对象的最左边到对象在当前窗口显示的范围内的左边的距离，即在出现了横向滚动条的情况下，滚动条拉动的距离。

**以scrollTop为例：**

该值等于当前容器的内容区顶部那条线



![image-20210106211636474](client-offset-scroll%E7%AD%89%E5%B1%9E%E6%80%A7%E7%9A%84%E5%8C%BA%E5%88%AB.assets/image-20210106211636474.png) 



❗ **最佳实践**：判断一个容器box是否正好滚动到了某个后代元素盒模型顶部（border-top）

1. 容器box开启定位,，如 position: relative

2. 后代元素child不存在其他的开启定位的中间祖先元素，其offsetParent指向box

3. box.scrollTop = child.offsetTop - box.padding-top ⭐⭐（因为offsetTop是相对于offsetParent的padding）

   > 注意，一些布局在容器相对靠下位置的后代元素是永远不会滑动到容器内容区顶部的。



❗  **最佳实践：**元素滑到底了：

```mathematica
scrollHeight - scrollTop == clientHeight
```





❗ **最佳实践**：对可能会发生纵向滚动的页面设置样式

```css
html,body {
    width: 100%;
    height: 100%;
}
html {
    overflow: hidden;
}
body {
    overflow-y: scroll; /* 一开始就加上滚动条，防止滚动条的出现和消失影响body.width的计算值 */
}
```



❗ **最佳实践**：不允许页面整体发生滚动

```css
html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
```







## 总结图

![image-20210106211714854](client-offset-scroll%E7%AD%89%E5%B1%9E%E6%80%A7%E7%9A%84%E5%8C%BA%E5%88%AB.assets/image-20210106211714854.png)