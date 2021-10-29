// tab 切换
$(function(){
  $('.brick').mouseover(function(){
    $('.tab .item').eq($(this).index()).show().siblings().hide();
  })
});

// nav 
$(function(){
  $('nav').singlePageNav();
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