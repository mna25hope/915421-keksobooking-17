"use strict";

(function() {
  var isMapActivated = false;

  var mapElement = document.querySelector(".map");
  var mapPinsElement = document.querySelector(".map__pins");
  var mainPinElement = mapElement.querySelector(".map__pin--main");

  var filters = {
    housingType: "any"
  };

  var _pins = [];

  window.map = {
    setEnabled: function(enabled) {
      if (enabled) {
        loadPins();
        mapElement.classList.remove("map--faded");
      } else {
        mapElement.classList.add("map--faded");
      }

      isMapActivated = enabled;
    },
    getFilters: function() {
      return filters;
    },
    applyFilters: function(filters) {
      var filteredPins = _pins.slice();

      // Фильтр по типу жилья
      if (filters.housingType !== "any") {
        filteredPins = _pins.filter(function(pin) {
          return pin.offer.type === filters.housingType;
        });
      }

      // Ограничиваем количество меток
      filteredPins = filteredPins.slice(0, 5);

      clearMapPins();
      addMapPins(filteredPins);
    }
  };

  var loadPins = function() {
    var onSuccess = function(pins) {
      _pins = pins;
      window.map.applyFilters(filters);
    };

    var onError = function() {
      window.xhr.showErrorMessage("Не удалось загрузить объявления", loadPins);
    };

    window.pin.loadPins(onSuccess, onError);
  };

  // Удаляет метки с карты
  var clearMapPins = function() {
    var pinElements = mapPinsElement.querySelectorAll(".map__pin");
    pinElements.forEach(function(pinElement) {
      if (pinElement !== mainPinElement) {
        mapPinsElement.removeChild(pinElement);
      }
    });
  };

  // Генерирует и добавляет метки на карту
  var addMapPins = function(filteredPins) {
    var fragment = document.createDocumentFragment();

    filteredPins.forEach(function(pin) {
      var pinElement = window.pin.createMapPinNode(pin);
      fragment.appendChild(pinElement);
    });

    mapPinsElement.appendChild(fragment);
  };

  var updateMainPinAddress = function() {
    var x = parseInt(mainPinElement.style.left, window.data.DEC_RADIX);
    var y = parseInt(mainPinElement.style.top, window.data.DEC_RADIX);

    window.form.setInputValue("address", x + ", " + y);
  };

  var mainPinMouseDownHandler = function(mouseDownEvent) {
    mouseDownEvent.preventDefault();

    if (!isMapActivated) {
      window.map.setEnabled(true);
      window.form.setEnabled(true);
    }

    var coords = {
      x: mouseDownEvent.clientX,
      y: mouseDownEvent.clientY
    };

    var mainPinMouseMoveHandler = function(mouseMoveEvent) {
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

      mainPinElement.style.left = mainPinElement.offsetLeft - shift.x + "px";
      mainPinElement.style.top = mainPinElement.offsetTop - shift.y + "px";

      updateMainPinAddress();
    };

    var mainPinMouseUpHandler = function() {
      document.removeEventListener("mousemove", mainPinMouseMoveHandler);
      document.addEventListener("mouseup", mainPinMouseUpHandler);
    };

    document.addEventListener("mousemove", mainPinMouseMoveHandler);
    document.addEventListener("mouseup", mainPinMouseUpHandler);
  };

  mainPinElement.addEventListener("mousedown", mainPinMouseDownHandler);
})();
