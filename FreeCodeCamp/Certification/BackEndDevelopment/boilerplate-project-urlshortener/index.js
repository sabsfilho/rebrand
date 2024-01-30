require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const bodyParser = require('body-parser'),
  dns = require('dns'),
  url = require('url'),
  urlMap = new Map();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/shorturl', (req, res) =>{
  const orig = req.body.url,
    parsed = url.parse(orig);
  if(!parsed.hostname){
    return res.json({error: 'invalid url'});
  }
  dns.lookup(parsed.hostname, (err) => {
    if(err){
      return res.json({error: 'invalid url'});
    }
    const short = urlMap.size + 1; // int key
    urlMap.set(short, orig);
    res.json({
      original_url: orig, 
      short_url: short
    });
  });
});
app.get('/api/shorturl/:shortUrl', (req, res) =>{
  const short = parseInt(req.params.shortUrl);
  if(isNaN(short)){
    return res.json({error: 'invalid url'});
  }
  const orig = urlMap.get(short);
  if(!orig){
    return res.json({error: 'invalid url'});
  }
  res.redirect(orig);
});
