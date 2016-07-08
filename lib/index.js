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

var post = `</body></html>`
mammoth.convertToHtml({path: "./docs/K1234_deneme.docx"})
.then(function(result){
  var html = result.value;
  var messages = result.messages;
  var page = pre + html + post;
  fs.writeFileSync('./html/deneme.html', page);
})
.done();
