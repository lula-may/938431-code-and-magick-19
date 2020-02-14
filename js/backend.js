'use strict';
(function () {
  var URL = 'https://js.dump.academy/code-and-magick/da';
  var STATUS_OK = 200;
  var TIMEOUT_IN_MS = 10000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    var loadHandler = function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.responseType = 'json';
    xhr.addEventListener('load', loadHandler);
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интрернету.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL);
    xhr.send();
  };

  // var upload = function (data, onSuccess, onError) {

  // };

  window.backend = {
    load: load
    // save: upload
  };
})();
