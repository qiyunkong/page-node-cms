const fs = require('fs');
const mammoth = require('mammoth');
const templaet = require('art-template');
const path = require('path');
const templaetPath = path.join(__dirname ,'theme','displayinfo.html');
const dbX = [];

// 创建文章页面 核心API
let createArticle = async (dir,categoryName,category) =>{
  const htmls = [];
  const links = [];
  const db = []
  // 遍历docx文件中value
  for(let i = 0; i < dir.length; i++){
    let color =  'color:#'+ Math.random().toString(16).substr(-6);
    console.log(`%c docx/${dir[i]}`,'color:#0f0;');
    // 读取docx下所有的文件
    const {value} = await mammoth.convertToHtml({
      path:`./docx/${category}/${dir[i]}`
    })
    // 正则表达式
    const reg = /<h1>(?<title>.*)<\/h1>(?<content>.*)/;
    const result = reg.exec(value);
    // 存入文章对象
    htmls.push({
      ...result.groups,
    });
  }
  console.log(`%c ${categoryName}分类world文件读取完成`,'color:#0f0;');

  
  for(let i = 0; i < htmls.length; i++){
    // 保存链接
    links.push(
      {
        title:htmls[i].title,
        link:`/page/${category}/${i+1}.html`,
      }
    );
    // 数据JSON
    db.push(
      {
        title:htmls[i].title,
        link:`/page/${category}/${i+1}.html`,
        content:htmls[i].content,
      }
    )
  }
  let data = {
    categoryName,
    linkList:links
  }
  fs.writeFileSync(`./build/db/${category}.json`,JSON.stringify(data));
  const endIndex = Math.floor(Math.random() * (8 - 5)) + 5;
  dbX.push({
    category,
    categoryName,
    htmls:db,
    news:db.slice(0,endIndex)
  });
  console.log(`%c ${categoryName}分类JSON文件生成完成`,'color:#0f0;')
}

// 目录数组
const readdirArr = [
  {
    categoryName:'公司动态',
    category:'category01',
  },
  {
    categoryName:'新闻资讯',
    category:'category02',
  },
  {
    categoryName:'物联网百科',
    category:'category03',
  }
]

// 读取docx目录 readdirSync(同步的) 
let buildJson = async(arr,path) =>{

  // 遍历目录
  for(let i = 0; i<arr.length; i++){
    const {categoryName,category} = arr[i];
    let fileDirectory = fs.readdirSync(`./docx/${category}/`);
    await createArticle(fileDirectory,categoryName,category)
  }

  // 生成页面
  for(let i = 0; i<dbX.length; i++){
    const {categoryName,htmls,category} = dbX[i];
    // 遍历htmls数组
    for(let i = 0; i < htmls.length; i++){
      // 模板渲染
      let codeHTML = templaet(path,{
        article:htmls[i],
        dbX
      })

      // 生成html
      fs.writeFileSync(`./build/page/${category}/${i+1}.html`,codeHTML);
    }
    console.log(`%c ${categoryName}分类HTML文件生成完成`,'color:#0f0;')
  }

  // 生成JSON
  fs.writeFileSync(`./db/dbX.json`,JSON.stringify(dbX));

}
buildJson(readdirArr,templaetPath)




