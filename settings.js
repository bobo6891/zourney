const packageJSON = require('./package.json');

const DEV_MODE = !process.env.NODE_ENV && (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'staging');
const SERVER_PORT = process.env.SERVER_PORT || 4040;
const BUILD_VERSION = process.env.BUILD_VERSION || 'local';

const DATA_DIR = !DEV_MODE ? `${__dirname}/dist/client/data` : `${__dirname}/src/ui/data`;

const settings = {
  DEV_MODE,
  SERVER_PORT,
  APP_NAME: packageJSON.name,
  APP_VERSION: BUILD_VERSION,
  APP_DESCRIPTION: packageJSON.description,
  APP_AUTHOR: packageJSON.author,
  CLIENTJS: `${packageJSON.name}-${BUILD_VERSION}`,
  DATA_DIR,
  MORGAN_FORMAT: ':date[iso] :status :method :url {Authorization: :auth...} - :response-time ms'
};

module.exports = settings;
