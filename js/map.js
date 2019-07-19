'use strict';

(function () {
  var OBJECT_COUNT = 8;

  var isMapActivated = false;

  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');

  window.map = {
    setEnabled: function (enabled) {
      if (enabled) {
        generateAndAppendMapPins();
        mapElement.classList.remove('map--faded');
      } else {
        mapElement.classList.add('map--faded');
      }

      isMapActivated = enabled;
    }
  };

  // Генерирует и добавляет метки на карту
  var generateAndAppendMapPins = function () {
    var pins = window.pin.getRandomPins(OBJECT_COUNT);
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');

    pins.forEach(function (pin) {
      var pinElement = window.pin.createMapPinNode(pin);
      fragment.appendChild(pinElement);
    });

    mapPins.appendChild(fragment);
  };

  var updateMainPinAddress = function () {
    var x = parseInt(mainPinElement.style.left, window.data.DEC_RADIX);
    var y = parseInt(mainPinElement.style.top, window.data.DEC_RADIX);

    window.form.setInputValue('address', x + ', ' + y);
  };

  var mainPinMouseDownHandler = function (mouseDownEvent) {
    mouseDownEvent.preventDefault();

    if (!isMapActivated) {
      window.map.setEnabled(true);
      window.form.setEnabled(true);
    }

    var coords = {
      x: mouseDownEvent.clientX,
      y: mouseDownEvent.clientY
    };

    var mainPinMouseMoveHandler = function (mouseMoveEvent) {
      var shift = {
        x: coords.x - mouseMoveEvent.clientX,
        y: coords.y - mouseMoveEvent.clientY
      };

      var nextX = mainPinElement.offsetLeft - shift.x;
      var nextY = mainPinElement.offsetTop - shift.y;

      var mapWidth = mapElement.clientWidth;
      var pinMinX = window.data.PIN_WIDTH;
      var pinMaxX = mapWidth - window.data.PIN_WIDTH;

      if (
        nextX < pinMinX ||
        nextX > pinMaxX ||
        nextY < window.data.PIN_MIN_Y ||
        nextY > window.data.PIN_MAX_Y
      ) {
        return;
      }

      coords = {
        x: mouseMoveEvent.clientX,
        y: mouseMoveEvent.clientY
      };

      mainPinElement.style.left = mainPinElement.offsetLeft - shift.x + 'px';
      mainPinElement.style.top = mainPinElement.offsetTop - shift.y + 'px';

      updateMainPinAddress();
    };

    var mainPinMouseUpHandler = function () {
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.addEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  mainPinElement.addEventListener('mousedown', mainPinMouseDownHandler);
})();