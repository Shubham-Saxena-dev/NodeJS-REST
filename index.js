var express = require('express');
const bodyParser = require('body-parser');

var app = express();

var port = process.env.port || 8030;
app.use(bodyParser.json())

var get = require('./requests/get.js');
var post = require('./requests/post.js')
var put = require('./requests/put.js')
var del = require('./requests/delete.js')

app.use('/', get);
app.use('/add',post)
app.use('/',put)
app.use('/',del)

app.listen(port, function () {
    console.log('Server started at 8030');
})