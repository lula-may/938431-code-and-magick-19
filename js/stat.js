'use strict';

var CLOUD_COLOR = '#fff';
var SHADE_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_GAP = 15;
var CLOUD_CURVE_GAP = 15;
var SHADE_GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX = 150;
var TEXT__HEIGHT = 20;
var TEXT_COLOR = '#000';
var FONT = '16px PT Mono';
var GRAPH_GAP = 90;
var CURRENT_PLAYER_NAME = 'Вы';
var CURRENT_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var curveWidth = CLOUD_WIDTH / 3;
var curveStepX = curveWidth / 3;
var curveHeight = CLOUD_HEIGHT / 13.5;
var curveStepY = curveHeight / 3;
var textGap = TEXT__HEIGHT / 2;

var createCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y + CLOUD_CURVE_GAP);
  var startX = x;
  var startY = y + CLOUD_CURVE_GAP;
  for (var i = 0; i < 3; i++) {
    ctx.bezierCurveTo(startX + curveStepX, startY - curveHeight, startX + curveStepX * 2, startY - curveStepY, startX + curveWidth, startY + curveStepY);
    startX += curveWidth;
    startY += curveStepY;
  }
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var showMessages = function (ctx, message) {
  var messageStrings = message.split('/n');
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT;
  for (var i = 0; i < messageStrings.length; i++) {
    ctx.fillText(messageStrings[i], CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP + TEXT__HEIGHT * (i + 1));
  }
};

var getRandomColor = function () {
  var randomNumber = Math.round(Math.random() * 100);
  var color = 'hsl(240, ' + randomNumber + '%, 50%)';
  return color;
};

var calculateBarHeight = function (maxValue, value) {
  return BAR_MAX * value / maxValue;
};

var createBar = function (ctx, color, x, y, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

var renderBarGraph = function (ctx, names, times) {
  // Сравнение длин массивов и выбор кратчайшего
  var arrayLength = names.length;
  if (arrayLength > times.length) {
    arrayLength = times.length;
  }
  // Нахождение максимального времени прохождения игры
  var maxTime = Math.max.apply(Math, times);

  // Построение гистограммы
  var playerTime;
  var barHeight = 0;
  var barX = CLOUD_X + BAR_GAP;
  var barY = CLOUD_Y + GRAPH_GAP;
  var barColor;

  for (var i = 0; i < arrayLength; i++) {
    // Вывод имени игрока
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], barX, CLOUD_Y + GRAPH_GAP + BAR_MAX + TEXT__HEIGHT);

    // Определение цвета столбца
    if (names[i] === CURRENT_PLAYER_NAME) {
      barColor = CURRENT_PLAYER_COLOR;
    } else {
      barColor = getRandomColor();
    }

    // Расчет высоты и положения столбца
    barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    barHeight = calculateBarHeight(maxTime, times[i]);
    barY = CLOUD_Y + GRAPH_GAP + BAR_MAX - barHeight;

    // Отрисовка столбца
    createBar(ctx, barColor, barX, barY, barHeight);

    // Вывод времени  игрока
    playerTime = Math.round(times[i]) + '';
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(playerTime, barX, barY - textGap);

    // Подготовка к следующей итерации
    barX += (BAR_WIDTH + BAR_GAP);
  }
};

window.renderStatistics = function (ctx, names, times) {
  // Отрисовка облака с тенью
  createCloud(ctx, CLOUD_X + SHADE_GAP, CLOUD_Y + SHADE_GAP, SHADE_COLOR);
  createCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  // Вывод сообщения о победе
  showMessages(ctx, 'Ура вы победили!/nСписок результатов:');

  // Построение гистограммы
  renderBarGraph(ctx, names, times);
};
