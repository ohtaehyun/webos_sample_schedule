"use strict";

var clock = document.querySelector(".clock-container .clock");

function getDate() {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  clock.innerText = ""
    .concat(hour < 10 ? "0".concat(hour) : "".concat(hour), ":")
    .concat(minute < 10 ? "0".concat(minute) : "".concat(minute), ":")
    .concat(second < 10 ? "0".concat(second) : "".concat(second));
}

function init() {
  getDate();
  setInterval(getDate, 1000);
}

init();
