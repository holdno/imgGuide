var sgImgGuide = function(dom, config){
  if(config){
    this.width = config.width
    this.height = config.height
    this.interval = config.interval
    this.listNum = config.listNum
    this.itemWidth = config.itemWidth
    this.itemHeight = config.itemHeight
    this.totalWidth = config.totalWidth
  }else{
    this.width = 120
    this.height = 120
    this.interval = 10
    this.listNum = 4
    this.itemWidth = 120
    this.itemHeight = 80
    this.totalWidth = 765
    this.totalHeight = 0
    this.count = 0
    this.yMax = 0
  }
  
  // 如果dom传入的是一个字符串 则通过该字符串获取dom对象
  if(Object.prototype.toString.call(dom) === "[object String]"){
    dom = document.querySelector(dom)
  }

  this.randomString = function(len) {
  　　len = len || 32;
  　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  　　var maxPos = chars.length
  　　var pwd = ''
  　　for (i = 0; i < len; i++) {
  　　  pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  　　}
  　　return pwd
  },
  this.foreach = function(doms, func){
    var length = doms.length
    for(var i = 0; i < length; i++){
      func.call(this, doms[i], i)
    }
  },
  this.domList = [],
  this.imgGuide = function(dom, e){
    var imgList = dom.querySelector('.img-list')
    if(imgList.style.display == '' || imgList.style.display == 'block'){
      dom.querySelector('.img-list').style.display = 'none'
      dom.querySelector('.img-guide').style.display = 'block'
    }
    var index = e.target.getAttribute('data-index')
    var url = e.target.getAttribute('data-img')
    var img = new Image()
    img.src = url
    var currentImg = dom.querySelector('.img-guide__current-img')
    currentImg.style.width = ''
    currentImg.style.height = ''
    currentImg.marginTop = ''
    currentImg.marginLeft = ''
    var maxWidth = this.totalWidth - this.width - 20
    if(img.width > img.height){
      // 宽图
      if(img.width > maxWidth){
        currentImg.style.width = maxWidth - 20 + 'px'
        img.height = img.height * (maxWidth - 20) / img.width
        img.width = maxWidth - 20
      }
      
    }else{
      if(img.height > this.totalHeight){
        currentImg.style.height = this.totalHeight - 20 + 'px'
        img.width = img.width * (this.totalHeight - 20) / img.height
        img.height = this.totalHeight - 20
      }
    }
    // 设置左右居中
    var w = maxWidth - img.width
    console.log(w)
    if(w > 0){
      console.log(w)
      currentImg.style.marginLeft = w / 2 + 'px'
    }
    
    // 设置图片上下居中
    var h = this.totalHeight - img.height
    if(h > 0){
      currentImg.style.marginTop = h / 2 + 'px'
    }
    
    console.log(index)
    if(index > 1 && this.count - index > 0){
      var y = (this.height + this.interval) / 2 * (index * 2 - 3)
      if(y > this.yMax){
        y = this.yMax
      }
      dom.querySelector('.img-guide__list-slider').style.transform = 'translate3d(0, -'+ y +'px, 0)'
      dom.querySelector('.img-guide__list-slider').setAttribute('data-y', y)
    }else if(index <= 1){
      dom.querySelector('.img-guide__list-slider').style.transform = 'translate3d(0, 0, 0)'
      dom.querySelector('.img-guide__list-slider').setAttribute('data-y', 0)
    }
    currentImg.src = url
  },
  this.close = function(){
    var e = window.event || arguments.callee.caller.arguments[0]
    e = e.target
    var go = true
    var i = 0
    while(go){
      console.log(e.parentNode)
      if(e.parentNode.getAttribute('class') == 'showguide-comment-img'){
        var dom = e.parentNode
        dom.querySelector('.img-list').style.display = 'block'
        dom.querySelector('.img-guide').style.display = 'none'
        break
      }else{
        i++
        e = e.parentNode
      }
      if(i > 10){
        console.log('waring')
        break
      }
    }
    console.log(e)
  },
  this.prev = function(){
    var e = window.event || arguments.callee.caller.arguments[0]
    e = e.target
    var go = true
    var i = 0
    while(go){
      if(e.parentNode.getAttribute('class') == 'showguide-comment-img'){
        var dom = e.parentNode
        var slider = dom.querySelector('.img-guide__list-slider')
        var yNow = slider.getAttribute('data-y')
        var len = Number(yNow) - Number(this.height) - Number(this.interval)
        if(len < 0){
          var y = 0
        }else{
          var y = len
        }
        slider.setAttribute('data-y', y)
        slider.style.transform = 'translate3d(0, -'+ y +'px, 0)'
        break
      }else{
        i++
        e = e.parentNode
      }
      if(i > 10){
        console.log('waring')
        break
      }
    }
  },
  this.next = function(){
    var e = window.event || arguments.callee.caller.arguments[0]
    e = e.target
    var go = true
    var i = 0
    while(go){
      if(e.parentNode.getAttribute('class') == 'showguide-comment-img'){
        var dom = e.parentNode
        var slider = dom.querySelector('.img-guide__list-slider')
        var yNow = slider.getAttribute('data-y')
        var len = Number(yNow) + Number(this.height) + Number(this.interval)
        console.log(len)
        if(len > this.yMax){
          var y = this.yMax
        }else{
          var y = len
        }
        slider.setAttribute('data-y', y)
        slider.style.transform = 'translate3d(0, -'+ y +'px, 0)'
        break
      }else{
        i++
        e = e.parentNode
      }
      if(i > 10){
        console.log('waring')
        break
      }
    }
  },
  this.makeGuide = function(imgdomlist){
    // 生成出来的结构大致如下
    // <div class="img-guide">
    //  <div class="img-guide__current">
    //    <img class="img-guide__current-img" src=""/>
    //  </div>
    //  <div class="img-guide__list">
    //    <div class="img-guide__list-item" style="background-image: url(xxx)"></div> 
    //    <div class="img-guide__list-item" style="background-image: url(xxx)"></div> 
    //    <div class="img-guide__list-item" style="background-image: url(xxx)"></div> 
    //    <div class="img-guide__list-item" style="background-image: url(xxx)"></div> 
    //    <div class="img-guide__list-item" style="background-image: url(xxx)"></div> 
    //  </div>
    // </div>
    var length = imgdomlist.length
    if(length == 0){
      return false
    }

    var imgGuide = document.createElement('div')
    imgGuide.setAttribute('class', 'img-guide')
    imgGuide.style.width = this.totalWidth + 'px'

    // 返回按钮
    var close = document.createElement('div')
    close.setAttribute('class', 'img-guide__close')
    close.innerHTML = '关闭'
    close.onclick = (function(){
      this.close()
    }).bind(this)

    var currentGuide = document.createElement('div')
    currentGuide.setAttribute('class', 'img-guide__current')
    currentGuide.style.width = this.totalWidth - 20 - this.width + 'px'
    currentImg = document.createElement('img')
    currentImg.setAttribute('class', 'img-guide__current-img')
    currentGuide.appendChild(currentImg)

    var listGuide = document.createElement('div')
    listGuide.setAttribute('class', 'img-guide__list')
    listGuide.style.width = this.width + 'px'
    listGuide.style.height = (this.height + this.interval) * this.listNum - this.interval + 'px'

    var prev = document.createElement('div')
    prev.setAttribute('class', 'img-guide__list-prev')
    prev.style.width = this.width + 'px'
    prev.onclick = (function(){
      this.prev()
    }).bind(this)

    var next = document.createElement('div')
    next.setAttribute('class', 'img-guide__list-next')
    next.style.width = this.width + 'px'
    next.onclick = (function(){
      this.next()
    }).bind(this)

    var listSlider = document.createElement('div')
    listSlider.setAttribute('class', 'img-guide__list-slider')
    this.foreach(imgdomlist, function(value, key){
      var item = document.createElement('div')
      item.setAttribute('class', 'img-guide__list-item')
      item.setAttribute('data-img', value.getAttribute('data-img'))
      item.setAttribute('data-index', key)
      item.style.width = this.width + 'px'
      item.style.height = this.height + 'px'
      item.style.marginBottom = this.interval + 'px'
      item.style.backgroundImage = 'url('+ value.getAttribute('data-img') +')'
      listSlider.appendChild(item)
    })
    listGuide.appendChild(listSlider)

    imgGuide.appendChild(prev)
    imgGuide.appendChild(next)
    imgGuide.appendChild(close)
    imgGuide.appendChild(currentGuide)
    imgGuide.appendChild(listGuide)
    console.log(this.count)
    this.yMax = ((this.height + this.interval) * this.count) - ((this.height + this.interval) * this.listNum)
    console.log(this.yMax)
    this.totalHeight = (this.height + this.interval) * this.listNum - this.interval + 80 // 80是上下两个按钮的位置

    return imgGuide
  }
  
  var random = this.randomString(5)
  var imgItem = dom.querySelectorAll('.img-list__item')
  this.foreach(imgItem, function(v, k){
    // 给每个图片设置宽高
    v.style.width = this.itemWidth + 'px'
    v.style.height = this.itemHeight + 'px'
    v.style.backgroundImage = 'url('+ v.getAttribute('data-img') +')'
    v.setAttribute('data-index', k)
  })
  this.count = imgItem.length
  dom.setAttribute('data-modelId', random)
  dom.appendChild(this.makeGuide(imgItem))
  dom.querySelector('.img-list').onclick = (function(){
    var e = window.event || arguments.callee.caller.arguments[0]
    e.target.getAttribute('data-img') && this.imgGuide(dom, e)
  }).bind(this)
  dom.querySelector('.img-guide__list').onclick = (function(){
    var e = window.event || arguments.callee.caller.arguments[0]
    e.target.getAttribute('data-img') && this.imgGuide(dom, e)
  }).bind(this)
}
