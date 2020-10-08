$(function () {
  init();
  $(".area, .text-wrapper").on("contextmenu", (e) => {
    showColorPicker(e.clientX, e.clientY);
    return false;
  });
  $("#search-box").keypress((e) => {
    if (e.which == 13) redirectToGoogle($("#search-box").val());
  });
});
/**
  Variables
**/
const pickr = Pickr.create({
  el: ".color-picker",
  theme: "nano",
  default: "rgba(255, 255, 255, 0.2)",
  defaultRepresentation: "RGBA",
  components: {
    preview: true,
    opacity: true,
    hue: true
  }
});

pickr.on("change", (color, instance) => {
  color = color.toRGBA().toString();
  setCirclesColor(color);
  lsSetItem("circlesColor", color);
});

/**
  Functions
**/
function init() {
  refreshTime();
  getGreetText();
  if (lsGetItem("circlesColor")) setCirclesColor(lsGetItem("circlesColor"));
}
function refreshTime() {
  $("#clock-text").html(getTime());
  var t = setTimeout(refreshTime, 1000);
}
function getGreetText() {
  var typed = new Typed("#greet-text", {
    strings: [greetingTextTo("pp")], //Ganti nama disini
    loop: false,
    typeSpeed: 50, //Atur kecepatan ketik
    showCursor: false,
    onComplete: function (self) {
      $(".context h1").css("color", "#fff");
      $(".area").css("background", "#000");
    }
  });
}
function greetingTextTo(i, delay = 100) {
  var today = new Date();
  var hrs = today.getHours();

  var greet;

  if (hrs < 12) greet = "Selamat Pagii, ^";
  else if (hrs >= 12 && hrs <= 15) greet = "Selamat Siang, ^";
  else if (hrs >= 15 && hrs <= 18) greet = "Selamat Sore, ^";
   else if (hrs >= 18 && hrs <= 21) greet = "Selamat Malam, ^";
  else greet = "Selamat Tidurr Sayang, Have A Nice Dream, ^";

  return greet + delay + i;
}
function getTime() {
  var today = new Date();
  var h = checkTime(today.getHours());
  var m = checkTime(today.getMinutes());
  var s = checkTime(today.getSeconds());

  return h + ":" + m + ":" + s;
}
function checkTime(i) {
  if (i < 10) i = "0" + i;
  return i;
}
function showColorPicker(x, y) {
  var pcr = $(".pcr-app");
  pcr.addClass("visible");
  pcr.css("left", x);
  pcr.css("top", y);
}
function lsGetItem(name) {
  return localStorage.getItem(name);
}
function lsSetItem(name, value) {
  localStorage.setItem(name, value);
  return true;
}
function setCirclesColor(color) {
  $(".circles li").css("background", color);
}
function redirectToGoogle(q) {
  q = q.split(" ").join("+");
  var url = "https://google.com/search?q=" + q;
  window.location.replace(url);
}
