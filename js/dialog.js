'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var userSetupElement = document.querySelector('.setup');
  var userSetupOpenButton = document.querySelector('.setup-open');
  var userSetupCloseButton = userSetupElement.querySelector('.setup-close');
  var userSetupKnob = userSetupElement.querySelector('.upload');

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
    userSetupElement.style.top = '';
    userSetupElement.style.left = '';
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

  var userSetupKnobDragHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var mousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      userSetupElement.style.top = (userSetupElement.offsetTop - shift.y) + 'px';
      userSetupElement.style.left = (userSetupElement.offsetLeft - shift.x) + 'px';
    };

    var mouseupHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mouseupHandler);
      if (dragged) {
        var preventDefaultClickHandler = function (clickEvt) {
          clickEvt.preventDefault();
          userSetupKnob.removeEventListener('click', preventDefaultClickHandler);
        };
        userSetupKnob.addEventListener('click', preventDefaultClickHandler);
      }
    };
    document.addEventListener('mousemove', mousemoveHandler);
    window.addEventListener('mouseup', mouseupHandler);
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

  userSetupKnob.addEventListener('mousedown', userSetupKnobDragHandler);
})();
