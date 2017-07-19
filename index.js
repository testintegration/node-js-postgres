var cool = require('cool-ascii-faces');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/times', function(request, response) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
});


const { Pool, Client } = require('pg');


app.get('/db', function (request, response) {

  const pool = new Pool({
    user: 'kkcqruwcwogqgt',
    host: 'ec2-23-21-96-159.compute-1.amazonaws.com',
    database: 'd61ulk3fo1decn',
    password: 'ecac9473c819af22779e9568e5e444a1847f31e9b2d50ace2a302f51a57867c8',
    port: 5432,
    ssl:true
  })

  pool.query('SELECT * FROM test_table', (err, res) => {

        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.render('pages/db', {results: res.rows} ); }


    pool.end();
  })


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
