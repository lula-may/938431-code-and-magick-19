'use strict';

(function () {
  var WIZARD_AMOUNT = 4;
  var similarElement = document.querySelector('.setup-similar');
  var similarList = similarElement.querySelector('.setup-similar-list');
  var wizardList = [];
  var coatColor;
  var eyesColor;

  var adapt = function (serverData) {
    wizardList = serverData.map(function (el) {
      return {
        name: el.name,
        coatColor: el.colorCoat,
        eyesColor: el.colorEyes,
        fireballColor: el.colorFireball,
        artifacts: el.artifacts
      };
    });
  };

  var getWizardRank = function (wizard) {
    var rank = 0;
    if (wizard.coatColor === coatColor) {
      rank += 2;
    }
    if (wizard.eyesColor === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var getWizardsFragment = function (data) {
    if (!wizardList.length) {
      adapt(data);
    }
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

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_AMOUNT; i++) {
      fragment.appendChild(renderWizard(wizardList[i]));
    }

    similarList.appendChild(fragment);
    similarElement.classList.remove('hidden');
  };

  var removeWizardsList = function () {
    similarList.innerHTML = '';
  };

  var updateWizards = function () {
    removeWizardsList();
    getWizardsFragment(wizardList.sort(function (first, second) {
      return getWizardRank(second) - getWizardRank(first);
    }));
  };

  window.setup.coatChangeHandler = function (color) {
    coatColor = color;
    updateWizards();
  };

  window.setup.eyesChangeHandler = function (color) {
    eyesColor = color;
    updateWizards();
  };

  window.backend.load(getWizardsFragment, window.setup.showError);

  window.wizards = {
    get: getWizardsFragment,
    remove: removeWizardsList
  };
})();
