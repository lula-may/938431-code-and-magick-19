'use strict';
(function () {
  var Code = {
    STATUS_OK: 200,
    REQUEST_ERROR: 400,
    NO_AUTHORIZED_ERROR: 401,
    NOT_FOUND_ERROR: 404
  };

  var Url = {
    DOWNLOAD: 'https://js.dump.academy/code-and-magick/data',
    UPLOAD: 'https://js.dump.academy/code-and-magick'
  };

  var TIMEOUT_IN_MS = 10000;

  var parseResponse = function (request, onSuccess, onError) {
    switch (request.status) {
      case Code.STATUS_OK:
        onSuccess(request.response);
        break;
      case Code.REQUEST_ERROR:
        onError('Ошибка загрузки данных. Неверный запрос к серверу.');
        break;
      case Code.NO_AUTHORIZED_ERROR:
        onError('Пользователь не авторизован. Требуется авторизация.');
        break;
      case Code.NOT_FOUND_ERROR:
        onError('Ошибка загрузки данных. Сервер не найден.');
        break;
      default:
        onError('Ошибка загрузки данных с сервера. Статус ответа: ' + request.status + ' ' + request.statusText);
    }
  };

  var hangUpEventListeners = function (request, onSuccess, onError) {
    request.addEventListener('load', function () {
      parseResponse(request, onSuccess, onError);
    });
    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интернету.');
    });
    request.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + request.timeout + 'мс.');
    });
  };

  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    hangUpEventListeners(xhr, onLoad, onError);
    xhr.open('GET', Url.DOWNLOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    hangUpEventListeners(xhr, onSuccess, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: download,
    save: upload
  };
})();
