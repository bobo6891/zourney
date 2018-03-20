const gulp = require('gulp');
const webpack = require('webpack');
const path = require('path');
const nodemon = require('nodemon');
const WebpackDevServer = require('webpack-dev-server');
const frontendConfig = require('./webpack.frontend.js');
const backendConfig = require('./webpack.backend.js');
const { IS_PRODUCTION, DEV_MODE, SERVER_PORT } = require('./settings.js');

if (DEV_MODE) {
  frontendConfig.devtool = 'source-map';
  backendConfig.devtool = 'source-map';
}

// tasks
const onBuild = done => {
  return (err, stats) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }

    if (done) {
      done();
    }
  };
};

gulp.task('build-frontend', done => {
  webpack(frontendConfig).run(onBuild(done));
});

gulp.task('build-backend', done => {
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('watch-backend', done => {
  let firedDone = false;
  webpack(backendConfig).watch(250, (err, stats) => {
    if (!firedDone) {
      firedDone = true;
      done();
    }
    nodemon.restart();
  });
});

gulp.task('build', ['build-frontend', 'build-backend']);
gulp.task('watch', ['watch-backend']);

gulp.task('run', ['watch-backend'], () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'dist/server/index'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', () => {
    console.log('Patched!');
  });
});
