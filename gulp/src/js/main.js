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