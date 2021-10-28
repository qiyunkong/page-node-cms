function getRequest(){
  var url=window.location.search;
  var rep=/[?&][^?&]+=[^?&]+/g;//全局匹配所有"?"和“&”后面的键值对
  var arr=url.match(rep);//执行匹配操作，返回键值对数组
  //console.log(arr);
  var obj={};
  if(arr){
    arr.forEach(function(item){
      var tempArr = item.substring(1).split('=');
      var key = decodeURIComponent(tempArr[0]);
      var val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    })
  }
 return obj;
}
$(function(){
  const data = getRequest();
  let category
  try{
    category = JSON.stringify(data) == "{}"?'category01':data.category;
  }catch(error) {
    category = 'category01';
  }
  
  initAjaxData(category)
  
  // 修改分类状态
  $(".category .list .item").click(function(){
    $(".category .list .item").eq($(this).index()).addClass("active").siblings().removeClass("active");
    initAjaxData($(this).data('category'))
  })

 
});

function initAjaxData(category){
  // 请求列表数据
  getJSON(`/db/${category}.json`).then(function(json){
    const {linkList,categoryName} =  json;
    $(".archives h2.line").text(categoryName)
    pageListDom(linkList,0,15)
    $('.Pagination').pagination({
      totalData: linkList.length,
      showData: 15,
      coping: true,
      callback:function(api){
        pageListDom(linkList,api.getCurrent()-1,15)
      }
    });

    function pageListDom(data,index,count){
      let indexStart = index * count;
      let indexEnd = indexStart + count;
      const domArr = data.slice(indexStart,indexEnd).map((item)=>{
        return `<li class="item">
        <h3><a href="${item.link}">${item.title}</a></h3>
        <time>2021/7/28</time>
      </li>`
      })
      $(".archives .list").html(domArr)
    }
    
  })
}

