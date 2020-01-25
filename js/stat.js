'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_GAP = 15;
var SHADE_GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX = 150;
var TEXT__HEIGHT = 20;

var createCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x + CLOUD_WIDTH, y + 30);
  ctx.bezierCurveTo(x + CLOUD_WIDTH * 8 / 9, y + 10, x + CLOUD_WIDTH * 7 / 9, y + 15, x + CLOUD_WIDTH * 2 / 3, y + 20);
  ctx.bezierCurveTo(x + CLOUD_WIDTH * 5 / 9, y, x + CLOUD_WIDTH * 4 / 9, y, x + CLOUD_WIDTH / 3, y + 20);
  ctx.bezierCurveTo(x + CLOUD_WIDTH * 2 / 9, y + 10, x + CLOUD_WIDTH / 9, y + 10, x, y + 30);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxElement = function (arr) {
  if (arr !== null) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

var calculateBarHeight = function (maxHeight, maxValue, value) {
  return maxHeight * value / maxValue;
};

var renderStatistics = function (ctx, names, times) {
  // Отрисовка облака с тенью
  createCloud(ctx, CLOUD_X + SHADE_GAP, CLOUD_Y + SHADE_GAP, 'rgba(0, 0, 0, 0.7)');
  createCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Вывод сообщения о победе
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 4, CLOUD_Y + CLOUD_GAP + TEXT__HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 4, CLOUD_Y + CLOUD_GAP + TEXT__HEIGHT * 2);

  // Сравнение длин массивов и выбор кратчайшего
  var arrayLength = names.length;
  if (arrayLength > times.length) {
    arrayLength = times.length;
  }

  var maxTime = getMaxElement(times);
  var playerTime;
  var barHeight = 0;
  var randomNumber;
  var randomColor = '';
  for (var i = 0; i < arrayLength; i++) {

    // Вывод имени игрока
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP);

    // Построение столбца гистограммы для игрока
    barHeight = calculateBarHeight(BAR_MAX, maxTime, times[i]);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      randomNumber = Math.round(Math.random() * 100);
      randomColor = 'hsl(240, ' + randomNumber + '%, 50%)';
      ctx.fillStyle = randomColor;
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + TEXT__HEIGHT * 4.5 + BAR_MAX - barHeight, BAR_WIDTH, barHeight);

    // Вывод времени  игрока
    playerTime = Math.round(times[i]) + '';
    ctx.fillStyle = '#000';
    ctx.fillText(playerTime, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + TEXT__HEIGHT * 4 + BAR_MAX - barHeight);
  }
};
