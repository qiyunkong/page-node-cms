# Page-node-cms

全局变量
variable:
  navBar:[]



程序流程

  1.读取JSON 文件 并且把navBar存储到全局对象中
  2.读取目录(通过指定目录)
  3.对比tree目录
  4.虚tree和实tree进行合并
  4.生成db架构
  5.结合数据和模板渲染
  6.生成html数据
  7.转化成html文件
  8.运行build下的文件  
   
db架构
  common
    navBar.json   管理网站导航栏 字段 name:中文转拼音,link,icon,child                                     模板渲染数据
    footer.json   管理网站页脚信息                                                             模板渲染数据
    banner.json   管理网站                                                                    模板渲染数据  
    article.json  文章数据 url,wordTitle,wordContent,date,navBarArrURL                        模板渲染数据 
  list.json wordTitle url[ navBar.name/文件名称/.html ]
删除队列
更新队列
新增队列  

other 其他page


build 
  data
    *.json
  static
    css
    js
    img
  navbar.name
    index.html
    navbar.children.name
  navbar.name 
    index.html   
  index.html