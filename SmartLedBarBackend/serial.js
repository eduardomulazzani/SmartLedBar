const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline'); // recomendado
const { infoMessage, successMessage, errorMessage } = require('./utils/styles');

const validManufactorers = [
  "1a86"
]

class Serial {
  constructor({ baudRate, autoOpen }){
    this.serialOpen = false;
    this.baudRate = baudRate;
    this.autoOpen = autoOpen;

    this.connect();
  }

  async connect() {
    try{
      const prefix = "Serial.connect: ";

      infoMessage(prefix, "Initing find serial port...");

      const ports = await SerialPort.list();

      const port = ports.find(
        ({ manufacturer = "" }) => 
          validManufactorers.some(value => value === manufacturer)
      )

      if(port) {
        const { path = "" } = port;

        successMessage(prefix, `Port finded ${path}`);

        this.serial = new SerialPort({
          path,
          baudRate: this.baudRate,
          autoOpen: this.autoOpen
        });

        this.parser = this.serial.pipe(new ReadlineParser({ delimiter: '\n' }));

        this.events();
      } else {
        errorMessage(prefix, `Port not finded`);
      }
    }catch(err){
      console.error(err);
    }
  }

  events(){
    const prefix = "Serial.events: ";

    this.parser.on('data', (line) => {
      infoMessage(prefix, `Message received in Serial Port: ${line.trim()}`);
    });

    this.serial.on('error', (err) => {
      errorMessage(prefix, `Error in Serial Port: ${err.message}`);
    });

    this.serial.open((err) => {
      if(err) return errorMessage(prefix, `Error in Serial Port: ${err.message}`);
      
      this.serialOpen = true;

      successMessage(prefix, `Serial connect success`);
    });
  }

  sendMessage(mensagem){
    const prefix = "Serial.sendMessage: ";

    this.serial.write(mensagem, (err) => {
      if (err) return console.error('Erro ao enviar:', err.message);
      
      infoMessage(prefix, `Message received in Serial Port: ${mensagem.trim()}`);
    })
  }
}

module.exports = Serial;