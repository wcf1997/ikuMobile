
let scroll = new BScroll('.wrapper', {
  probetype: 3,
  click: true
})

function getSessionShop() {
  return window.sessionStorage.getItem('shopList');

}
let shopList = getSessionShop() ? getSessionShop() : '[]'
shopList = JSON.parse(shopList)
window.onload = function () {

  // 设置总金额
  function setMoney(num, type) {
    if (type === '+') {
      $('.money i').html(parseInt($('.money i').html()) + num)
    } else if (type === '-') {
      $('.money i').html(parseInt($('.money i').html()) - num)
    }

  }
  // 设置总数
  function setCount(num, type) {
    if (type === '+') {
      $('.buy span').html(parseInt($('.buy span').html()) + num)
    } else if (type === '-') {
      $('.buy span').html(parseInt($('.buy span').html()) - num)
    }
  }

  // 设置sessionStorage
  function setSession(obj, data) {
    window.sessionStorage.setItem(obj, data)
  }

  // 事件委托来实现 对商品的操作
  $('.goodsList').delegate('div.right', 'click', function (ev) {
    var target = $(ev.target);


    // 显示元素
    $('.mask').css('display', 'block')
    // 添加类名
    $('.win_box').addClass('bounceInDown')
    $('.cancel').click(function () {
      $('.mask').css('display', 'none')
    })
    // 删除商品
    $('.submit').click(function () {
      target.parents('.goods-item').remove()
      $('.mask').css('display', 'none')

      shopList.forEach((item, index) => {
        if (item['name'].trim() === target.parents('.goodsinfo')
          .children('.goods-name')
          .html().trim()) {
          shopList.splice(index, 1)
         setSession('shopList', JSON.stringify(shopList))
         setCount()
          shopList = JSON.parse(getSessionShop())

          addGoodsList(shopList)
          return
        }
      })
    })

  })

  // 增加减少功能
  $('.goodsList').delegate('div.options .left ', 'click', function (ev) {
    let target = $(ev.target)
    let parentEl = $(target).parents('.goods-item')
    let elId = parseInt(parentEl.attr('data-id'))
    let option = target.attr('class')

    shopList.forEach((item, index) => {
      // 增加操作
      if (option === 'add') {
        if (parseInt(item['id']) === parseInt(elId)) {
          item['count'] += 1;
          target.siblings('.count').html(item['count'])
          setMoney(parseInt(item['price']), '+')
          setCount(1, '+')

        }
      }
      // 减少操作
      else if (option === 'subtract') {

        if (parseInt(target.siblings('.count').html()) > 1) {
          if (parseInt(item['id']) === parseInt(elId)) {
            item['count'] -= 1;
            target.siblings('.count').html(item['count'])
            setMoney(parseInt(item['price']), '-')
            setCount(1, '-')

          }
        }
      } else {

        $('.hint').removeClass('hide')
        setTimeout(() => {
          $('.hint').addClass('hide')
        }, 1000);


      }

    })


    sessionStorage.setItem('shopList', JSON.stringify(shopList))




  })


  // 选择和全选功能
  $('.goodsList').delegate('div.choose', 'click', function (ev) {
    let target = $(ev.target)
    let parentEl = target.parents('.goods-item')
    let elId = parentEl.attr('data-id')
    // key === 数组长度则全选激活
    let key = 0;
    shopList.forEach((item, index) => {
      if (parseInt(item['id']) === parseInt(elId)) {
        let status = item['active']
        if (status) {
          parentEl.removeClass('active')
          item['active'] = ''
          setCount(parseInt(item['count']), '-')
          setMoney(parseInt(item['price']) * parseInt(item['count']), '-')

        } else {
          parentEl.addClass('active')
          item['active'] = 'active'
          setCount(parseInt(item['count']), '+')
          setMoney(parseInt(item['price']) * parseInt(item['count']), '+')


        }
      }
      if (!item['active']) {
        $('.selectAll').removeClass('active')
      } else {
        key++
      }
      if (key === shopList.length) {
        $('.selectAll').addClass('active')
      }
    })
   setSession('shopList', JSON.stringify(shopList))
  })

  // 全选
  $('.selectAll').click(function () {
    
      if ($(this).hasClass('active')) {
        shopList.forEach((item, index) => {
        item['active'] = ''
        $(this).removeClass('active')
        $('.goods-item').eq(index).removeClass('active')
        $('.money i').html(0)
        $('.buy span').html(0)
      })
      } else {
        shopList.forEach((item, index) => {
        item['active'] = 'active'
        $(this).addClass('active')
        $('.goods-item').eq(index).addClass('active')
        setMoney(parseInt(item['price']), '+')
        setCount(parseInt(item['count']), '+')
      })
      }
     setSession('shopList', JSON.stringify(shopList))
    

  })
  addGoodsList(shopList)
  // 动态加载dom 计算金额 计算个数方法
  function addGoodsList(shopList) {
    // 获取商品列表

    let str = ''
    if (shopList.length > 0) {
      //  清空上次一次加载的 
      $('.goodsList').html('')
      // 计算总额
      let sum = 0
      // 计算结算个数
      let buyCount = 0
      // 动态增加DOM
      shopList.forEach((item, index) => {
        str += `   
       <section data-id="${item.id}" class="goods-item clearfix ${item.active}">
        <div class="choose" >
          <span>√</span>
        </div>
        <div class="goods">
          <div class="img">
            <img src="${item.imgSrc}" alt="">
          </div>
          <div class="goodsinfo">
            <h2 class="goods-name">
              ${item['name']}
            </h2>

            <div class="price">￥ <span>${item['price']}</span></div>
            <div class="options">
              <div class="left">
                <button class="subtract">
                  -
                </button>
                <span class="count">
                  ${item['count']}
                </span>
                <button class="add">+</button>
              </div>
              <div class="right">
                <svg t="1606912400267" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="7295" width="200" height="200">
                  <path
                    d="M874.666667 271.17037h-725.333334c-11.757037 0-21.333333-9.576296-21.333333-21.333333s9.576296-21.333333 21.333333-21.333333h725.333334c11.757037 0 21.333333 9.576296 21.333333 21.333333S886.423704 271.17037 874.666667 271.17037z"
                    p-id="7296"></path>
                  <path
                    d="M640.948148 271.17037H383.051852c-24.272593 0-44.088889-19.816296-44.088889-44.088889v-54.992592c0-24.272593 19.816296-44.088889 44.088889-44.088889h257.896296c24.272593 0 44.088889 19.816296 44.088889 44.088889v54.992592c0 24.272593-19.816296 44.088889-44.088889 44.088889zM383.051852 170.666667c-0.758519 0-1.422222 0.663704-1.422222 1.422222v54.992592c0 0.758519 0.663704 1.422222 1.422222 1.422223h257.896296c0.758519 0 1.422222-0.663704 1.422222-1.422223v-54.992592c0-0.758519-0.663704-1.422222-1.422222-1.422222H383.051852z"
                    p-id="7297"></path>
                  <path
                    d="M721.635556 896.474074H302.364444c-34.702222 0-63.051852-27.211852-64.379259-61.914074l-23.134815-583.86963c-0.18963-5.878519 1.991111-11.662222 6.068149-15.928889 4.077037-4.266667 9.765926-6.637037 15.739259-6.637037h550.779259c5.878519 0 11.567407 2.37037 15.739259 6.637037 4.077037 4.266667 6.257778 10.05037 6.068148 15.928889L786.014815 834.56c-1.327407 34.702222-29.677037 61.914074-64.379259 61.914074z m-462.411852-624.82963l22.281481 561.208889c0.474074 11.282963 9.576296 20.100741 20.859259 20.100741h419.271112c11.282963 0 20.48-8.817778 20.859259-20.100741l22.281481-561.208889H259.223704z"
                    p-id="7298"></path>
                  <path
                    d="M417.185185 777.007407c-12.8 0-23.22963-10.42963-23.229629-23.229629V370.725926c0-12.8 10.42963-23.22963 23.229629-23.22963s23.22963 10.42963 23.22963 23.22963v383.051852c0 12.8-10.42963 23.22963-23.22963 23.229629zM606.814815 777.007407c-12.8 0-23.22963-10.42963-23.22963-23.229629V370.725926c0-12.8 10.42963-23.22963 23.22963-23.22963s23.22963 10.42963 23.229629 23.22963v383.051852c0 12.8-10.42963 23.22963-23.229629 23.229629z"
                    p-id="7299"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>`
       
        if (item.active === 'active') {
           // 计算总额
          sum += parseInt(item.count) * parseInt(item.price)
           // 计算结算个数
        buyCount += item.count;
        }
       

        if (!item['active']) {
          $('.selectAll').removeClass('active')
        }

      });
      $('.goodsList').append(str)
      // 获取商品总金额
      $('.money i').html(sum)
      // 获取商品结算总个数
      $('.buy span').html(buyCount)

    } else {
      $('.money i').html(0)
      $('.buy span').html(0)
    }

  }


  $('.avatar2').click(function () {
    window.history.back()
  })



$('.buy').click(function() {
  
  if (shopList.length < 1) {
    $('.hint').html('请先选择商品').removeClass('hide')
    setTimeout(() => {$('.hint').addClass('hide')}, 1000)
  } else {
    if (!window.sessionStorage.getItem('userLogin')) {
      $('.hint').html('请先登陆').removeClass('hide')
      setTimeout(() => {$('.hint').addClass('hide')}, 1000)
  }
  }
})


}
