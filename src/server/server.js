import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware'; // eslint-disable-line import/no-extraneous-dependencies
import ejs from 'ejs';
import frontendConfig from '../../webpack.frontend';
import { APP_NAME, SERVER_PORT, MORGAN_FORMAT, CLIENTJS } from '../../settings';

const VIEW_DIR = `${__dirname}/../ui`;
const IMAGES_DIR = `/images`;
const compiler = webpack(frontendConfig);

module.exports = () => {
  const server = express();

  morgan.token('auth', req => (req.headers.authorization || '').substr(0, 10));
  server.use(
    cors({
      origin: '*'
    })
  );
  server.use(morgan(MORGAN_FORMAT));

  server.use(webpackDevMiddleware(compiler, {
    publicPath: frontendConfig.output.publicPath
  }));
  server.engine("html", ejs.renderFile);
  server.set("view engine", "html");
  server.set("views", VIEW_DIR);

  server.get('/health', (req, res) => res.sendStatus(200));

  server.get("/zourney/images/*", (req, res) => {
    const fileName = req.params[0];
    res.sendFile(`${IMAGES_DIR}/${fileName}`, { root: VIEW_DIR });
  });

  server.get("*", (req, res) => {
    res.render("index", { CLIENTJS, APP_NAME });
  });

  server.listen(
    SERVER_PORT,
    () => console.log(`${APP_NAME} running on port ${SERVER_PORT}`) // eslint-disable-line no-console
  );
};
