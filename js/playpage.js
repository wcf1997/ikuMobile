// 返回
$('.back').click(function() {
  window.history.back()
})

// 上下滑动
const scroll = new BScroll('.wrapper', {
  probeType: 3,
  click: true,
  scrollX: false

})

// 选集滑动
const epiScroll = new BScroll('.epi-wrapper', {
  probeType: 2,
  click: true,
  scrollX: true,
  scrollY: false

})

// 监听 选集滑动
epiScroll.on('scroll', function (pos) {
  if (pos.x !== 0) {
    isMove = false
  } else {
    isMove = true
  }


})
// 监听主体滑动
scroll.on('scroll', function (pos) {
  if (pos.y !== 0) {
    isMove = false
  } else {
    isMove = true
  }

})
// 当前展示项
let currentIndex = 0
//  移动过渡
function traslateX(obj, x) {
  obj.css('transform', 'translateX(' + x + 'px)')

}
// 简介 评论切换
function showContent(index) {

  $('.type-nav>div')
    .eq(index).addClass('act')
    .siblings().removeClass('act')
}
// 简介 评论切换
$('.type-nav>div').each(function (index, item) {
  $(item).on('touchstart', function (e) {
    $(this).css('background-color', '#efefef')
    currentIndex = index
    showContent(index)
    traslateX($('.main'), -index * pageWidth);

    $(item).on('touchend', function () {
      $(this).css('background-color', '#fff')

    })
  })
})


// 滑动切换功能
// 手指按下位置
let startX = 0;
let starY = 0
// 触摸移动位置
let moveX = 0;
let isMove = false;
//  获取屏幕可视宽度
let pageWidth = $(window).width()
// 监听手指按下
$('.main').on('touchstart', function (e) {
  // startY = e.originalEvent.touches[0].clientY
  startX = e.originalEvent.touches[0].clientX
})


// 监听触摸移动时间
$('.main').on('touchmove', function (e) {

  let distance = 0
  let moveY;
  if (isMove) {
    moveX = e.originalEvent.touches[0].clientX
    distance = moveX - startX
    if ((distance < 0 && currentIndex < 1) ||
      (distance > 0 && currentIndex > 0)) {
      traslateX($('.main'), -currentIndex * pageWidth + distance)
      $('.cmt-footer').addClass('hide')
    }
  }


})
// 监听手指抬起时间
$('.main').on('touchend', function (e) {
  let distance = moveX - startX

  if (isMove && Math.abs(distance) >= pageWidth / 3) {
    if (distance > 0) {
      if (currentIndex > 0) {
        currentIndex--;
        traslateX($('.main'), -pageWidth * currentIndex)
        showContent(currentIndex)
        $('.cmt-footer').addClass('hide')

      } else {
        traslateX($('.main'), -pageWidth * currentIndex)

      }

    } else {
      if (currentIndex < 1) {
        currentIndex++
        traslateX($('.main'), -pageWidth * currentIndex)
        showContent(currentIndex)
        $('.cmt-footer').removeClass('hide')
      } else {
        traslateX($('.main'), -pageWidth * currentIndex)
      }
    }


  } else {
    traslateX($('.main'), -pageWidth * currentIndex)
  }
  startX = 0
  isMove = false
  moveX = 0

})


$('.epi-wrapper').on('touchstart', function (e) {

  isMove = false
})

//  监听发布按钮
$('.cmt-footer .release').click(function (e) {
  let username, conetent, time, str;
  let date = new Date()
  let data = JSON.parse(window.sessionStorage.getItem('user'))
  if (!data) {
    $('.hint').removeClass('hide')
    setTimeout(function () {
      $('.hint').addClass('hide')
    }, 1000)
  }

  conetent = $('.cmt-footer input').val()
  time = formatDate(date, 'MM-dd')
  username = JSON.parse(window.sessionStorage.getItem('user')).username
  str = `	<div class="cmt-item clearfix">
            <div class="user-avatar left">
              <img src="./images/avatar02.jpg" alt="">
            </div>
            <div class="left user-info">
              <div class="info-head clearfix">
                <span class="user-name vip">用户名</span>
                <span class="add-user iconfont right">&#xe6a7;&nbsp;关注</span>
              </div>
              <div class="release-time">12-5</div>
              <div class="cmt-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, sapiente?
              </div>
              <div class="ops clearfix iconfont">
                <span class="favor act">&#xe60f;<i>10.3万</i></span>
                <span class="dislike">&#xe60d;</span>
                <i class="right menu iconfont">&#xe606;</i>
              </div>

            </div>
          </div>`
  $('.comment-box ').append(str)
})

