'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var userSetupElement = document.querySelector('.setup');
  var userSetupOpenButton = document.querySelector('.setup-open');
  var userSetupCloseButton = userSetupElement.querySelector('.setup-close');
  // Открытие диалогового окна
  var openPopup = function () {
    userSetupElement.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
    userSetupOpenButton.removeEventListener('click', userSetupOpenButtonClickHandler);
    userSetupOpenButton.removeEventListener('keydown', userSetupOpenButtonPressEnterHandler);
  };

  // Закрытие диалогового окна
  var closePopup = function () {
    userSetupElement.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
    userSetupOpenButton.addEventListener('click', userSetupOpenButtonClickHandler);
    userSetupOpenButton.addEventListener('keydown', userSetupOpenButtonPressEnterHandler);
  };

  // Обработчики
  var escPressHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  var userSetupOpenButtonClickHandler = function () {
    openPopup();
  };

  var userSetupOpenButtonPressEnterHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  };

  userSetupOpenButton.addEventListener('click', userSetupOpenButtonClickHandler);
  userSetupOpenButton.addEventListener('keydown', userSetupOpenButtonPressEnterHandler);
  userSetupCloseButton.addEventListener('click', function () {
    closePopup();
  });
  userSetupCloseButton.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });
})();
