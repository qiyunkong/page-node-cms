const mammoth = require("manmoth");
mammoth.converToHtml({path:"path/to/document.docx"}).then(function(result){
  const html = result.value;
  const messages = result.messages;
  console.log(html)
  console.log(messages)
})