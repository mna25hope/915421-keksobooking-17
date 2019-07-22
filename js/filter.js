"use strict";

(function() {
  var mapFilterElement = document.querySelector(".map__filters");
  var housingTypeFilterElement = mapFilterElement.querySelector("select[name=housing-type]");
  var housingPriceFilterElement = mapFilterElement.querySelector("select[name=housing-price]");
  var housingRoomsFilterElement = mapFilterElement.querySelector("select[name=housing-rooms]");
  var housingGuestsFilterElement = mapFilterElement.querySelector("select[name=housing-guests]");

  var housingTypeChangeHandler = function(evt) {
    var filters = window.map.getFilters();
    filters.housingType = evt.target.value;

    window.map.applyFilters(filters);
  };

  var housingPriceChangeHandler = function(evt) {
    var filters = window.map.getFilters();
    filters.housingPrice = evt.target.value;

    window.map.applyFilters(filters);
  };

  var housingRoomsChangeHandler = function(evt) {
    var filters = window.map.getFilters();
    var value = evt.target.value;

    if (value !== "any") {
      filters.housingRooms = parseInt(evt.target.value, window.data.DEC_RADIX);
    } else {
      filters.housingRooms = value;
    }

    window.map.applyFilters(filters);
  };

  var housingGuestsChangeHandler = function(evt) {
    var filters = window.map.getFilters();

    var value = evt.target.value;

    if (value !== "any") {
      filters.housingGuests = parseInt(evt.target.value, window.data.DEC_RADIX);
    } else {
      filters.housingGuests = value;
    }

    window.map.applyFilters(filters);
  };

  housingTypeFilterElement.addEventListener("change", housingTypeChangeHandler);
  housingPriceFilterElement.addEventListener("change", housingPriceChangeHandler);
  housingRoomsFilterElement.addEventListener("change", housingRoomsChangeHandler);
  housingGuestsFilterElement.addEventListener("change", housingGuestsChangeHandler);
})();
//
