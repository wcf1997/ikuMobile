let userSession = window.sessionStorage.getItem('user')
if (userSession) {
    userSession = JSON.parse(userSession)
    username = userSession.nickname

} else {
    username = "点击头像登陆"
}
let asideEl = ` <aside class="aside ">
<div class="aside-box ">
    <div id="wrapper2">
        <div class="content">
            <div class="aside-header">
                <div class="user">
                    <a href="./login.html"><div><img src="./images/avatar02.jpg" alt="" class="user-avatar"></div></a>
                    <div class="right-control">
                        <span class="logout iconfont">&#xe679;</span>
                        <span class="saoyisao iconfont">&#xe65c;</span>
                    </div>
                </div>
                <div class="user-info">
                    <div class="user-name">
                        <span>${username}</span>
                        <span class="grade">LV5</span>
                        <span class="vip-info">正式会员</span>
                    </div>
                    <div class="stuff">
                        B币:<span>0.0</span>
                        硬币:<span>1195.0</span>
                    </div>
                </div>
            </div>
           <a href="#">
            <div class="mine-vip">
                <span>我的大会员</span>了解更多权益
                <span class="arrow">></span>

            </div>
           </a>
            <div class="options">
                <div class="ops-item">
                    <div><div>3</div>
                        <span>动态</span></div>
                </div>
                <div class="ops-item">
                   <div>
                    <div>3</div>
                    <span>关注</span>
                   </div>
                </div>
                <div class="ops-item">
                    <div>
                        <div>1</div>
                    <span>粉丝</span>
                    </div>
                </div>
            </div>
            <ul class="menu">
                <a href="#"><li class="active"><i class="icon iconfont">&#xe609;</i><span>首页</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe685;</i><span>历史记录</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe605;</i><span>下载管理</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe60c;</i><span>我的收藏</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe684;</i><span>稍后再看</span></li></a>
                <li class="line"></li>
                <a href="#"><li><i class="icon iconfont">&#xe60a;</i><span>发布</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe66e;</i><span>创作中心</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe651;</i><span>热门活动</span></li></a>
                <li class="line"></li>
                <a href="#"><li><i class="icon iconfont">&#xe614;</i><span>直播中心</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe6f0;</i><span>我的课程</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe667;</i><span>邀好友赚红包</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe652;</i><span>我的订单</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe603;</i><span>会员购中心</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe610;</i><span>联系客服</span></li></a>
                <a href="#"><li><i class="icon iconfont">&#xe7fc;</i><span>青少年模式   </span></li></a>

            </ul>
        </div>
    </div>

</div>
</aside>
`

$('#app').append($(asideEl))

// 个人信息滑动
$('.avatar').click(function () {
    $('.aside').addClass('mask')
    setTimeout(() => {
        $('.aside-box').addClass('slip')
    }, 200)
})

let startX = 0;
let moveX = 0;
let distance = 0;
let isMove = false
let winWidth = document.body.clientWidth;
window.onresize = function () {
    winWidth = document.body.clientWidth;

}

let scroll2 = new BScroll('#wrapper2', {
    probeType: 3,
    click: true,
    scrollX: false
})
scroll2.on('scroll', function (pos) {
   if (pos.y !== 0) {
    isMove = false

   } else {
    isMove = true
   }
   console.log(isMove);
})
scroll2.on('scrollEnd', function (pos) {
    isMove = true
})
scroll2.refresh()

// 手指触摸位置
$('.aside').on('touchstart', function (e) {
    startX = e.originalEvent.touches[0].pageX

})
// 手指移动距离
let asdeWidth = $('.aside-box').width()
let asideBox = $('.aside-box').width()
// 背景透明度
let opt = 0.5
$('.aside').on('touchmove', function (e) {
    moveX = e.originalEvent.touches[0].pageX;

    distance = startX - moveX
    isMove = true
    if (distance > 0 && isMove) {
        $('.aside-box').css({
            'left': -distance + 'px'
        })

        if (0.5 - distance / asideBox >= 0) {
            $('.aside').css('background-color', `rgba(0,0,0,${0.5 - distance / asideBox}`)
        }
    }
})
// 手指离开屏幕
$('.aside').on('touchend', function () {

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
    $('.aside').css('background-color', `rgba(0,0,0,${0.5 - distance / asideBox}`)
})

// 退出登陆

$('.logout').click(function(){
    if (userSession) {
        window.sessionStorage.removeItem('user')
    }
    window.location.href = window.location.pathname
})



function finishPullLoad(sc) {
    sc.refresh();
    setTimeout(() => {
        sc.finishPullUp()
    }, 1000)
}

function addEl(target, origin, sc) {
    let str = '';
    for (let i = 0; i < 6; i++) {
        str += origin
    }

    target.append(str);
    finishPullLoad(sc)

}

// 回到顶部
let backTop = ` <div class="backTop hide"></div>`
$('#app').append(backTop)

function backTopFnc(scroll) {
    scroll.on('scroll', function (pos) {
        if (parseInt(-pos.y) > 900) {
            $('.backTop').removeClass('hide')
        } else {
            $('.backTop').addClass('hide')
        }
    })

    $('.backTop').click(function () {
        scroll.scrollTo(0, 0, 300)
    })
}