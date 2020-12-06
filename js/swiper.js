

window.onload = function() {
  // 轮播图
function Swiper(outSide, innerEl, dotEl) {
  this.outSide = outSide
  this.innerEl = innerEl
  this.dotEl = dotEl || ''

}
Swiper.prototype = {
init() {

  this.vipBanner = document.querySelector(this.outSide)
  this.bannerUl = document.querySelector(this.innerEl)
  this.vipBannerWidth = this.vipBanner.offsetWidth;
  this.dotArr = document.querySelectorAll('.dot li')
  this.startX = 0
  this.moveX = 0
  this.index = 1
  this.isMove = false
  this.delay = 2500;
  this.timer = '';

  this.touchStart()
  this.touchMove()
  this.touchEnd()
  this.animation()
  this.dotClick()
},
// 增加过渡
addTransition() {
  this.bannerUl.style.addTransition = "all .2s";
  this.bannerUl.style.webkitTransition = "all .2s";
},
// 取消过渡
remTransition() {
  this.bannerUl.style.transition = "none";
  this.bannerUl.style.webkitTransition = "none";
},
// 设置移动距离
setTranslate(translatex) {
  this.bannerUl.style.webkitTransform = "translateX(" + translatex + "px)";
  this.bannerUl.style.transform = "translateX(" + translatex + "px)";
},
// 轮播图的动画
animation() {
  this.timer = setInterval(() => {

    this.index ++;
    this.addTransition()
    this.setTranslate(-this.vipBannerWidth * this.index)

    if (this.index >= 4) {
      setTimeout(() => {
        this.remTransition()
        this.index = 0;
        this.setTranslate(-this.vipBannerWidth * this.index )
       
      },1000)
    
     
    } else if(this.index <= 0) {
      this.index = 5
      this.addTransition()
      this.setTranslate( -this.index * this.vipBannerWidth)
    }
 
    this.dotTransform(this.index)
  },this.delay)

  
 
 
},
// 监听触摸事件
touchStart() {
  let that = this
  this.bannerUl.addEventListener('touchstart', function(e) {
   clearInterval(that.timer)
  
   that.startX = e.changedTouches[0].clientX
  })
 
},
// 监听触摸移动
touchMove() {
  let that = this
  this.isMove = true
  let distance ;
  this.bannerUl.addEventListener('touchmove', function(e) {
    that.moveX = e.changedTouches[0].clientX;
    distance = that.moveX - that.startX;
    that.setTranslate(-that.index * that.vipBannerWidth + distance )
  })
 
},
// 监听手指抬起
touchEnd() {
  let that = this
  let distance,minMoveX
  this.bannerUl.addEventListener('touchend', function(e) {
    distance= that.moveX - that.startX
    minMoveX = that.vipBannerWidth / 3
    if (that.isMove && Math.abs(distance) >= minMoveX) {
      if(distance > 0) {
        if (that.index <= 1) {
          that.index = 5
        }else {
          that.index --;
        }
      } else {
        if (that.index >= 5) {
          that.index = 1
        } else {
          that.index ++
        }
      }
      that.setTranslate(-that.index * that.vipBannerWidth) 
     
    
    } else {
      that.setTranslate(-that.index * that.vipBannerWidth) 
    }
    this.dotTransform(this.index)
    this.moveX = 0
  this.startX = 0;
  that.animation()
  })
  
},
// 小圆点的移动效果
dotTransform(i){
  // console.log(i - 1);
  if(i === 0) {
    i = 1
  }
    if (this.dotArr.length > 0) {
      this.dotArr.forEach((item, index) => {
        item.classList.remove('active')
      })
      this.dotArr[i - 1].classList.add('active')
    }
},
// 监听小圆点的点击
dotClick() {
  let that = this
  this.dotArr.forEach((item, index) => {
    item.onclick = function() {
      that.isMove = true
      clearInterval(that.timer)
      that.setTranslate(-(index + 1) * that.vipBannerWidth  )
      that.index = index + 1
      that.dotTransform( that.index)
      that.animation()
    }
  })
  
}


}

if (document.querySelector('.vip-banner')) {
  console.log(2);
  let swiper = new Swiper('.vip-banner', '.vip-banner .banner')
  swiper.init()
 
}
if (document.querySelector('.adv-banner')) {
  let s2 = new Swiper('.adv-banner', '.adv-banner .banner', '.dot>li')

  s2.init()
}

}
