

// 以上是轮播图

let scroll = new BScroll('.wrapper', {
  probeType: 3,
  click: true,
  pullUpLoad: true
}) 

let typeEl = document.querySelector('.store1>.choose')
let typeSite = typeEl.offsetTop - typeEl.offsetHeight;

// 购物选项卡
$('.store1 .choose li').each(function(index, item) {
  $(this).click(function() {
    $(this).addClass('active').siblings().removeClass('active')
    $('.store2 .choose li').eq(index).addClass('active').siblings().removeClass('active')
  })
})
$('.store2 .choose li').each(function(index, item) {
  $(this).click(function() {
    $(this).addClass('active').siblings().removeClass('active')
    $('.store1 .choose li').eq(index).addClass('active').siblings().removeClass('active')
  })
})
// 监听滚动条滚动距离
function onScroll(pos) {
        if (parseInt(-pos.y) >= typeSite) {
            if ($('.store2').hasClass('hide')) {
                $('.store2').removeClass('hide');
                $('.store1 > .choose').addClass('invisible')
                
            }
        }

        if (parseInt(-pos.y) < typeSite) {
            if (!$('.store2').hasClass('hide')) {
                $('.store2').addClass('hide');
                $('.store1 > .choose').removeClass('invisible')
             
            }
        }
   


    }
scroll.on('scroll', onScroll)

let elArr = [{
    img: './images/goods1.jpg',
    title: '广州·BilibiliWorld 2020',
    time: '2020.12.26 - 12.27',
    city: '广州市',
    place: '琶洲广交会展馆',
    price: '0起'
  },
  {
    img: './images/goods2.jpg',
    title: ' 上海·恋与制作人动画 × animate cafe咖啡店',
    time: '2020.12.11 - 2021.01.17',
    city: '上海市',
    place: 'animate cafe上海店',
    price: '30'
  },
  {
    img: './images/goods3.jpg',
    title: '上海·Bilibili Macro Link-Visual Release 2020',
    time: '2020.12.19',
    city: '上海市',
    place: '国家会展中心',
    price: '280'
  },
  {
    img: './images/goods4.jpg',
    title: '广州·萤火虫动漫游戏嘉年华25th',
    time: '2021.01.01 - 01.03',
    city: '广州市',
    place: '琶洲·保利世贸博览馆',
    price: '30'
  },
  {
    img: './images/goods5.jpg',
    title: '成都·咕噜猫咪咖啡馆',
    time: '2019.06.01 - 2021.05.10',
    city: '成都市',
    place: '钻石广场',
    price: '30'
  },
  {
    img: './images/goods6.jpg',
    title: '北京·萤火虫IDO国际动漫游戏嘉年华2nd',
    time: '2021.01.01 - 01.03',
    city: '北京市',
    place: '北京亦创国际会展中心',
    price: '30'
  }]
  
//  动态增加节点
  function addEl(target) {
    let str = ''
    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * 6)
      let obj = elArr[randomIndex]
      str += `  <li>
            <div class="imgBox"><img src=${obj.img} alt=""></div>
            <div class="goodsInfo">
              <span class="title">
               ${obj.title}
            </span>
              <div class="site">
                <span class="time">${obj.time}</span>
                <span class="city">${obj.city}</span>
                <span>${obj.place}</span>
              </div>
              <span class="label">独家</span>
              <span class="price">
                ￥<span>${obj.price}</span>
                 <span class="like">9.7万人想去</span>
                 <span class="addCart">+</span>
              </span>
            </div>
          </li>`
    }
    target.append($(str))
  }

  // 监听下拉事件
  scroll.on('pullingUp', () => {
    addEl($('.goods'))
    scroll.refresh();
    setTimeout(() => {
     
    scroll.finishPullUp()
    }, 1000)
  })


  $('.advance').click(function() {
    window.location.href = './cinema.html'
  })

  backTopFnc(scroll)



