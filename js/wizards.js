'use strict';

(function () {
  var WIZARD_AMOUNT = 4;
  var similarElement = document.querySelector('.setup-similar');
  var similarList = similarElement.querySelector('.setup-similar-list');
  var wizardList = [];

  var getWizardsFragment = function (serverData) {
    // Адаптируем данные с сервера
    wizardList = serverData.map(function (el) {
      return {
        name: el.name,
        coatColor: el.colorCoat,
        eyesColor: el.colorEyes,
        fireballColor: el.colorFireball,
        artifacts: el.artifacts
      };
    });

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
      var nextRandomWizard = getRandomElement(wizardList);
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
