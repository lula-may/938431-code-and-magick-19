'use strict';
(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_QUANTITY = 4;
  var ESC_KEY = 'Escape';
  // var ENTER_KEY = 'Enter';
  var userSetupElement = document.querySelector('.setup');
  // var userSetupOpenButton = document.querySelector('.setup-open');
  // var userSetupCloseButton = userSetupElement.querySelector('.setup-close');

  var getRandomElement = function (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  var createWizardList = function () {
    var results = [];
    for (var i = 0; i < WIZARD_QUANTITY; i++) {
      var newElement = {};
      newElement.name = getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES);
      newElement.coatColor = getRandomElement(COAT_COLORS);
      newElement.eyesColor = getRandomElement(EYES_COLORS);
      results.push(newElement);
    }
    return results;
  };

  var similarListElement = userSetupElement.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var wizards = createWizardList();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  userSetupElement.querySelector('.setup-similar').classList.remove('hidden');

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
  var coatColorIndex = 0;
  var eyesColorIndex = 0;
  var fireballColorIndex = 0;

  var getNextIndex = function (index, elements) {
    return (index + 1) % elements.length;
  };

  var changeColor = function (element, elementInput, colorIndex, colors) {
    var newColor = colors[colorIndex];
    element.style.fill = newColor;
    elementInput.value = newColor;
  };

  var changeBackgroundColor = function (element, elementInput, colorIndex, colors) {
    var newColor = colors[colorIndex];
    element.style.background = newColor;
    elementInput.value = newColor;
  };

  // Обработчики клика для изменения цвета

  var wizardCoatClickHandler = function () {
    coatColorIndex = getNextIndex(coatColorIndex, COAT_COLORS);
    changeColor(wizardCoat, wizardCoatInput, coatColorIndex, COAT_COLORS);
  };

  var wizardEyesClickHandler = function () {
    eyesColorIndex = getNextIndex(eyesColorIndex, EYES_COLORS);
    changeColor(wizardEyes, wizardEyesInput, eyesColorIndex, EYES_COLORS);
  };

  var wizardFireballClickHandler = function () {
    fireballColorIndex = getNextIndex(fireballColorIndex, FIREBALL_COLORS);
    changeBackgroundColor(wizardFireball, wizardFireballInput, fireballColorIndex, FIREBALL_COLORS);
  };

  // Вешаем обработчики на элементы
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  wizardFireball.addEventListener('click', wizardFireballClickHandler);
})();
