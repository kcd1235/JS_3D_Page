// 변수선언
var wrapper = document.querySelector(".wrapper"); //전체 페이지를 감싸는 틀
var page = document.querySelectorAll(".page"); //각 페이지 요소
var indicator = document.getElementById("indicator"); //인디케이터를 담는 틀
var indicator_li = indicator.querySelectorAll("li"); //인디케이터 목록

var yDeg = 0;
var indicator_num = 1;
var indicator_length = page.length;
var w = page[0].offsetWidth;
var page_angle = 0;

//페이지 초기화
function init_page() {
  w = page[0].offsetWidth;

  //3D페이지 4면체 위치 정의
  for (var i = 0; i < page.length; i++) {
    page[i].style_transform =
      "rotateY(" + page_angle + "deg) translateZ(" + w / 2 + "px)";
    page_angle += 90;
  }

  //페이지 정면으로 초기화
  wrapper.style.transform =
    "translateZ(" + -w / 2 + "px) rotateY(" + yDeg + "deg)";
}

init_page();
