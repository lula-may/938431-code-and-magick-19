'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_QUANTITY = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


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

  window.wizards = {
    fragment: fragment
  };
})();
