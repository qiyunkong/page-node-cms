// tab 切换
$(function(){
  $('.brick').click(function(){
    $('.tab .item').eq($(this).index()).show().siblings().hide();
  })
})