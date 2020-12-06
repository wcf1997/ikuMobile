
  window.onload = function () {

    $('body,html').animate({

        scrollTop: 0

    },

    100

);
    
    let currentIndex = 1
    // 选项卡切换
    $('.main .type-item').each(function (index, item) {
        $(this).click(function () {
            $(this).siblings().removeClass('active')
            $(this).addClass('active')
            currentIndex = index
            $('.type2 .type-item').eq(index).addClass('active')
            $('.type2 .type-item').eq(index).siblings().removeClass('active')
            $('.c-type>div').eq(index).removeClass('hide')
            $('.c-type>div').eq(index).siblings().addClass('hide')

        })
    })

    $('.type2 .type-item').each(function (index, item) {
        $(this).click(function () {
            $(this).siblings().removeClass('active')
            $(this).addClass('active')
            currentIndex = index
            $('.main .type-item').eq(index).addClass('active')
            $('.main .type-item').eq(index).siblings().removeClass('active')
            $('.c-type>div').eq(index).removeClass('hide')
            $('.c-type>div').eq(index).siblings().addClass('hide')
        })
    })

    // 点赞
    $('.main').on('click','.like',function() {
        $(this).toggleClass('active')
        let score = parseInt($(this).children('span').html())
        if (!$(this).hasClass('active')) {
            score--;
        } else {
            score++;
        }
        $(this).children('span').html(score)
    })

    // 设置视频大小
    let vWidth = $('.video-box').width() || 355;
    $('.video').attr('width', vWidth)

    // 播放暂停视频
  
    let videoBox = document.querySelector('.video-container')
    videoBox.addEventListener('click', function(ev) {
        let e = ev || window.event;
        let target = e.target || e.srcElement
        let video = target.querySelector('video')
        console.log(video);
        video.volume = 0.3
        target.classList.toggle('active')
            if (target.classList.contains('active')) {
                video.play()
            } else {
                video.pause();
            }
    })


        // 滚动操作
        let scroll = new BScroll('.wrapper', {
            probeType: 3,
            click: true,
            pullUpLoad:true

        })
        let scroll2 = new BScroll('#wrapper2', {
            probeType: 3,
            click: true,
            
        })
        scroll2.on('scroll',function() {
            isMove = false
          })
          scroll2.on('scrollEnd',function() {
            isMove = true
          })
        scroll2.refresh()
        scroll.refresh();
        let typeSite = parseInt($('.type').offset().top)

        function onScroll(pos) {
            if (parseInt(-pos.y) >= typeSite) {
                if ($('.type2').hasClass('hide')) {
                    $('.type2').removeClass('hide');
                    $('.main .type').addClass('hide')

                }
            }

            if (parseInt(-pos.y) < typeSite) {
                if (!$('.type2').hasClass('hide')) {
                    $('.type2').addClass('hide');
                    $('.main .type').removeClass('hide')

                }
            }

            if ( parseInt(-pos.y) > 1000) {
                $('.backTop').removeClass('hide')
            } else {
                $('.backTop').addClass('hide')
            }

        }
        window.document.body.scroll(0,0)
        scroll.on('scroll', onScroll)
        // 3.监听上拉到底部
    
        function addElement(node, target) {
           
            for (let i = 0; i < 5; i++) {
               
                node += node;
               
            $(target).append($(node))
        
        }
        }
        let zhHtml;
       
        scroll.on('pullingUp', () => {
          if (currentIndex === 1) {
             zhHtml = `  <div class="article">
                    <div class="article-header">
                        <div>
                            <a href="#"><img src="./images/avatar02.jpg" alt="" class="user-avatar"></a>
                        </div>
                        <div class="user-info">
                            <span class="username">官方用户</span>
                            <span class="pub-time">2小时前&nbsp;●&nbsp;投稿了内容</span>
                        </div>
                        <div class="more">
                            <a href="#">
                                <img src="./images/more.png" alt="" class="more-pic">
                            </a>
                        </div>
                    </div>
                    <div class="article-container">
                        <p class="words">就随便放几张图就随便放几张图就随便放几张图就随便放几张图 ...</p>
                        <div class="img-box clearfix">
                            <img src="./images/showImg01.webp" alt="" class="showImg">
                            <img src="./images/showImg02.webp" alt="" class="showImg">
                            <img src="./images/showImg03.webp" alt="" class="showImg">
                            <img src="./images/showImg04.webp" alt="" class="showImg">
                            <img src="./images/showImg05.webp" alt="" class="showImg">
                            <img src="./images/showImg06.webp" alt="" class="showImg">
                        </div>
                    </div>
                    <div class="article-footer">
                        <div class="share">
                            <i></i>
                            <span>666</span>
                        </div>
                        <div class="comment">
                            <i></i>
                            <span>666</span>
                        </div>
                        <div class="like">
                            <i></i>
                            <span>666</span>
                        </div>
                    </div>
                </div>`
            addElement(zhHtml, $('.container'))
          }
          if (currentIndex === 0) {
              zhHtml =  `  <div class="article">
                    <div class="article-header">
                        <div>
                            <a href="#"><img src="./images/avatar02.jpg" alt="" class="user-avatar"></a>
                        </div>
                        <div class="user-info">
                            <span class="username">官方用户</span>
                            <span class="pub-time">2小时前&nbsp;●&nbsp;投稿了内容</span>
                        </div>
                        <div class="more">
                            <a href="#">
                                <img src="./images/more.png" alt="" class="more-pic">
                            </a>
                        </div>
                    </div>
                    <div class="article-container">
                        <p class="words">随便放个视频意思意思随便放个视频意思意思 ...</p>
                        <div class="video-box ">
                            <video height="200" width="355" class="video" poster="./images/pre-video.gif">
                                <source src="./audio/movie1.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div class="article-footer">
                        <div class="share">
                            <i></i>
                            <span>666</span>
                        </div>
                        <div class="comment">
                            <i></i>
                            <span>666</span>
                        </div>
                        <div class="like">
                            <i></i>
                            <span>666</span>
                        </div>
                    </div>
                </div>`
            addElement(zhHtml, $('.video-container'))
          }
          if (currentIndex === 2) {
              zhHtml = ` <div class="article">
                    <div class="article-header">
                        <div>
                            <a href="#"><img src="./images/avatar02.jpg" alt="" class="user-avatar"></a>
                        </div>
                        <div class="user-info">
                            <span class="username">官方用户</span>
                            <span class="pub-time">2小时前&nbsp;●&nbsp;投稿了内容</span>
                        </div>
                        <div class="more">
                            <a href="#">
                                <img src="./images/more.png" alt="" class="more-pic">
                            </a>
                        </div>
                    </div>
                    <div class="article-container">
                        <p class="words">这里是热门板块这里是热门板块这里是热门板块 ...</p>
                        <div class="img-box clearfix">
                            <img src="./images/showImg01.webp" alt="" class="showImg">
                            <img src="./images/showImg02.webp" alt="" class="showImg">
                            <img src="./images/showImg03.webp" alt="" class="showImg">
                            <img src="./images/showImg04.webp" alt="" class="showImg">
                            <img src="./images/showImg05.webp" alt="" class="showImg">
                            <img src="./images/showImg06.webp" alt="" class="showImg">
                        </div>
                    </div>
                    <div class="article-footer">
                        <div class="share">
                            <i></i>
                            <span>666</span>
                        </div>
                        <div class="comment">
                            <i></i>
                            <span>666</span>
                        </div>
                        <div class="like">
                            <i></i>
                            <span>666</span>
                        </div>
                    </div>
                </div>`
                addElement(zhHtml, $('.hot-container'))
          }
            scroll.refresh();
           setInterval(() => { scroll.finishPullUp()}, 1000)
        })

        // 滚动到顶部
        $('.backTop').click(function() {
            scroll.scrollTo(0,0,300)
        })

        
    }

    // 个人信息滑动
    $('.avatar').click(function() {
        $('.aside').addClass('mask')
        setTimeout(() => {$('.aside-box').addClass('slip')},200)
    })
    
    let startX = 0;
    let moveX = 0;
    let isMove = true
    let distance = 0;
    let winWidth = document.body.clientWidth;
    window.onresize = function() {
        winWidth = document.body.clientWidth;
        
    }

    // 手指触摸位置
    $('.aside').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].pageX
        
    })
    // 手指移动距离
    let asdeWidth = $('.aside-box').width()
    let asideBox = $('.aside-box').width()
    // 背景透明度
    let opt = 0.5
    $('.aside').on('touchmove',function(e) {
        moveX = e.originalEvent.touches[0].pageX;
      
            distance = startX - moveX
       
        if (distance > 0 && isMove) {
            $('.aside-box').css({
                'left': -distance+'px'
            })
          
           if ( 0.5 - distance / asideBox >= 0 ) {
            $('.aside').css('background-color',`rgba(0,0,0,${0.5 - distance / asideBox}`)
           }
        }
    })
  // 手指离开屏幕
  $('.aside').on('touchend',function() {
      
   if (moveX > 0) {
    distance = startX - moveX
      $('.aside')

      if (distance > 0 && distance >= winWidth / 4) {
          $('.aside').removeClass('mask')
          $('.aside-box').removeClass('slip')
      } else {
        $('.aside-box').css({
            'left': 0
        })
      }
   }
    //   初始化所有数据
    startX = 0;
    moveX = 0;
    distance = 0;
    $('.aside-box').css({
            'left': 0
        })
    $('.aside').css('background-color',`rgba(0,0,0,${0.5 - distance / asideBox}`)
  })
