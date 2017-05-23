var express = require('express');

var app = express();
const PORT = process.env.PORT || 3000 //used for heroku

app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.listen(PORT, ()=> { console.log('Express server is up on port', PORT) });
