/*================= 변수선언 ==================== */

var wrapper = document.querySelector(".wrapper"); //전체 페이지를 감싸는 틀
var page = document.querySelectorAll(".page"); //각 페이지 요소
var indicator = document.getElementById("indicator"); //인디케이터를 담는 틀
var indicator_li = indicator.querySelectorAll("li"); //인디케이터 목록

var yDeg = 0;
var indicator_num = 1;
var indicator_length = page.length;
var w = page[0].offsetWidth;
var page_angle = 0;

var hammer = new Hammer(wrapper); //터치 객체 생성

/*================= 페이지 초기화 ==================== */

function init_page() {
  w = page[0].offsetWidth;

  //3D페이지 4면체 위치 정의
  /*================= 3D페이지 4면체 위치 정의 ==================== */
  for (var i = 0; i < page.length; i++) {
    page[i].style_transform =
      "rotateY(" + page_angle + "deg) translateZ(" + w / 2 + "px)";
    page_angle += 90;
  }

  /*================= 페이지 정면으로 초기화 ==================== */
  wrapper.style.transform =
    "translateZ(" + -w / 2 + "px) rotateY(" + yDeg + "deg)";
}

/*================= 페이지 초기화 끝 ==================== */

/*================= 인디케이터 초기화 함수 ==================== */

function init_indicator() {
  /*================= 인디케이터 표시 ==================== */
  for (var i = 0; i < indicator_length; i++) {
    indicator.innerHTML += "<li>" + (i + 1) + "</li>";
  }

  indicator_li = indicator.querySelectorAll("li");
  change_page(indicator_num);
}

/*================= 인디케이터 초기화 끝 ==================== */

/*================= 페이지 전환 ==================== */

function change_page(inum) {
  indicator_li[inum - 1].setAttribute("class", "active");
  yDeg = -90 * (inum - 1);
  wrapper.style.transform =
    "translateZ(" + -w / 2 + "px) rotateY(" + yDeg + "deg)";

  /*================= 인디케이터 표시 ==================== */
  for (var i = 0; i < indicator_li.length; i++) {
    indicator_li[i].removeAttribute("class");
  }

  indicator_li[inum - 1].setAttribute("class", "active");
}

/*================= 페이지 전환 끝 ==================== */

init_page();
init_indicator();

/*================= 이벤트리스너 ==================== */

for (var i = 0; i < indicator_li.length; i++) {
  indicator_li[i].addEventListener("click", function () {
    indicator_num = parseInt(this.innerText);
    change_page(indicator_num);
  });
}

/*================= 이벤트리스너 끝 ==================== */

/*================= 터치 제스처 이벤트 ==================== */

// 터치 swipe left
hammer.on("swipeleft", function (e) {
  //인디케이터(페이지) 이동 범위 내이면
  if (indicator_num < indicator_length) {
    page_vector = 1;
  } else page_vector = 0;

  indicator_num += page_vector;
  change_page(indicator_num);
});

//터치 swipe right
hammer.on("swiperight", function (e) {
  if (indicator_num > 1) {
    page_vector = -1;
  } else page_vector = 0;

  indicator_num += page_vector;
  change_page(indicator_num);
});

//창 크기 변경 시 페이지 초기화
window.onresize = function () {
  init_page();
};

/*================= 터치 제스처 이벤트 끝 ==================== */
