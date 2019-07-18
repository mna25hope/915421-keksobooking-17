'use strict';

(function () {
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var AVATAR_IMAGES = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  // Возвращает случайную координату X метки
  var getRandomPinX = function () {
    var mapElement = document.querySelector('.map');
    var mapWidth = mapElement.clientWidth;

    return window.data.getRandomNumber(
        window.data.PIN_WIDTH,
        mapWidth - window.data.PIN_WIDTH
    );
  };

  // Возвращает случайную координату Y метки
  var getRandomPinY = function () {
    return window.data.getRandomNumber(
        window.data.PIN_MIN_Y,
        window.data.PIN_MAX_Y
    );
  };

  window.pin = {
    // Возвращает массив случайных объявлений
    getRandomPins: function (count) {
      var pins = [];
      for (var i = 0; i < count; i++) {
        pins.push({
          author: {
            avatar: AVATAR_IMAGES[i]
          },
          offer: {
            type:
              HOUSE_TYPES[
                window.data.getRandomNumber(0, HOUSE_TYPES.length - 1)
              ]
          },
          location: {
            x: getRandomPinX(),
            y: getRandomPinY()
          }
        });
      }
      return pins;
    },

    // Создает и возвращает элемент метки на основе входных данных
    createMapPinNode: function (data) {
      var pinTemplate = document
        .querySelector('#pin')
        .content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);
      var pinElementCover = pinElement.querySelector('img');

      pinElement.style.left = data.location.x + 'px';
      pinElement.style.top = data.location.y + 'px';
      pinElementCover.src = data.author.avatar;
      pinElementCover.alt = data.author.announcementTitle;

      return pinElement;
    }
  };
})();
