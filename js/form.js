"use strict";

(function() {
  var MinPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var formElement = document.querySelector(".ad-form");
  var typeSelectElement = formElement.querySelector("select[name=type]");
  var priceInputElement = formElement.querySelector("input[name=price]");
  var timeinSelectElement = formElement.querySelector("select[name=timein]");
  var timeoutSelectElement = formElement.querySelector("select[name=timeout]");

  window.form = {
    setEnabled: function(enabled) {
      if (enabled) {
        formElement.classList.remove("ad-form--disabled");
      } else {
        formElement.classList.add("ad-form--disabled");
      }
    },
    setSelectValue: function(name, value) {
      var select = formElement.querySelector("select[name=" + name + "]");
      var selectOptions = select.options;

      Object.keys(selectOptions).forEach(function(key) {
        if (selectOptions[key].value === value) {
          selectOptions[key].selected = true;
        }
      });
    },
    setInputValue: function(name, value) {
      var input = formElement.querySelector("input[name=" + name + "]");
      input.value = value;
    }
  };

  var typeSelectChangeHandler = function(evt) {
    var value = evt.target.value;
    var min = MinPrices[value];

    priceInputElement.min = min;
    priceInputElement.placeholder = min;
  };

  var timeinSelectChangeHangler = function(evt) {
    var value = evt.target.value;
    window.form.setSelectValue(timeoutSelectElement, value);
  };

  var timeoutSelectChangeHanler = function(evt) {
    var value = evt.target.value;
    window.form.setSelectValue(timeinSelectElement, value);
  };

  typeSelectElement.addEventListener("change", typeSelectChangeHandler);
  timeinSelectElement.addEventListener("change", timeinSelectChangeHangler);
  timeoutSelectElement.addEventListener("change", timeoutSelectChangeHanler);
})();
