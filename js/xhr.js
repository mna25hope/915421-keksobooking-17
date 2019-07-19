'use strict';

(function () {
  var HTTP_SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  window.xhr = {
    get: function (url, onSuccess, onError) {
      var xhr = createXHR(onSuccess, onError);
      xhr.open('GET', url);
      xhr.send();
    },
    post: function (url, data, onSuccess, onError) {
      var xhr = createXHR(onSuccess, onError);
      xhr.open('POST', url);
      xhr.send(data);
    },
    showErrorMessage: function (message, retryButtonClickHandler) {
      var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplateElement.cloneNode(true);
      var errorMessageElement = errorElement.querySelector('.error__message');
      var retryButtonElement = errorElement.querySelector('.error__button');
      var mainElement = document.querySelector('main');

      var closeErrorMessage = function () {
        mainElement.removeChild(errorElement);
        errorElement.removeEventListener('click', errorClickHandler);
        document.removeEventListener('keydown', errorKeyDownHandler);
      };

      var errorClickHandler = function () {
        closeErrorMessage();
      };

      var errorKeyDownHandler = function (evt) {
        if (evt.keyCode === window.data.ESCAPE_KEY_CODE) {
          closeErrorMessage();
        }
      };

      document.addEventListener('keydown', errorKeyDownHandler);
      errorElement.addEventListener('click', errorClickHandler);
      retryButtonElement.addEventListener('click', retryButtonClickHandler);

      errorMessageElement.textContent = message;
      mainElement.appendChild(errorElement);
    }
  };

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };
})();
