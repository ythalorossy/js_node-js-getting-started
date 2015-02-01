var express = require('express');
var cool = require('cool-ascii-faces');
var pg = require('pg');
var fs = require('fs');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/db', function(req, res){
    pg.connect(process.env.DATABASE_URL, function(err, client, done){
        client.query('SELECT * FROM test_table', function(err, result){
            done();
            if (err) {
                console.error(err);
                res.send("Error " + err);
            } else {
                
                res.send(JSON.stringify(result.rows, null, 4));
            }
        });
    });
});

function loadFile(fileName, callback){
  fs.readFile(__dirname + '/'+fileName+'.html', function(err, html){
      callback(err, html); 
  });
}

app.get('/', function(request, response) {
    loadFile('home', function(err, html){
        if (err) throw err;
        response.end(html);
    });
});

app.get('/artigos', function(request, response) {
    loadFile('artigos', function(err, html){
        response.end(html);
    });
});

app.get('/contato', function(request, response) {
    loadFile('contato', function(err, html){
        response.end(html);
    });
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/user', function(request, response) {
    response.send('Got a GET request at /user');
});

app.post('/', function(request, response){
    response.send('Got a POST request');
});

app.put('/user', function(request, response){
    response.send('Got a PUT request at /user request');
});

app.delete('/user', function(request, response){
    response.send('Got a DELETE request at /user request');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
