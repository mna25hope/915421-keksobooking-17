"use strict";

(function() {
  var DEC_RADIX = 10;

  var PIN_WIDTH = 40;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;

  window.data = {
    DEC_RADIX: DEC_RADIX,
    PIN_WIDTH: PIN_WIDTH,
    PIN_MIN_Y: PIN_MIN_Y,
    PIN_MAX_Y: PIN_MAX_Y,
    // функция случайных чисел
    getRandomNumber: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
//test
