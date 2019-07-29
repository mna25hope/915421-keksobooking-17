'use strict';

(function () {
  var isMapActivated = false;

  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var mainPinElement = mapElement.querySelector('.map__pin--main');

  var initialMainPinCoords = {
    x: mainPinElement.style.left,
    y: mainPinElement.style.top
  };

  var _pins = [];

  window.map = {
    setEnabled: function (enabled) {
      if (enabled) {
        loadPins();
        mapElement.classList.remove('map--faded');
      } else {
        clearMapPins();
        resetMainPin();
        mapElement.classList.add('map--faded');
      }

      isMapActivated = enabled;
    },
    applyFilters: function (filters) {
      var filteredPins = _pins.slice();

      // Фильтр по типу жилья
      if (filters.housingType !== 'any') {
        filteredPins = filteredPins.filter(function (pin) {
          return pin.offer.type === filters.housingType;
        });
      }

      // Фильтр по цене жилья
      if (filters.housingPrice !== 'any') {
        filteredPins = filteredPins.filter(function (pin) {
          var price = pin.offer.price;

          switch (filters.housingPrice) {
            case 'middle':
              return price >= 10000 && price <= 50000;
            case 'low':
              return price < 10000;
            case 'high':
              return price > 50000;
            default:
              return false;
          }
        });
      }

      // Фильтр по количеству комнат
      if (filters.housingRooms !== 'any') {
        filteredPins = filteredPins.filter(function (pin) {
          return pin.offer.rooms === filters.housingRooms;
        });
      }

      // Фильтр по количеству гостей
      if (filters.housingGuests !== 'any') {
        filteredPins = filteredPins.filter(function (pin) {
          return pin.offer.guests === filters.housingGuests;
        });
      }

      // Фильтр по фичам
      Object.keys(filters.housingFeatures).forEach(function (key) {
        if (filters.housingFeatures[key]) {
          filteredPins = filteredPins.filter(function (pin) {
            return pin.offer.features.includes(key);
          });
        }
      });

      // Ограничиваем количество меток
      filteredPins = filteredPins.slice(0, 5);

      clearMapPins();
      addMapPins(filteredPins);
      addPinEventHandlers(filteredPins);
    }
  };

  var addPinEventHandlers = function (filteredPins) {
    var mapPinElements = mapPinsElement.querySelectorAll('.map__pin');

    var mapPinClickHandler = function (evt) {
      var index = evt.currentTarget.dataset.id;
      window.card.show(filteredPins[index]);
    };

    mapPinElements.forEach(function (mapPinElement) {
      if (mapPinElement !== mainPinElement) {
        mapPinElement.addEventListener('click', mapPinClickHandler);
      }
    });
  };

  var loadPins = function () {
    var onSuccess = function (pins) {
      _pins = pins;

      var filters = window.filter.get();
      window.map.applyFilters(filters);
    };

    var onError = function () {
      window.xhr.showErrorMessage('Не удалось загрузить объявления', loadPins);
    };

    window.pin.loadPins(onSuccess, onError);
  };

  // Удаляет метки с карты
  var clearMapPins = function () {
    var pinElements = mapPinsElement.querySelectorAll('.map__pin');
    pinElements.forEach(function (pinElement) {
      if (pinElement !== mainPinElement) {
        mapPinsElement.removeChild(pinElement);
      }
    });
  };

  var resetMainPin = function () {
    mainPinElement.style.left = initialMainPinCoords.x;
    mainPinElement.style.top = initialMainPinCoords.y;

    updateMainPinAddress();
  };

  // Генерирует и добавляет метки на карту
  var addMapPins = function (filteredPins) {
    var fragment = document.createDocumentFragment();

    filteredPins.forEach(function (pin, index) {
      var pinElement = window.pin.createMapPinNode(pin);
      pinElement.dataset.id = index;
      fragment.appendChild(pinElement);
    });

    mapPinsElement.appendChild(fragment);
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
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  mainPinElement.addEventListener('mousedown', mainPinMouseDownHandler);
})();
