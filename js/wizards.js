'use strict';

(function () {
  var WIZARD_AMOUNT = 4;
  var similarElement = document.querySelector('.setup-similar');
  var similarList = similarElement.querySelector('.setup-similar-list');

  var convert = {
    name: 'name',
    colorCoat: 'coatColor',
    colorEyes: 'eyesColor',
    colorFireball: 'fireballColor',
    artifacts: 'artifacts'
  };

  var adaptServerData = function (data) {
    var newData = [];
    data.forEach(function (el) {
      var newElement = {};
      for (var property in el) {
        if ({}.hasOwnProperty.call(el, property)) {
          newElement[convert[property]] = el[property];
        }
      }
      newData.push(newElement);
    });
    return newData;
  };

  var getWizardsFragment = function (data) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

    var getRandomElement = function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    };

    var renderWizard = function (wizard) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
      return wizardElement;
    };

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_AMOUNT; i++) {
      var nextRandomWizard = getRandomElement(adaptServerData(data));
      fragment.appendChild(renderWizard(nextRandomWizard));
    }

    similarList.appendChild(fragment);
    similarElement.classList.remove('hidden');
  };

  var removeWizardsList = function () {
    similarList.innerHTML = '';
  };

  window.wizards = {
    get: getWizardsFragment,
    remove: removeWizardsList
  };
})();
