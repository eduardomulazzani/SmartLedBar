const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var ip = require('ip');

const path = require('path');
const { infoMessage } = require('./utils/styles');

class Api {
  constructor(connectionSerial){
    this.serial = connectionSerial;
    this.app = express();

    this.middlewares();

    this.events();
  }

  middlewares(){
    this.app.use(bodyParser.json());
    this.app.use(cors({
      origin: '*'
    }));
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  events(){
    const prefix = "Api.events: ";

    this.app.post('/led', (req, res) => {
      const { body = {} } = req;

      infoMessage(prefix, `Api Request /led: ${
        JSON.stringify(body)
      }`);

      if(this.serial.serialOpen){
        this.serial.sendMessage(JSON.stringify(body));
      }

      res.json(body);
    })

    this.app.listen(3000, () => {
      infoMessage(prefix, `Api Server on: ${ip.address()}:3000`);
    })
  }
}

module.exports = Api;