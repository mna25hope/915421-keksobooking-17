'use strict';

(function () {
  var mapFilterElement = document.querySelector('.map__filters');
  var housingTypeFilterElement = mapFilterElement.querySelector('select[name=housing-type]');
  var housingPriceFilterElement = mapFilterElement.querySelector('select[name=housing-price]');
  var housingRoomsFilterElement = mapFilterElement.querySelector('select[name=housing-rooms]');
  var housingGuestsFilterElement = mapFilterElement.querySelector('select[name=housing-guests]');
  var housingFeaturesElement = mapFilterElement.querySelector('fieldset[id=housing-features]');
  var housingFeatureElements = housingFeaturesElement.querySelectorAll('input');

  var filters = {
    housingType: 'any',
    housingPrice: 'any',
    housingRooms: 'any',
    housingGuests: 'any',
    housingFeatures: {
      wifi: false,
      dishwasher: false,
      parking: false,
      washer: false,
      elevator: false,
      conditioner: false
    }
  };

  window.filter = {
    get: function () {
      return filters;
    }
  };

  var housingTypeChangeHandler = function (evt) {
    filters.housingType = evt.target.value;
    window.map.applyFilters(filters);
  };

  var housingPriceChangeHandler = function (evt) {
    filters.housingPrice = evt.target.value;
    window.map.applyFilters(filters);
  };

  var housingRoomsChangeHandler = function (evt) {
    var value = evt.target.value;

    if (value !== 'any') {
      filters.housingRooms = parseInt(evt.target.value, window.data.DEC_RADIX);
    } else {
      filters.housingRooms = value;
    }

    window.map.applyFilters(filters);
  };

  var housingGuestsChangeHandler = function (evt) {
    var value = evt.target.value;

    if (value !== 'any') {
      filters.housingGuests = parseInt(evt.target.value, window.data.DEC_RADIX);
    } else {
      filters.housingGuests = value;
    }

    window.map.applyFilters(filters);
  };

  var housingFeatureChangeHandler = function (evt) {
    filters.housingFeatures[evt.target.value] = evt.target.checked;
    window.map.applyFilters(filters);
  };

  housingTypeFilterElement.addEventListener('change', housingTypeChangeHandler);
  housingPriceFilterElement.addEventListener('change', housingPriceChangeHandler);
  housingRoomsFilterElement.addEventListener('change', housingRoomsChangeHandler);
  housingGuestsFilterElement.addEventListener('change', housingGuestsChangeHandler);
  housingFeatureElements.forEach(function (housingFeatureElement) {
    housingFeatureElement.addEventListener('change', housingFeatureChangeHandler);
  });
})();
//
