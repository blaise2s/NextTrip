'use strict';
// app-server.ts
exports.__esModule = true;
var Express = require('express');
var Path = require('path');
var app = Express();
app.use(Express.static(__dirname));
app.get('/*', function (_request, response) {
  response.sendFile(Path.join(__dirname, '/index.html'));
});
var port = process.env.PORT ? +process.env.PORT : 3000;
var host = process.env.HOST;
var callbackFn = function (port) {
  console.log('NextTrip \uD83D\uDE80 app started on port ' + port);
};
console.log('HOST: ' + (host ? host : 'env variable is not set'));
console.log('PORT: ' + (port ? port : 'env variable is not set'));
host
  ? app.listen(port, host, function () {
      return callbackFn(port);
    })
  : app.listen(port, function () {
      return callbackFn(port);
    });
