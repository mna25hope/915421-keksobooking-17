"use strict";

(function() {
  var mapFilterElement = document.querySelector(".map__filters");
  var housingTypeFilterElement = mapFilterElement.querySelector("select[name=housing-type]");

  var housingTypeChangeHandler = function(evt) {
    var filters = window.map.getFilters();
    filters.housingType = evt.target.value;

    window.map.applyFilters(filters);
  };

  housingTypeFilterElement.addEventListener("change", housingTypeChangeHandler);
})();
