const mammoth = require("mammoth");
const fs = require('fs');
mammoth.convertToHtml({path:"docx/“互联网+农业”的几种模式.docx"})
  .then(function(result){
    // The generated HTML 生成的HTML
    const html = result.value;
    // Any messages, such as warnings during conversion
    // 任何消息，例如转换期间的警告
    const messages = result.messages;
    // console.log(html)
    console.log(messages)
    const reg = /<h1>(.*)<\/h1>(.*)/;
    const _result = reg.exec(html);
    console.log(_result[1]);
    let fileName = '1.html';
    
    fs.writeFile(fileName,_result[2],error=>{
      if(error){
        console.log(error);
      }
    })
})