'use strict';
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
var curveWidth = CLOUD_WIDTH / 3;
var curveHeight = CLOUD_HEIGHT / 13.5;

var createCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y + CLOUD_CURVE_GAP);
  var startX = x;
  var startY = y + CLOUD_CURVE_GAP;
  for (var i = 0; i < 3; i++) {
    ctx.bezierCurveTo(startX + curveWidth / 3, startY - curveHeight, startX + curveWidth / 1.5, startY - curveHeight / 3, startX + curveWidth, startY + curveHeight / 3);
    startX += curveWidth;
    startY += curveHeight / 3;
  }
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var splitString = function (string) {
  var stringsArray = [];
  var firstIndex = 0;
  var lastIndex = 0;
  var i = 0;
  while (lastIndex < string.length) {
    lastIndex = string.indexOf('/n', firstIndex);
    if (lastIndex === -1) {
      lastIndex = string.length;
    }
    stringsArray[i] = string.substring(firstIndex, lastIndex);
    i++;
    firstIndex = lastIndex + 2;
  }
  return stringsArray;
};

var showMessages = function (ctx, message, x, y, lineHeight) {
  var messageStrings = splitString(message);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  for (var i = 0; i < messageStrings.length; i++) {
    ctx.fillText(messageStrings[i], x, y + lineHeight * (i + 1));
  }
};

var getColor = function (name) {
  var randomNumber;
  var color;
  if (name === 'Вы') {
    color = 'rgba(255, 0, 0, 1)';
  } else {
    randomNumber = Math.round(Math.random() * 100);
    color = 'hsl(240, ' + randomNumber + '%, 50%)';
  }
  return color;
};

var calculateBarHeight = function (maxHeight, maxValue, value) {
  return maxHeight * value / maxValue;
};

var createBar = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderBarGraph = function (ctx, graphX, graphY, graphHeight, barWidth, barGap, textGap, names, times) {
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
  var barX = graphX;
  var barY = graphY + graphHeight;

  for (var i = 0; i < arrayLength; i++) {
    // Вывод имени игрока
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], barX, graphY + graphHeight + textGap);

    // Определение цвета столбца
    var playerColor = getColor(names[i]);

    // Расчет высоты и положения столбца
    barHeight = calculateBarHeight(graphHeight, maxTime, times[i]);
    barY = graphY + graphHeight - barHeight;

    // Отрисовка столбца
    createBar(ctx, playerColor, barX, barY, barWidth, barHeight);

    // Вывод времени  игрока
    playerTime = Math.round(times[i]) + '';
    ctx.fillStyle = '#000';
    ctx.fillText(playerTime, barX, barY - textGap / 2);

    // Подготовка к следующей итерации
    barX += (barWidth + barGap);
  }
};

window.renderStatistics = function (ctx, names, times) {
  // Отрисовка облака с тенью
  createCloud(ctx, CLOUD_X + SHADE_GAP, CLOUD_Y + SHADE_GAP, 'rgba(0, 0, 0, 0.7)');
  createCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Вывод сообщения о победе
  showMessages(ctx, 'Ура вы победили!/nСписок результатов:', CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, TEXT__HEIGHT);

  // Построение гистограммы
  renderBarGraph(ctx, CLOUD_X + BAR_GAP, CLOUD_Y + TEXT__HEIGHT * 4.5, BAR_MAX, BAR_WIDTH, BAR_GAP, TEXT__HEIGHT, names, times);
};
