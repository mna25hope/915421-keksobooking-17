"use strict";

var OBJECT_COUNT = 8;
var TYPE = ["palace", "flat", "house", "bungalo"];

var PIN_WIDTH = 40;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;

var userMap = document.querySelector(".map");
userMap.classList.remove("map--faded");

var mapPinTemplate = document.querySelector("#pin").content.querySelector(".map__pin");

var getAvatarImages = function() {
  return [
    "img/avatars/user01.png",
    "img/avatars/user02.png",
    "img/avatars/user03.png",
    "img/avatars/user04.png",
    "img/avatars/user05.png",
    "img/avatars/user06.png",
    "img/avatars/user07.png",
    "img/avatars/user08.png"
  ];
};

var getHouseTypes = function() {
  return ["palace", "flat", "house", "bungalo"];
};

//функция случайных чисел
var getRandomNumber = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возвращает случайную координату X метки

var getRandomPinX = function() {
  var mapWidth = userMap.clientWidth;
  return getRandomNumber(PIN_WIDTH, mapWidth - PIN_WIDTH);
};

// Возвращает случайную координату Y метки
var getRandomPinY = function() {
  return getRandomNumber(PIN_MIN_Y, PIN_MAX_Y);
};

var getRandomPins = function(count) {
  var pins = [];
  var avatars = getAvatarImages();
  var houseTypes = getHouseTypes();

  for (var i = 0; i < count; i++) {
    pins.push({
      author: {
        avatar: avatars[i]
      },
      offer: {
        type: houseTypes[getRandomNumber(0, houseTypes.length - 1)]
      },
      location: {
        x: getRandomPinX(),
        y: getRandomPinY()
      }
    });
  }
  return pins;
};

// Создает и возвращает элемент метки на основе входных данных
var createMapPinNode = function(data) {
  var pinTemplate = document.querySelector("#pin").content.querySelector(".map__pin");
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementCover = pinElement.querySelector("img");

  pinElement.style.left = data.location.x + "px";
  pinElement.style.top = data.location.y + "px";
  pinElementCover.src = data.author.avatar;
  pinElementCover.alt = data.author.announcementTitle;

  return pinElement;
};

// Генерирует и добавляет метки на карту
var generateAndAppendMapPins = function() {
  var pins = getRandomPins(OBJECT_COUNT);
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector(".map__pins");

  for (var i = 0; i < pins.length; i++) {
    var pin = createMapPinNode(pins[i]);
    fragment.appendChild(pin);
  }

  mapPins.appendChild(fragment);
};

generateAndAppendMapPins();
