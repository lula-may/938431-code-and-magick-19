'use strict';
(function () {
  var Code = {
    STATUS_OK: 200,
    REQUEST_ERROR: 400,
    NO_AUTHORIZED_ERROR: 401,
    NOT_FOUND_ERROR: 404
  };
  var TIMEOUT_IN_MS = 10000;

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();

    var loadHandler = function () {
      switch (xhr.status) {
        case Code.STATUS_OK:
          onLoad(xhr.response);
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
          onError('Ошибка загрузки данных с сервера. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.responseType = 'json';
    xhr.addEventListener('load', loadHandler);
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интернету.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magic';

    var loadHandler = function () {
      switch (xhr.status) {
        case Code.STATUS_OK:
          onSuccess();
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
          onError('Ошибка загрузки данных. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL);
    xhr.addEventListener('load', loadHandler);
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интернету.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: upload
  };
})();
