// tab 切换
$(function(){
  $('.brick').mouseover(function(){
    $('.tab .item').eq($(this).index()).show().siblings().hide();
  })
});

// nav 
$(function(){
  $('nav').singlePageNav({offset:130});
});


// 
$(function(){ 
  $(".nav-list .nav-item a").click(function(){
    console.log($(this))
  })
  $(".arrowhead").click(function(){
    $(".nav-list .nav-item a").eq(4).click()
  })
  var $position = $(window).scrollTop();

   // 封装防抖函数
  function debounce (fn,delay){
    let time;
    let debounced = function(){
      let That = this
      clearTimeout(time)
      time = setTimeout(function (){
        fn.call(That);
      },delay)
    }
    return debounced
  }
  var time = 400;
  var off4 = true;
  $(window).scroll(function() {

    var $scroll = $(window).scrollTop();
    var $swiper = $(".swiper");
    var $introduce = $('.introduce');
    var $equipment = $('.equipment');
    if($scroll > $position) {
      if( $scroll>=200 && $scroll<=1000 ){
        setTimeout(function(){
          $(window).scrollTop(1000)
        },10)
      }

      // console.log('scrollDown');
      // console.log("$swiper.offset().top",$swiper.offset().top)
      // console.log("$introduce.offset().top",$introduce.offset().top)
      // console.log($introduce.offset().top - $scroll)
    } else {
      console.log('scrollUp');
      console.log($equipment.offset().top - $scroll)
    }
    $position = $scroll;
  });
});


// init
getJSON('/db/category01.json').then(function(json){
  const {linkList,categoryName} =  json;
  pageListDom(linkList,5)
  function pageListDom(data,indexEnd){
    const domArr = data.slice(0,indexEnd).map((item)=>{
      return `<li class="item">
      <h3><a href="${item.link}">${item.title}</a></h3>
      <time>2021/7/28</time>
    </li>`
    })
    $(".news .news-list").html(domArr)
  }
})