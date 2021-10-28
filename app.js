const fs = require('fs');
const mammoth = require('mammoth');
const templaet = require('art-template');
const path = require('path');

const templaetPath = path.join(__dirname ,'theme','displayinfo.html');
// 读取docx目录 readdirSync(同步的)
let fileDirectory = fs.readdirSync('./docx');
// 创建文章页面

let createArticle = async (dir,path) =>{
  const htmls = [];
  const links = [];
  const category = 'category02';

  // 遍历docx文件中value
  for(let i = 0; i < dir.length; i++){
    console.log("dir[i]==",dir[i])
    // 读取docx下所有的文件
    const {value} = await mammoth.convertToHtml({
      path:`docx/${dir[i]}`
    })
    // 正则表达式
    const reg = /<h1>(?<title>.*)<\/h1>(?<content>.*)/;
    const result = reg.exec(value);
    // 存入文章对象
    htmls.push({
      ...result.groups,
    });
  }
  console.log(htmls.length)


  // 遍历htmls数组
  for(let i = 0; i < htmls.length; i++){
    // 模板渲染
    let codeHTML = templaet(path,htmls[i])

    // 生成html
    fs.writeFileSync(`./build/page/${category}/${i+1}.html`,codeHTML);

    // 保存链接
    links.push(
      {
        title:htmls[i].title,
        link:`/page/${category}/${i+1}.html`,
      }
    );
  }

  
  // 生成JSON数据
  let data = {
    categoryName:'新闻咨询',
    linkList:links
  }
  fs.writeFileSync(`./build/db/${category}.json`,JSON.stringify(data));
  console.log("生成数据")
}


createArticle(fileDirectory,templaetPath)
