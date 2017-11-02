const { Client } = require('tplink-smarthome-api');
const express = require('express');
const config = require('./config.json');

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

const plugs = [];

app.get('/', function (req, res) {
  res.render('index', { plugs, hueAddress: config.hueAddress, hueUsername: config.hueUsername });
})

app.put('/plug/:index/on', (req, res) => {
  const index = parseInt(req.params.index);
  if (plugs && plugs.length && plugs[index]) {
    plugs[index].setPowerState(true);
  }
  res.end()
});

app.put('/plug/:index/off', (req, res) => {
  const index = parseInt(req.params.index);
  if (plugs && plugs.length && plugs[index]) {
    plugs[index].setPowerState(false);
  }
  res.end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

const client = new Client();

client.startDiscovery({discoveryTimeout: 11000, discoveryInterval: 5000}).on('device-new', (device) => plugs.push(device));
