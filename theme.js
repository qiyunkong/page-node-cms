const fs = require("fs");
const templaet = require('art-template');
const path = require('path');
const templaetPath = path.join(__dirname ,'theme','listcolumn.html');
let dbX = fs.readFileSync("./db/dbX.json");
dbX = JSON.parse(dbX)
// 模板渲染
let codeHTML = templaet(templaetPath,{
  dbX
})

// 生成html
fs.writeFileSync('./build/listcolumn.html',codeHTML);
console.log('listcolumn.html生成完成');