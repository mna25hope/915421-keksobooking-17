'use strict';

(function () {
  window.pin = {
    loadPins: function (onSucces, onError) {
      window.xhr.get('https://js.dump.academy/keksobooking/data', onSucces, onError);
    },
    // Создает и возвращает элемент метки на основе входных данных
    createMapPinNode: function (pin) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);
      var pinElementCover = pinElement.querySelector('img');

      pinElement.style.left = pin.location.x + 'px';
      pinElement.style.top = pin.location.y + 'px';
      pinElementCover.src = pin.author.avatar;
      pinElementCover.alt = pin.offer.title;

      return pinElement;
    }
  };
})();
