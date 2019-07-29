'use strict';

(function () {
  var MinPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var formElement = document.querySelector('.ad-form');
  var avatarInputElement = formElement.querySelector('input[name=avatar]');
  var avatarPreviewElement = formElement.querySelector('.ad-form-header__preview > img');
  var addressInputElement = formElement.querySelector('input[name=address]');
  var typeSelectElement = formElement.querySelector('select[name=type]');
  var priceInputElement = formElement.querySelector('input[name=price]');
  var timeinSelectElement = formElement.querySelector('select[name=timein]');
  var timeoutSelectElement = formElement.querySelector('select[name=timeout]');
  var roomsSelectElement = formElement.querySelector('select[name=rooms]');
  var guestsSelectElement = formElement.querySelector('select[name=capacity]');

  var imagesInputElement = formElement.querySelector('input[name=images]');
  var photosContainerElement = formElement.querySelector('.ad-form__photo-container');

  window.form = {
    reset: function () {
      var inputElements = formElement.querySelectorAll('input');
      var selectElements = formElement.querySelectorAll('select');
      var featureElements = formElement.querySelectorAll('input[type=checkbox]');
      var descriptionElement = formElement.querySelector('textarea');

      inputElements.forEach(function (inputElement) {
        if (inputElement !== addressInputElement) {
          inputElement.value = '';
        }
      });

      selectElements.forEach(function (selectElement) {
        selectElement.selectedIndex = 0;
      });

      featureElements.forEach(function (featureElement) {
        featureElement.checked = false;
      });

      typeSelectElement.selectedIndex = 1;
      priceInputElement.placeholder = MinPrices.FLAT;
      descriptionElement.value = '';

      window.card.hide();
      window.map.setEnabled(false);
    },
    setEnabled: function (enabled) {
      if (enabled) {
        formElement.classList.remove('ad-form--disabled');
      } else {
        formElement.classList.add('ad-form--disabled');
      }
    },
    setSelectValue: function (name, value) {
      var select = formElement.querySelector('select[name=' + name + ']');
      var selectOptions = select.options;

      Object.keys(selectOptions).forEach(function (key) {
        if (selectOptions[key].value === value) {
          selectOptions[key].selected = true;
        }
      });
    },
    setInputValue: function (name, value) {
      var input = formElement.querySelector('input[name=' + name + ']');
      input.value = value;
    }
  };

  var validateRoomsAndGuests = function () {
    var rooms = parseInt(roomsSelectElement.value, window.data.DEC_RADIX);
    var guests = parseInt(guestsSelectElement.value, window.data.DEC_RADIX);

    if (rooms === 100) {
      if (guests !== 0) {
        roomsSelectElement.setCustomValidity('Помещение слишком большое для гостей');
        return false;
      }
    } else {
      if (guests === 0) {
        roomsSelectElement.setCustomValidity('Количество комнат не для гостей должно равняться 100');
        return false;
      }

      if (rooms < guests) {
        roomsSelectElement.setCustomValidity('Количество комнат должно быть больше или равно количествую гостей');
        return false;
      }
    }

    roomsSelectElement.setCustomValidity('');
    return true;
  };

  var avatarChangeHandler = function (evt) {
    var file = evt.target.files[0];

    if (file) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var typeSelectChangeHandler = function (evt) {
    var value = evt.target.value;
    var min = MinPrices[String(value).toUpperCase()];

    priceInputElement.min = min;
    priceInputElement.placeholder = min;
  };

  var timeinSelectChangeHangler = function (evt) {
    var value = evt.target.value;
    window.form.setSelectValue('timeout', value);
  };

  var timeoutSelectChangeHanler = function (evt) {
    var value = evt.target.value;
    window.form.setSelectValue('timein', value);
  };

  var roomsSelectChangeHandler = function () {
    validateRoomsAndGuests();
  };

  var guestsSelectChangeHandler = function () {
    validateRoomsAndGuests();
  };

  var imagesSelectHandler = function (evt) {
    var files = evt.target.files;

    if (files && files.length) {
      Object.keys(files).forEach(function (key) {
        var reader = new FileReader();

        reader.addEventListener('load', function (e) {
          var imageElement = document.createElement('img');
          imageElement.classList.add('ad-form__photo');
          imageElement.src = e.target.result;

          photosContainerElement.appendChild(imageElement);
        });

        reader.readAsDataURL(files[key]);
      });
    }
  };

  var sendForm = function () {
    var formData = new FormData(formElement);

    var onSuccess = function () {
      window.xhr.showSuccessMessage('Ваше объявление успешно размещено!');
      window.form.reset();
    };

    var onError = function () {
      window.xhr.showErrorMessage('Не удалось разместить объявление', sendForm);
    };

    window.xhr.post('https://js.dump.academy/keksobooking', formData, onSuccess, onError);
  };

  var formResetHandler = function (evt) {
    evt.preventDefault();
    window.form.reset();
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();

    if (validateRoomsAndGuests()) {
      sendForm();
    }
  };

  avatarInputElement.addEventListener('change', avatarChangeHandler);
  typeSelectElement.addEventListener('change', typeSelectChangeHandler);
  timeinSelectElement.addEventListener('change', timeinSelectChangeHangler);
  timeoutSelectElement.addEventListener('change', timeoutSelectChangeHanler);
  roomsSelectElement.addEventListener('change', roomsSelectChangeHandler);
  guestsSelectElement.addEventListener('change', guestsSelectChangeHandler);
  imagesInputElement.addEventListener('change', imagesSelectHandler);
  formElement.addEventListener('reset', formResetHandler);
  formElement.addEventListener('submit', formSubmitHandler);
})();
