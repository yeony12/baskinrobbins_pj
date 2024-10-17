
const qs = (x) => document.querySelector(x);
const qsa = (x) => document.querySelectorAll(x);



/// 바로실행하는 익명함수(지역화목적) 구역 1 ///////////
(() => {
  
  const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);

  // HTML태그 로딩후 loadFn함수 호출 ///
  addEvt(window, "DOMContentLoaded", loadFn);

  /**************************** 마우스 효과 ****************************/

  function loadFn() {
    // 이벤트 대상 : 전체화면
    const wrap = document.querySelector(".wrap");
    const moving = document.querySelector(".pointer");

    wrap.onmousemove = (e) => {
      moving.style.top = e.pageY + "px";
      moving.style.left = e.pageX + "px";
    };

    // 이벤트 대상 구역에 들어올 때 보이기, 나가면 숨기기
    wrap.onmouseenter = () => {
      moving.style.opacity = 1;
    };

    wrap.onmouseleave = () => {
      moving.style.opacity = 0;
    };
  } ///////////// loadFn 함수 ////////////
  

  /*********************** 프로모션 구역 슬라이드 함수 ***********************/

  let slideGap = "";
  let winW;

  const setGap = () => {
    winW = window.innerWidth;
    if (winW <= 1300 && winW > 768) slideGap = "calc(-295px - 24px)";
    else if (winW <= 768) slideGap = "calc(-295px - 55px)";
    else slideGap = "calc(-295px - 36px)";
  }; /////////// setGap 함수 ///////////////

  window.addEventListener("resize", setGap);

  
  setGap();

  function goSlide(evt, sts = true) {
    const abtn = qsa(".abtn");

    for (let x of abtn) {
      x.onclick = goSlide;
    }

    // 오른쪽 버튼인 .ab2인가?
    let isRbtn = sts ? this.classList.contains("ab2") : true;

    if (isRbtn) {
      // 먼저 왼쪽으로 이동하기
      proslider.style.left = slideGap;
      proslider.style.transition = ".4s ease-in-out";

      setTimeout(() => {
        // 맨 앞 li 맨 뒤로 이동
        proslider.appendChild(proslider.querySelectorAll("li")[0]);
        // 슬라이드 left 값이 -100%이므로 left값을 0으로 변경

        // left 값 0으로 변경
        proslider.style.left = "0";
        // left 트랜지션 없애기
        proslider.style.transition = "none";
      }, 600);
    } /////// if문 //////
    else {
      //  하위 li 수집
      let list = proslider.querySelectorAll("li");
      // 맨 뒤 요소 li 맨 앞으로 이동하기
      proslider.insertBefore(list[list.length - 1], list[0]);
      proslider.style.left = "-20%";
      proslider.style.transition = "none";

      setTimeout(() => {
        proslider.style.left = "0";
        proslider.style.transition = ".4s ease-in-out";
      }, 0);
    } /////// else문  //////
  } //////////////////////// goSlide 함수 ////////////////////

  let autoI;
  let autoT;
  autoSlide();

  // 자동 넘김 호출 함수 //////
  function autoSlide() {
    autoI = setInterval(() => {
      goSlide(false, false);
    }, 3000);
  } //////////////////////// autoSlide 함수 //////////////////


  /*************************** 뉴아이템 영역 ***************************/
  // 위치값 함수 (화면상단에서의 top위치값)
  const getBCR = (x) => x.getBoundingClientRect().top;
  // 화면기준값(높이의 2/3)
  const winH = window.innerHeight / 3;
  console.log("화면1/3:", winH);

  // 스크롤 등장 대상
  // New Item
  const newItem = qs(".new-cont-box");
  const showTg = qs(".new-first-slider");
  const showTg2 = qs(".new-second-slider");

  // 윈도우 스크롤 이벤트 설정하기
  window.addEventListener("scroll", () => {
    // 대상위치값
    // console.log(getBCR(newItem));
    if (getBCR(newItem) < winH) {
      showTg.classList.add("on");
    } else {
      showTg.classList.remove("on");
    }
    if (getBCR(newItem) < winH) {
      showTg2.classList.add("on");
    } else {
      showTg2.classList.remove("on");
    }
  }); /////// scroll /////////////////
})(); ///////////// 익명지역함수실행구역1 ////////////////

/// 바로실행하는 익명함수(지역화목적) 구역 2 ///////////
(() => {
  const proslider = qs(".slider");
  goSlide();

  /*********************** 메인 배너 슬라이드 함수 ***********************/
  function goSlide() {
    // 먼저 왼쪽으로 이동하기
    proslider.style.left = "-100%";
    proslider.style.transition = ".6s ease-in-out";

    setTimeout(() => {
      // 맨 앞 li 맨 뒤로 이동
      proslider.appendChild(proslider.querySelectorAll("li")[0]);
      // 슬라이드 left 값이 -100%이므로 left값을 0으로 변경

      // left 값 0으로 변경
      proslider.style.left = "0";
      // left 트랜지션 없애기
      proslider.style.transition = "none";
    }, 600);
  } //////////////////////// goSlide 함수 ////////////////////

  let autoI;
  let autoT;
  autoSlide();

  // 자동 넘김 호출 함수 //////
  function autoSlide() {
    autoI = setInterval(() => {
      goSlide(false, false);
    }, 3000);
  } //////////////////////// autoSlide 함수 //////////////////
})(); ///////////// 익명지역함수실행구역 ////////////////
