'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEY = 'Escape';
  var COLOR = {
    COATS: COAT_COLORS,
    EYES: EYES_COLORS,
    FIREBALLS: FIREBALL_COLORS
  };

  var userSetupElement = document.querySelector('.setup');
  var userSetupForm = userSetupElement.querySelector('.setup-wizard-form');

  // Реакция на ошибку ввода имени волшебника
  var userNameInput = userSetupElement.querySelector('.setup-user-name');

  var userNameInputInvalidHandler = function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Заполните это поле!');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  userNameInput.addEventListener('invalid', userNameInputInvalidHandler);
  userNameInput.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      evt.stopPropagation();
    }
  });

  var userSetupPlayer = userSetupElement.querySelector('.setup-player');
  var wizardCoat = userSetupPlayer.querySelector('.wizard-coat');
  var wizardCoatInput = userSetupPlayer.querySelector('input[name="coat-color"]');
  var wizardEyes = userSetupPlayer.querySelector('.wizard-eyes');
  var wizardEyesInput = userSetupPlayer.querySelector('input[name="eyes-color"]');
  var wizardFireball = userSetupElement.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = userSetupPlayer.querySelector('input[name="fireball-color"]');

  // Изменение цвета на следующий из массива
  var coatColor = COLOR.COATS[0];
  var eyesColor = COLOR.EYES[0];
  var fireballColor = COLOR.FIREBALLS[0];

  var getNextElement = function (el, elements) {
    var nextIndex = (elements.indexOf(el) + 1) % elements.length;
    return elements[nextIndex];
  };

  var changeColor = function (element, elementInput, color) {
    element.style.fill = color;
    elementInput.value = color;
  };

  var changeBackgroundColor = function (element, elementInput, color) {
    element.style.background = color;
    elementInput.value = color;
  };

  // Обработчики клика для изменения цвета

  var wizardCoatClickHandler = function () {
    coatColor = getNextElement(coatColor, COAT_COLORS);
    changeColor(wizardCoat, wizardCoatInput, coatColor);
    window.setup.coatChangeHandler(coatColor);
  };

  var wizardEyesClickHandler = function () {
    eyesColor = getNextElement(eyesColor, EYES_COLORS);
    changeColor(wizardEyes, wizardEyesInput, eyesColor);
    window.setup.eyesChangeHandler(eyesColor);
  };

  var wizardFireballClickHandler = function () {
    fireballColor = getNextElement(fireballColor, FIREBALL_COLORS);
    changeBackgroundColor(wizardFireball, wizardFireballInput, fireballColor);
  };

  // Создание сообщения об ошибке
  var showErrorMessage = function (message) {
    var styles = [
      'position: absolute',
      'top: 150px',
      'left: 30%',
      'z-index: 10',
      'width: 30%',
      'padding: 30px',
      'font-size: 24px',
      'color: black',
      'text-align: center',
      'background-color: white',
      'border: 3px solid red'
    ];
    var node = document.createElement('div');
    node.style.cssText = styles.join('; ');
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Обработчик отправки формы
  var formSubmitHandler = function (evt) {
    var submitButton = userSetupForm.querySelector('.setup-submit');
    var onSuccess = function () {
      window.dialog.close();
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    };
    submitButton.textContent = 'Данные отправляются...';
    submitButton.disabled = true;
    evt.preventDefault();
    window.backend.save(new FormData(userSetupForm), onSuccess, showErrorMessage);
  };

  // Вешаем обработчики на элементы
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  wizardFireball.addEventListener('click', wizardFireballClickHandler);
  userSetupForm.addEventListener('submit', formSubmitHandler);

  // Получаем волшебников с сервера

  window.setup = {
    showError: showErrorMessage,
    coatChangeHandler: function () {},
    eyesChangeHandler: function () {}
  };
})();
