const { writeFile, mkdirSync } = require('fs');
const superagent = require('superagent');
const { DEV_MODE } = require('./settings.js');

const DATA_API = 'https://spreadsheet.glitch.me/?key=1pC-NWSifDABXtiis-KMmP5rAEaFXdeiF2Vf3pKIql9g';
const DATA_DIR = !DEV_MODE ? `${__dirname}/dist/client/data` : `${__dirname}/src/ui/data`;

const mkdirp = () => {
  try {
    mkdirSync(DATA_DIR);
  } catch (err) {
    if (err.errno === 34 || err.code === 'ENOENT') {
      mkdirp(DATA_DIR);
      mkdirSync(DATA_DIR);
    } else if (err.errno !== -17) {
      throw err;
    }
  }
};

const writeAndReturn = (data) => {
  mkdirp('data');
  writeFile(`${DATA_DIR}/data.json`, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const ajaxCall = () => {
  superagent
    .get(DATA_API)
    .set('Content-Type', 'application/json')
    .accept('json')
    .end((err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      writeAndReturn(res.body);
    });
};

ajaxCall();
