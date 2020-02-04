'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var userSetupElement = document.querySelector('.setup');
var userSetupOpenButton = document.querySelector('.setup-open');
var userSetupCloseButton = userSetupElement.querySelector('.setup-close');
var color = {
  coats: COAT_COLORS,
  eyes: EYES_COLORS,
  fireballs: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

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

// Обработчик для нажатия Esc
var escPressHandler = function (evt) {
  if (evt.key === ESC_KEY && !evt.target.matches('input[type="text"]')) {
    closePopup();
  }
};

// Открытие диалогового окна
var openPopup = function () {
  userSetupElement.classList.remove('hidden');
  document.addEventListener('keydown', escPressHandler);
};

// Закрытие диалогового окна
var closePopup = function () {
  userSetupElement.classList.add('hidden');
  document.removeEventListener('keydown', escPressHandler);
};

// Добавляем обработчик клика на кнопку открытия диалогового окна
userSetupOpenButton.addEventListener('click', function () {
  openPopup();
});

// Добавляем обработчик нажатия Enter на кнопку открытия диалогового окна
userSetupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

// Добавляем обработчики для кнопки закрытия диалогового окна
userSetupCloseButton.addEventListener('click', function () {
  closePopup();
});

userSetupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

// Реакция на ошибку ввода имени волшебника
var userNameInput = userSetupElement.querySelector('.setup-user-name');

var userNameInputInvalidHandler = function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Заполните это поле!');
  } else {
    userNameInput.setCustomValidity('');
  }
};

userNameInput.addEventListener('invalid', userNameInputInvalidHandler);

var userSetupPlayer = userSetupElement.querySelector('.setup-player');
var wizardCoat = userSetupPlayer.querySelector('.wizard-coat');
var wizardCoatInput = userSetupPlayer.querySelector('input[name="coat-color"]');
var wizardEyes = userSetupPlayer.querySelector('.wizard-eyes');
var wizardEyesInput = userSetupPlayer.querySelector('input[name="eyes-color"]');
var wizardFireball = userSetupElement.querySelector('.setup-fireball-wrap');
var wizardFireballInput = userSetupPlayer.querySelector('input[name="fireball-color"]');

// Изменение цвета на следующий из массива
var getNextColor = function (currentColor, colors) {
  var currentIndex = colors.indexOf(currentColor);
  var nextIndex = (currentIndex + 1) % colors.length;
  return colors[nextIndex];
};

var changeColor = function (element, elementInput, type) {
  var currentColor = element.style.fill;
  var nextColor = getNextColor(currentColor, color[type]);
  element.style.fill = nextColor;
  elementInput.value = nextColor;
};

var changeBackgroundColor = function (element, elementInput, type) {
  var currentColor = elementInput.value;
  var nextColor = getNextColor(currentColor, color[type]);
  element.style.background = nextColor;
  elementInput.value = nextColor;
};

// Обработчики клика

var wizardCoatClickHandler = function () {
  changeColor(wizardCoat, wizardCoatInput, 'coats');
};

var wizardEyesClickHandler = function () {
  changeColor(wizardEyes, wizardEyesInput, 'eyes');
};

var wizardFireballClickHandler = function () {
  changeBackgroundColor(wizardFireball, wizardFireballInput, 'fireballs');
};

// Вешаем обработчики на элементы
wizardCoat.addEventListener('click', wizardCoatClickHandler);
wizardEyes.addEventListener('click', wizardEyesClickHandler);
wizardFireball.addEventListener('click', wizardFireballClickHandler);
