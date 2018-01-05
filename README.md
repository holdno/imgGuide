# imgGuide
一个图片展柜组件

### 使用
引入js文件及css文件  
按照示例进行dom布局  
``` javascript
new sgImgGuide('#floor1', {
  // 展柜模式
  width: 120, // 右侧筛选图的宽度
  height: 120, // 右侧筛选图的高度
  interval: 10, // 右侧筛选图的间距
  listNum: 4, // 右侧筛选图的容纳个数
  // 横向列表图片自定义大小
  itemWidth: 120,
  itemHeight: 80,
  // 组件整体宽度
  totalWidth: 765, 
})
```

### 配置
``` javascript
config.width // 列表模式图片的宽度
config.height // 列表模式图片的高度
config.interval  // 图片的间距
config.listNum  // 展柜模式右侧可选区显示图片的数量
config.itemWidth // 展柜模式右侧可选区图片的宽度
config.itemHeight // 展柜模式右侧可选区图片的高度
config.totalWidth // 整个组件的宽度
```
