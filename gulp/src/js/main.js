// 初始化滚动条
$(function(){
  window.onload = function(){setTimeout(function(){
    $(window).scrollTop(0)},10);
    methods.forbidScroll();
  }
})


// 
var methods = {
  /** 禁用滚动*/
  forbidScroll: function () {
    document.querySelector("html").classList.add("lock");
    window.addEventListener("mousewheel", this.forbidScroll);
    window.addEventListener("touchmove", this.forbidScroll, { passive: false });
  },
  /** 启用滚动*/
  enabledScroll: function () {
    document.querySelector("html").classList.remove("lock");
    window.removeEventListener("mousewheel", this.forbidScroll);
    window.removeEventListener("touchmove", this.forbidScroll, { passive: false });
  }
}

var First_Scroll_State = false;

var scrollFunc = function(e){
  e = e || window.event;
  //IE/Opera/Chrome
  if(e.wheelDelta){
    console.log(1);
    if(parseInt(e.wheelDelta)>0){ //上滑
      if($('.equipment').offset().top - $(window).scrollTop() >= 0 && $('.equipment').offset().top - $(window).scrollTop() <= 133){
        methods.forbidScroll();
        $(".nav-list .nav-item a").eq(4).click()
      }
      if($('.introduce').offset().top - $(window).scrollTop() >= 0 && $('.introduce').offset().top - $(window).scrollTop() <= 133){
        methods.forbidScroll();
        $(".nav-list .nav-item a").eq(0).click()
        First_Scroll_State = false;
      }
    }else{ // 下滑
      console.log($('.swiper').offset().top - $(window).scrollTop() );
      console.log($('.equipment').offset().top - $(window).scrollTop() );
      if($('.swiper').offset().top - $(window).scrollTop() >= 0 && $('.swiper').offset().top - $(window).scrollTop() <= 130){
        First_Scroll_State || $(".nav-list .nav-item a").eq(4).click()
        First_Scroll_State = true;
      }
      if( $('.introduce').offset().top - $(window).scrollTop() >= 0 && $('.introduce').offset().top - $(window).scrollTop() <= 130){
        $(".nav-list .nav-item a").eq(3).click()
      }
      if($('.equipment').offset().top - $(window).scrollTop() >= 0 && $('.equipment').offset().top - $(window).scrollTop() <= 133){
        methods.enabledScroll();
      }
    }
    if( $('.applet').offset().top - $(window).scrollTop() >= 0 && $('.applet').offset().top - $(window).scrollTop() <= 150){
      $(".nav-list .nav-item ").eq(1).click()
    }
    if( $('.solution').offset().top - $(window).scrollTop() >= 0 && $('.solution').offset().top - $(window).scrollTop() <= 150){
      $(".nav-list .nav-item ").eq(2).click()
    }
    if( $('.news').offset().top - $(window).scrollTop() >= 0 && $('.news').offset().top - $(window).scrollTop() <= 150){
      $(".nav-list .nav-item ").eq(5).click()
    }

  }else if(e.detail){//Firefox
    if(parseInt(e.detail)>0){
        // ImageReduce();
    }else{
        // ImageExpand();
    }
  }
}


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
  $(".nav-list .nav-item").click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    if(index==1||index==2||index==5){
      methods.enabledScroll();
    }
  })
  $(".arrowhead").click(function(){
    $(".nav-list .nav-item a").eq(4).click()
  })
  var $position = $(window).scrollTop();

   // 封装防抖函数
  function debounce (fn,delay,e){
    let time;
    let debounced = function(){
      let That = this
      clearTimeout(time)
      time = setTimeout(function (){
        fn.apply(That,arguments);
      },delay)
    }
    return debounced
  }
  var time = 400;
  var off4 = true;
  //Firefox
  if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,time,false);
  }
  //IE及其他浏览器
  window.onmousewheel = document.onmousewheel=scrollFunc,time;
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


