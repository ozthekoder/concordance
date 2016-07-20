var mammoth = require("mammoth");
var fs = require('fs');
var pre = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="keywords">
    <meta name="description">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Concordance</title>

    <link rel='stylesheet' href='css/style.css'>
    <script src="/socket.io/socket.io.js"></script>

</head>
<body>`;

//var post = `</body></html>`
//mammoth.convertToHtml({path: './docs/Sakiname.docx' })
//.then(function(result){
  //var html = result.value;
  //var page = pre + html + post;
  //fs.writeFileSync('./html/index.html', page);
//})
//.done();


mammoth.extractRawText({path: './docs/Sakiname.docx' })
.then(function(result){
  var text = result.value;
  var dictionary = {};
  var lines = text
  .split('\n')
  .filter((line => !!line))
  .filter(line => /((([A-Z])([0-9])+)+(\/)*(([A-Z])*([0-9])+)*)/g.test(line))
  .map((line) => line.split(/((([A-Z])([0-9])+)+(\/)*(([A-Z])*([0-9])+)*)/g))
  .map((split) => {
    return {
      ref: split[1],
      text: split[split.length-1].split('/').map((passage) => passage.trim())
    };
  });
  
  lines.forEach((p) => {
    var words = p.text[0].split(' ').concat(p.text[1].split(' '));
    words.forEach((w) => {
      dictionary[w] = dictionary[w] || [];
      dictionary[w].push(p.ref);
    });
  });
  console.log(JSON.stringify(dictionary, null, 2));
})
.done();
