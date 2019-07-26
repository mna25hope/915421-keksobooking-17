"use strict";

(function() {
  var mapElement = document.querySelector(".map");
  var mapFiltersContainerElement = document.querySelector(
    ".map__filters-container"
  );

  var getHousingTypeName = function(housingType) {
    switch (housingType) {
      case "palace":
        return "Дворец";
      case "flat":
        return "Квартира";
      case "house":
        return "Дом";
      case "bungalo":
        return "Бунгало";
      default:
        return "";
    }
  };

  var getHousingRoomsAndGuests = function(rooms, guests) {
    return rooms + " комнат для " + guests + " гостей";
  };

  var getHousingTimeinTimeout = function(timein, timeout) {
    return "Заезд после " + timein + ", выезд до " + timeout;
  };

  window.card = {
    show: function(pin) {
      var cardTemplate = document
        .querySelector("#card")
        .content.querySelector(".map__card");
      var cardElement = cardTemplate.cloneNode(true);

      var cardAvatarElement = cardElement.querySelector(".popup__avatar");
      cardAvatarElement.src = pin.author.avatar;

      var cardTitleElement = cardElement.querySelector(".popup__title");
      cardTitleElement.textContent = pin.offer.title;

      var cardAddressElement = cardElement.querySelector(
        ".popup__text--address"
      );
      cardAddressElement.textContent = pin.offer.address;

      var cardPriceElement = cardElement.querySelector(".popup__text--price");
      cardPriceElement.textContent = pin.offer.price + "₽/ночь";

      var cardTypeElement = cardElement.querySelector(".popup__type");
      cardTypeElement.textContent = getHousingTypeName(pin.offer.type);

      var cardCapacityElement = cardElement.querySelector(
        ".popup__text--capacity"
      );
      cardCapacityElement.textContent = getHousingRoomsAndGuests(
        pin.offer.rooms,
        pin.offer.guests
      );

      var cardTimeElement = cardElement.querySelector(".popup__text--time");
      cardTimeElement.textContent = getHousingTimeinTimeout(
        pin.offer.checkin,
        pin.offer.checkout
      );

      var cardFeatureElements = cardElement.querySelectorAll(".popup__feature");
      cardFeatureElements.forEach(function(featureElement) {
        featureElement.style.display = "none";
      });

      pin.offer.features.forEach(function(feature) {
        var featureElement = cardElement.querySelector(
          ".popup__feature--" + feature
        );
        featureElement.style.display = "inline-block";
      });

      var cardDescriptionElement = cardElement.querySelector(
        ".popup__description"
      );
      cardDescriptionElement.textContent = pin.offer.description;

      var photosElement = cardElement.querySelector(".popup__photos");
      pin.offer.photos.forEach(function(photoUrl) {
        var photoElement = document.createElement("img");
        photoElement.classList.add("popup__photo");
        photoElement.alt = pin.offer.title;
        photoElement.src = photoUrl;

        photosElement.appendChild(photoElement);
      });
      mapElement.insertBefore(cardElement, mapFiltersContainerElement);
    }
  };
})();