// 视频点赞
$('.ops .like').click(function () {
  $('.like').toggleClass('act')
})


function Player() {

}
Player.prototype = {
  init() {
    this.videoObj = document.getElementsByClassName('video')[0]
    this.playBtn = document.querySelector('.play-status>span')
    this.bgLine = document.querySelector('.bg-line')
    this.bgLineWidth = this.bgLine.offsetWidth;
    this.line = document.querySelector('.act-line')
    this.dot = document.querySelector('.dot>svg')
    this.totalTimeEl = document.querySelector('.total-t')
    this.currentTimeEl = document.querySelector('.current-t')
    this.volume = 0.3
    this.totalTime = 0;
    this.currentTime ;
  
  
    this.getVideoTotalTime()
    this.setVolume(this.volume)
  
  
  },
  // 播放视频
  playVideo() {
    let _this = this
    this.playBtn.onclick = function () {
        if (_this.playBtn.getAttribute('class')) {
        _this.videoObj.pause()
        _this.playBtn.classList.remove('pause')
      } else {
        _this.videoObj.play()
        _this.playBtn.classList.add('pause')
      }
    
    }
  },
  // 设置视频音量
  setVolume(num) {
    this.videoObj.volume = num
  },
  // 获取总时长
  getVideoTotalTime() {
    let _this = this
    setTimeout(() => {
      this.videoObj.oncanplay = function() {
      _this.totalTime = _this.videoObj.duration
      _this.totalTimeEl.innerHTML = _this.formateTime(_this.totalTime)
      _this.lineClick()
      _this.playVideo()
      _this.videoPlayListener()
      _this.progressDrag()
    }
    })
  
  },
  // 监听播放事件
  videoPlayListener() {
    addEvent(this.videoObj, 'timeupdate', () => {
  
      this.currentTime = this.videoObj.currentTime
      let num = this.getTimePrecentage(this.currentTime)
      this.setCurrentTime(this.currentTime)
      this.lineAndDotMove(num)
  

    })

  },
  // 获取进度百分比
  getTimePrecentage(time) {
    
      return Math.floor((time * 10 / this.totalTime) * 1000) / 100
  
  },
  // 修改进度条
  lineAndDotMove(num) {

    this.line.style.width = num + '%'
    this.dot.style.left = num + '%'


  },
  // 跳播
  lineClick() {
    addEvent(this.bgLine, 'click', (e) => {
    
      let site = e.clientX - this.bgLine.parentElement.offsetLeft;
      let lineWidth = this.bgLine.offsetWidth
      let sitePrec = Math.floor((site / lineWidth) * 1000) / 10
      this.currentTime = this.totalTime * sitePrec /100
      this.videoObj.currentTime = 	this.currentTime
      this.lineAndDotMove(sitePrec)

    

    })
  },
  // 进度条拖拽功能
  progressDrag() {

    $(this.dot).on('touchstart', (e) => {
      console.log(this.bgLineWidth);
    })
    $(this.dot).on('touchmove',(e) => {
      this.isMove = true
      this.videoObj.pause()
      this.moveX = e.originalEvent.touches[0].clientX -  this.bgLine.parentElement.offsetLeft;
      if (this.moveX > 0 && this.moveX < this.bgLineWidth) {
        let progress = Math.floor((this.moveX / this.bgLineWidth) * 1000) / 1000
        this.currentTime = progress * this.totalTime
        this.videoObj.currentTime = this.currentTime
        this.lineAndDotMove(progress * 100)
        
      }
    })
    $(this.dot).on('touchend', (e) => {
      if (this.playBtn.hasAttribute('class')) {
      
        this.videoObj.play()
      } else {
        this.videoObj.pause()
      }
    })
  },
  formateTime(num) {
    if (num === 0) return;
    num = Math.floor(num)
    let minute = parseInt(num / 60)
    let second = num % 60
    minute = minute < 10 ? "0" + minute : minute
    second = second < 10 ? "0" + second : second
    return minute + ":" + second
  },
  setCurrentTime(time) {
;
    let strTime = this.formateTime(time)
    this.currentTimeEl.innerHTML = strTime

  },

}

let player = new Player();
player.init()