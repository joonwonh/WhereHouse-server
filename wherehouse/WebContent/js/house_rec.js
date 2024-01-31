var guSpec = [];
var guName = ["강동구", "송파구", "강남구", "서초구", "관악구",
    "동작구", "영등포구", "금천구", "구로구", "강서구",
    "양천구", "마포구", "서대문구", "은평구", "노원구",
    "도봉구", "강북구", "성북구", "중랑구", "동대문구",
    "광진구", "성동구", "용산구", "중구", "종로구"];

var map;
var populationArea;
var areas = [];
var polygons = [];
var recommendIdx = [];
var opacity = 0.7;
var isIncrease = true;
var polygon_interval;


function initGuSpec() {
    guSpec.push({ name: "강동구", convenienceStore: 324, cafe: 683, restaurant: 3797, olive: 13, daiso: 11, polliceOffice: 24, cctv: 3192, arrest: 69 });
    guSpec.push({ name: "송파구", convenienceStore: 505, cafe: 842, restaurant: 7304, olive: 24, daiso: 16, polliceOffice: 29, cctv: 3253, arrest: 65 });
    guSpec.push({ name: "강남구", convenienceStore: 712, cafe: 1948, restaurant: 12371, olive: 40, daiso: 19, polliceOffice: 30, cctv: 7243, arrest: 74 });
    guSpec.push({ name: "서초구", convenienceStore: 396, cafe: 1309, restaurant: 5714, olive: 17, daiso: 10, polliceOffice: 28, cctv: 4995, arrest: 80 });
    guSpec.push({ name: "관악구", convenienceStore: 384, cafe: 779, restaurant: 4813, olive: 14, daiso: 12, polliceOffice: 24, cctv: 5642, arrest: 69 });
    guSpec.push({ name: "동작구", convenienceStore: 297, cafe: 742, restaurant: 3179, olive: 11, daiso: 15, polliceOffice: 23, cctv: 2690, arrest: 67 });
    guSpec.push({ name: "영등포구", convenienceStore: 433, cafe: 968, restaurant: 6854, olive: 13, daiso: 11, polliceOffice: 22, cctv: 4660, arrest: 72 });
    guSpec.push({ name: "금천구", convenienceStore: 283, cafe: 785, restaurant: 3054, olive: 7, daiso: 6, polliceOffice: 16, cctv: 2885, arrest: 71 });
    guSpec.push({ name: "구로구", convenienceStore: 326, cafe: 655, restaurant: 4151, olive: 14, daiso: 10, polliceOffice: 25, cctv: 4831, arrest: 70 });
    guSpec.push({ name: "강서구", convenienceStore: 496, cafe: 643, restaurant: 6190, olive: 23, daiso: 16, polliceOffice: 20, cctv: 3353, arrest: 66 });
    guSpec.push({ name: "양천구", convenienceStore: 267, cafe: 553, restaurant: 3195, olive: 12, daiso: 8, polliceOffice: 22, cctv: 3890, arrest: 64 });
    guSpec.push({ name: "마포구", convenienceStore: 459, cafe: 1848, restaurant: 8270, olive: 26, daiso: 7, polliceOffice: 23, cctv: 2638, arrest: 73 });
    guSpec.push({ name: "서대문구", convenienceStore: 227, cafe: 1528, restaurant: 3671, olive: 13, daiso: 8, polliceOffice: 17, cctv: 3538, arrest: 70 });
    guSpec.push({ name: "은평구", convenienceStore: 358, cafe: 552, restaurant: 3850, olive: 12, daiso: 9, polliceOffice: 27, cctv: 4653, arrest: 73 });
    guSpec.push({ name: "노원구", convenienceStore: 302, cafe: 434, restaurant: 3488, olive: 12, daiso: 12, polliceOffice: 23, cctv: 2626, arrest: 70 });
    guSpec.push({ name: "도봉구", convenienceStore: 220, cafe: 489, restaurant: 2224, olive: 6, daiso: 8, polliceOffice: 15, cctv: 2385, arrest: 70 });
    guSpec.push({ name: "강북구", convenienceStore: 233, cafe: 574, restaurant: 3526, olive: 6, daiso: 8, polliceOffice: 20, cctv: 3321, arrest: 76 });
    guSpec.push({ name: "성북구", convenienceStore: 297, cafe: 807, restaurant: 3802, olive: 12, daiso: 9, polliceOffice: 31, cctv: 4957, arrest: 75 });
    guSpec.push({ name: "중랑구", convenienceStore: 284, cafe: 563, restaurant: 3824, olive: 8, daiso: 6, polliceOffice: 23, cctv: 4193, arrest: 69 });
    guSpec.push({ name: "동대문구", convenienceStore: 316, cafe: 730, restaurant: 4256, olive: 10, daiso: 9, polliceOffice: 27, cctv: 2759, arrest: 71 });
    guSpec.push({ name: "광진구", convenienceStore: 329, cafe: 875, restaurant: 4328, olive: 16, daiso: 6, polliceOffice: 17, cctv: 3592, arrest: 67 });
    guSpec.push({ name: "성동구", convenienceStore: 258, cafe: 987, restaurant: 3818, olive: 11, daiso: 7, polliceOffice: 21, cctv: 4175, arrest: 74 });
    guSpec.push({ name: "용산구", convenienceStore: 227, cafe: 1087, restaurant: 4996, olive: 12, daiso: 4, polliceOffice: 19, cctv: 2970, arrest: 79 });
    guSpec.push({ name: "중구", convenienceStore: 292, cafe: 1452, restaurant: 6061, olive: 21, daiso: 6, polliceOffice: 27, cctv: 2584, arrest: 86 });
    guSpec.push({ name: "종로구", convenienceStore: 259, cafe: 1690, restaurant: 7206, olive: 12, daiso: 7, polliceOffice: 32, cctv: 1966, arrest: 93 });
}


//카카오맵 커스텀 오버레이
var customOverlay;

window.onload = function () {
    initGuSpec();
    var container = document.getElementById("map");
    var options = {
        center: new kakao.maps.LatLng(37.5612135, 126.8716985),
        level: 8,
        minLevel: 8,
        maxLevel: 8, // 5
        disableDoubleClickZoom: true // 더블 클릭 확대 잠금
    };

    map = new kakao.maps.Map(container, options);

    //json 파싱 및 전처리
    var locate = JSON.parse(JSON.stringify(mapData));
    var feat = locate.features;
    feat.forEach(element => {
        var geo = element.geometry;
        var coor = geo.coordinates;
        var name = element.properties.SIG_KOR_NM;
        var path = [];
        coor[0].forEach(point => {
            path.push(new kakao.maps.LatLng(point[1], point[0]));
        })
        var area = { name, path };
        areas.push(area);
    });

    // 구 별 인구 밀집도 데이터 초기화
    populationArea = initPopulation();

    // 패널 열고 닫기
    var info = document.querySelector("#information");
    var chart_info = document.querySelector("#chart_information");
    var func = document.querySelector("#btn");

    func.addEventListener("click", panelFunc);

    function panelFunc() {
        if (chart_info.style.left == "0px") {
            info.style.left = "-333px";
            chart_info.style.left = "-333px";
            func.innerText = "▶";
        }
        else if (func.style.left == "662px") {
            func.style.left = "328px";
            info.style.left = "-333px";
            chart_info.style.left = "-333px";
            func.innerText = "▶";
        }
        else {
            chart_info.style.left = "333px";
            info.style.left = "0px";
            func.style.left = "662px";
            func.innerText = "◀";
        }
    }

    // 전세/월세 라디오 버튼 선택
    var rentalType = document.querySelectorAll("input[name='rentalType']");
    rentalType.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            var current = e.currentTarget;
            if (current.getAttribute("id") === "btn_charter") {
                showCharter();
                showFirstCharterFee();
                showSecondCharterFee();
                showThirdCharterFee();
            } else {
                showMonthly();
                showFirstMonthlyFee();
                showSecondMonthlyFee();
                showThirdMonthlyFee();
            }
        })
    });

    // 슬라이드 바 변경 이벤트
    var safety = document.getElementById("myRange_safety");
    var y = document.getElementById("safety_f");
    safety.addEventListener("change", function () {
        y.innerHTML = this.value + "단계";
        var yText = document.getElementById("descript_safety");
        yText.innerHTML = '<a href="./description.html#first_page" target="_blank">점수 산정 방식 보러 가기</a>';
        yText.querySelector('a').style.textDecoration = "none";
        yText.querySelector('a').style.color = "rgba(11, 94, 215, 1)";

        yText.querySelector('a').addEventListener("mouseover", function () {
            this.style.color = "#4690ff";
        });

        // 마우스가 벗어날 때의 이벤트 처리
        yText.querySelector('a').addEventListener("mouseout", function () {
            this.style.color = "rgba(11, 94, 215, 1)";
        });
    });

    var convenience = document.getElementById("myRange_convenience");
    var c = document.getElementById("convenience_f");
    convenience.addEventListener("change", function () {
        c.innerHTML = this.value + "단계";
        //document.getElementById("descript_convenience").innerText = "편의 " + this.value + "단계는 이러이러이러합니다."
    });

    // 인구밀집도 인덱스 열고 닫기
    var shame_info = document.querySelector("#population-shame-info");
    var bar = document.querySelector("#population-shame-bar");
    var detail = document.querySelector("#population-shame-btn");
    detail.addEventListener("click", hideDetail);

    function hideDetail() {
        if (detail.innerText === "-") {
            detail.innerText = "+";
            shame_info.style.display = "none";
            bar.style.backgroundColor = "rgba(217,217,217,0.3)";
            bar.style.border = "#D9D9D9 1px solid";
        } else {
            detail.innerText = "-";
            bar.style.backgroundColor = "rgba(217, 217, 217, 0.80)";
            bar.style.border = "rgba(0, 0, 0, 0.2) 2px solid";
            shame_info.style.display = "block";
        }
    }

    // 상세보기 모달창 띄우기
    var compBtn = document.getElementById("compBtn");
    compBtn.addEventListener("click", showComparison);

    // 상세보기 모달창 닫기
    var modalCloseBtn = document.getElementById("modalCloseBtn");
    modalCloseBtn.addEventListener("click", function () {
        var modal = document.querySelector(".modal");
        modal.style.display = "none";
        modal.style.zIndex = 0;
    })


    // 거주지 추천 결과에서 체크여부
    var check_first = document.getElementById("check_first");
    var check_second = document.getElementById("check_second");
    var check_third = document.getElementById("check_third");
    var check_first_info = document.getElementById("check_first_info");
    var check_second_info = document.getElementById("check_second_info");
    var check_third_info = document.getElementById("check_third_info");

    check_first.addEventListener("change", function () {
        check_first_info.checked = check_first.checked;
    });
    check_second.addEventListener("change", function () {
        check_second_info.checked = check_second.checked;
    });
    check_third.addEventListener("change", function () {
        check_third_info.checked = check_third.checked;
    });
    check_first_info.addEventListener("change", function () {
        check_first.checked = check_first_info.checked;
    });
    check_second_info.addEventListener("change", function () {
        check_second.checked = check_second_info.checked;
    });
    check_third_info.addEventListener("change", function () {
        check_third.checked = check_third_info.checked;
    });

    // 모달창 이벤트
    var btn_safety = document.getElementById("btn_safety");
    var btn_conv = document.getElementById("btn_convenience");

    btn_safety.addEventListener("click", () => selectModal(1));
    btn_conv.addEventListener("click", () => selectModal(2));

    // 모달창 안전시설 버튼
    var pollice_content_btn = document.getElementById("pollice_content_btn");
    var cctv_content_btn = document.getElementById("cctv_content_btn");
    var arrest_content_btn = document.getElementById("arrest_content_btn");

    pollice_content_btn.addEventListener("click", () => { initSafety(1); searchGu("safety", "pollice"); });
    cctv_content_btn.addEventListener("click", () => { initSafety(2); searchGu("safety", "cctv"); });
    arrest_content_btn.addEventListener("click", () => { initSafety(3); searchGu("safety", "arrest"); });

    // 모달창 편의시설 버튼
    var convStore_content_btn = document.getElementById("convStore_content_btn");
    var restaurant_content_btn = document.getElementById("restaurant_content_btn");
    var cafe_content_btn = document.getElementById("cafe_content_btn");
    var olive_content_btn = document.getElementById("olive_content_btn");
    var daiso_content_btn = document.getElementById("daiso_content_btn");

    convStore_content_btn.addEventListener("click", () => { initConv(1); searchGu("conv", "convStore"); });
    restaurant_content_btn.addEventListener("click", () => { initConv(2); searchGu("conv", "restaurant"); });
    cafe_content_btn.addEventListener("click", () => { initConv(3); searchGu("conv", "cafe"); });
    olive_content_btn.addEventListener("click", () => { initConv(4); searchGu("conv", "olive"); });
    daiso_content_btn.addEventListener("click", () => { initConv(5); searchGu("conv", "daiso"); });

    // 초기 로딩 시 안전 정보 표시, 편의 정보 숨김
    document.getElementById('safe-info').style.display = 'block';
    document.getElementById('conv-info').style.display = 'none';

    // 안전 정보 버튼 클릭 시
    document.getElementById('btn_safe').addEventListener('click', function () {
        document.getElementById('safe-info').style.display = 'block';
        document.getElementById('conv-info').style.display = 'none';
    });

    // 편의 정보 버튼 클릭 시
    document.getElementById('btn_conv').addEventListener('click', function () {
        document.getElementById('safe-info').style.display = 'none';
        document.getElementById('conv-info').style.display = 'block';
    });


}
// window.onload 끝
function initSafety(num) {
    var pollice_content_btn = document.getElementById("pollice_content_btn");
    var cctv_content_btn = document.getElementById("cctv_content_btn");
    var arrest_content_btn = document.getElementById("arrest_content_btn");

    pollice_content_btn.style.color = "#7b7b7b";
    cctv_content_btn.style.color = "#7b7b7b";
    arrest_content_btn.style.color = "#7b7b7b";

    // 파출소
    if (num === 1) {
        pollice_content_btn.style.color = "#000";
    } else if (num === 2) { //CCTV
        cctv_content_btn.style.color = "#000";
    } else { //검거율
        arrest_content_btn.style.color = "#000";
    }
}

function initConv(num) {
    var convStore_content_btn = document.getElementById("convStore_content_btn");
    var restaurant_content_btn = document.getElementById("restaurant_content_btn");
    var cafe_content_btn = document.getElementById("cafe_content_btn");
    var olive_content_btn = document.getElementById("olive_content_btn");
    var daiso_content_btn = document.getElementById("daiso_content_btn");

    convStore_content_btn.style.color = "#7b7b7b";
    restaurant_content_btn.style.color = "#7b7b7b";
    cafe_content_btn.style.color = "#7b7b7b";
    olive_content_btn.style.color = "#7b7b7b";
    daiso_content_btn.style.color = "#7b7b7b";

    // 편의점
    if (num === 1) {
        convStore_content_btn.style.color = "#000";
    } else if (num === 2) { //음식점
        restaurant_content_btn.style.color = "#000";
    } else if (num === 3) { //카페
        cafe_content_btn.style.color = "#000";
    } else if (num === 4) { //올리브영
        olive_content_btn.style.color = "#000";
    } else { //다이소
        daiso_content_btn.style.color = "#000";
    }
}

function selectModal(num) {
    if (num === 1) {
        initSafety(1);
        searchGu("safety", "pollice");
        document.getElementById("modal-select-conv").style.display = "none";
        document.getElementById("modal-select-safety").style.display = "flex";
        document.getElementById("btn_safety").style.color = "#000";
        document.getElementById("btn_convenience").style.color = "#7b7b7b";
    } else {
        initConv(1);
        searchGu("conv", "convStore");
        document.getElementById("modal-select-conv").style.display = "flex";
        document.getElementById("modal-select-safety").style.display = "none";
        document.getElementById("btn_safety").style.color = "#7b7b7b";
        document.getElementById("btn_convenience").style.color = "#000";
    }
}


function displayArea(area, population, isRecommend) {
    var polygon = new kakao.maps.Polygon({
        map: map,
        path: area.path,
        strokeWeight: 2,
        strokeColor: isRecommend ? population.color : "rgba(0,0,0,0.3)",
        strokeOpacity: 0.8,
        fillColor: isRecommend ? population.color : "rgba(255,255,255,0.1)",
        fillOpacity: 0.7
    });

    polygons.push(polygon);

    if (isRecommend) {
        kakao.maps.event.addListener(polygon, 'mouseover', function () {
            polygon.setOptions({ strokeWeight: 5, strokeColor: "rgba(255, 0, 0, 1)" });
        });

        kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({ strokeWeight: 2, strokeColor: isRecommend ? population.color : "rgb(0,0,0)" });
            polygon.setOptions({ fillColor: isRecommend ? population.color : "none" });
        });

        // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시
        kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
            var content = '<div class="info">'
                + '<div id="info_close_wrap">'
                + '<img src="images/closeBtn.svg" alt="" srcset="" id="info_close_btn" onclick="infoClose()"></div>'
                + '<div class="info_title">' + population.name + '</div><hr>'
                + '<div class="info_rank">'
                + '<div id="info_price_rank">'
                + '<div class="info_content" id="info_charter">평균 전세금 : <span id="info_charter_rank">' + population.charter_avg_rank + '</span>위 / 25</div>'
                + '<div class="info_content" id="info_deposit">평균 보증금 : <span id="info_deposit_rank">' + population.deposit_avg_rank + '</span>위 / 25</div>'
                + '<div class="info_content" id="info_monthly">평균 월세금 : <span id="info_monthly_rank">' + population.monthly_avg_rank + '</span>위 / 25</div></div>'
                + '<div id="info_score">'
                + '<div class="info_content" id="info_convenience">생활 편의 : <span id="info_conv_rank">' + population.conv_rank + '</span>위 / 25</div>'
                + '<div class="info_content" id="info_safety">생활 안전 : <span id="info_safety_rank">' + population.safe_rank + '</span>위 / 25</div>'
                + '<div class="info_content" id="info_dense">인구 밀집도 : <span id="info_dense_rank">' + population.congest_rank + '</span>위 / 25</div></div></div>';

            // 기존 커스텀 오버레이 지우기
            if (customOverlay != null) {
                infoClose();
            }

            var latLng = { lat: mouseEvent.latLng.La, lng: mouseEvent.latLng.Ma };
            localStorage.setItem("latLng", JSON.stringify(latLng));


            customOverlay = new kakao.maps.CustomOverlay({
                content: content,
                map: map,
                position: mouseEvent.latLng
            });

            customOverlay.setMap(map);
        });
    }
}
/**
 * 커스텀 오버레이 정보창 닫기
 */
function infoClose() {
    customOverlay.setMap(null);
}

// 전세 선택 시 보여줄 화면
function showCharter() {
    document.getElementById("charterInput").style.display = "block";
    document.getElementById("monthlyInput").style.display = "none";
    document.querySelector(".select_need").style.height = "180px";

    document.querySelector('input[name="monthlyDeposit"]').value = "";
    document.querySelector('input[name="monthlyMonth"]').value = "";
}

// 월세 선택 시 보여줄 화면
function showMonthly() {
    document.getElementById("charterInput").style.display = "none";
    document.getElementById("monthlyInput").style.display = "block";
    document.querySelector(".select_need").style.height = "230px";

    document.querySelector('input[name="charterDeposit"]').value = "";
}

// 추천 결과 페이지 전환
function showRecommend() {
    document.getElementById("user-input").style.display = "block";
    document.getElementById("recommend_result_page").style.display = "none";

    document.getElementById("recommend_first").style.display = "block";
    document.getElementById("recommend_second").style.display = "block";
    document.getElementById("recommend_third").style.display = "block";

    document.getElementById("recommend_first_info").style.display = "none";
    document.getElementById("recommend_second_info").style.display = "none";
    document.getElementById("recommend_third_info").style.display = "none";
}

//전세 / 보증금,월세 상/하한선 alert 띄우기

function resultCheck() {
    var input_charter = document.getElementById("charterInput").querySelector('input[name="charterDeposit"]');
    var input_deposit = document.getElementById("monthlyInput").querySelector('input[name="monthlyDeposit"]');
    var input_monthly = document.getElementById("monthlyInput").querySelector('input[name="monthlyMonth"]');
    console.log(input_charter.value);
    console.log(input_deposit.value);
    console.log(input_monthly.value);

    if (input_deposit.value == "" || input_monthly.value == "") {
        if (input_charter.value == "") {
            alert("입력되지 않은 정보가 있습니다.");
        }
        else if (input_charter.value < 15000 || input_charter.value > 30000) {
            alert("전세금의 입력 상하한선은 15000 ~ 30000 입니다.");
        }
        else {
            showResult();
        }
    }
    else if (input_charter.value == "") {
        if (input_deposit.value == "" && input_monthly.value == "") {
            alert("입력되지 않은 정보가 있습니다.");
        }
        else if (input_deposit.value < 2100 || input_deposit.value > 4500) {
            alert("보증금의 입력 상하한선은 2100 ~ 4500 입니다.");
        }
        else if (input_monthly.value < 40 || input_monthly.value > 70) {
            alert("월세금의 입력 상하한선은 40 ~ 70 입니다.");
        }
        else {
            showResult();
        }
    }
}

function showResult() {
    document.getElementById("recommend_first").style.display = "none";
    document.getElementById("recommend_first_info").style.display = "block";
    document.getElementById("recommend_second").style.display = "none";
    document.getElementById("recommend_second_info").style.display = "block";
    document.getElementById("recommend_third").style.display = "none";
    document.getElementById("recommend_third_info").style.display = "block";

    document.getElementById("user-input").style.display = "none";
    document.getElementById("recommend_result_page").style.display = "block";

    var chart_info = document.querySelector("#chart_information");
    var func = document.querySelector("#btn");

    chart_info.style.zIndex = "1";
    chart_info.style.left = "333px";

    if (chart_info.style.left === '333px') {
        func.style.left = "662px";
        func.innerText = "◀";
    }


    // 거주지 추천 ajax to servlet
    const charter_avg = $('#charterInput input[name="charterDeposit"]').val();
    const deposit_avg = $('#monthlyInput input[name="monthlyDeposit"]').val();
    const monthly_avg = $('#monthlyInput input[name="monthlyMonth"]').val();
    const safe_score = $('#myRange_safety').val();
    const cvt_score = $('#myRange_convenience').val();

    console.log("전세금 입력값 : " + charter_avg);
    console.log("월세 보증금 입력값 : " + deposit_avg);
    console.log("월세금 입력값 : " + monthly_avg);
    console.log("안전 점수 입력값 : " + safe_score);
    console.log("편의 점수 입력값 : " + cvt_score);

    $.ajax({
        url: 'RecServiceController/monthly.do',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            deposit_avg: deposit_avg,
            monthly_avg: monthly_avg,
            safe_score: safe_score,
            cvt_score: cvt_score
        }),
        success: function (data) {
            displayMonthly(data);
            showMap(data);
            chart(data);
            chart_update(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('에러 발생:', textStatus, errorThrown);
        }
    });

    $.ajax({
        url: 'RecServiceController/charter.do',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            charter_avg: charter_avg,
            safe_score: safe_score,
            cvt_score: cvt_score
        }),
        success: function (data) {
            displayCharter(data);
            showMap(data);
            chart(data);
            chart_update(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('에러 발생:', textStatus, errorThrown);
        }
    });

    // 거주지 추천 결과 데이터 보여주기
    var orders = ["first", "second", "third"];

    function displayCharter(data) {
        console.log("전세 함수 실행");
        for (var i = 0; i < data.length; i++) {
            var recommend_result = "recommend_" + orders[i] + "_result";
            document.getElementById(recommend_result).innerText = data[i].gu_name;
            console.log(data[i].gu_name);

            var chart_name = document.querySelectorAll(".chart_name");
            for (var j = 0; j < chart_name.length; j++) {
                chart_name[j].innerText = data[0].gu_name;
            }

            var chart_safe_rank = document.getElementById("chart_safe_rank");
            var chart_conv_rank = document.getElementById("chart_conv_rank");
            var gu_info_review = document.getElementById("gu_review");
            for (var j = 0; j < populationArea.length; j++) {
                if (data[0].gu_name == populationArea[j].name) {
                    chart_safe_rank.innerText = populationArea[j].safe_rank;
                    chart_conv_rank.innerText = populationArea[j].conv_rank;
                    gu_info_review.innerText = populationArea[j].gu_review;
                }
            }





            var recommend_detail = recommend_result + "_detail";
            document.getElementById(recommend_detail).innerText = data[i].gu_name;


            var select_charter = orders[i] + "_charter_fee";
            document.getElementById(select_charter).innerText = data[i].charter_avg;

            var select_deposit = orders[i] + "_deposit_fee";
            document.getElementById(select_deposit).innerText = data[i].deposit_avg;

            var select_monthly = orders[i] + "_monthly_fee";
            document.getElementById(select_monthly).innerText = data[i].monthly_avg;

            var safety_value = "safety_" + orders[i] + "_value";
            document.getElementById(safety_value).innerText = "\u00a0" + data[i].safe_score;

            var conv_value = "conv_" + orders[i] + "_value";
            document.getElementById(conv_value).innerText = "\u00a0" + data[i].cvt_score;

            var safety_graph = "safety_" + orders[i] + "_graph";
            document.getElementById(safety_graph).style.width = data[i].safe_score * 2 - 10 + "px";

            var conv_graph = "conv_" + orders[i] + "_graph";
            document.getElementById(conv_graph).style.width = data[i].cvt_score * 2 - 10 + "px";
        }
    }

    function displayMonthly(data) {
        console.log("월세 함수 실행");
        for (var i = 0; i < data.length; i++) {
            var recommend_result = "recommend_" + orders[i] + "_result";
            document.getElementById(recommend_result).innerText = data[i].gu_name;
            console.log(data[i].gu_name);

            var chart_name = document.querySelectorAll(".chart_name");
            for (var j = 0; j < chart_name.length; j++) {
                chart_name[j].innerText = data[0].gu_name;
            }

            var chart_safe_rank = document.getElementById("chart_safe_rank");
            var chart_conv_rank = document.getElementById("chart_conv_rank");
            var gu_info_review = document.getElementById("gu_review");
            for (var j = 0; j < populationArea.length; j++) {
                if (data[0].gu_name == populationArea[j].name) {
                    chart_safe_rank.innerText = populationArea[j].safe_rank;
                    chart_conv_rank.innerText = populationArea[j].conv_rank;
                    gu_info_review.innerText = populationArea[j].gu_review;
                }
            }

            var recommend_detail = recommend_result + "_detail";
            document.getElementById(recommend_detail).innerText = data[i].gu_name;

            var select_charter = orders[i] + "_charter_fee";
            document.getElementById(select_charter).innerText = data[i].charter_avg;

            var select_deposit = orders[i] + "_deposit_fee";
            document.getElementById(select_deposit).innerText = data[i].deposit_avg;

            var select_monthly = orders[i] + "_monthly_fee";
            document.getElementById(select_monthly).innerText = data[i].monthly_avg;

            var safety_value = "safety_" + orders[i] + "_value";
            document.getElementById(safety_value).innerText = "\u00a0" + data[i].safe_score;

            var conv_value = "conv_" + orders[i] + "_value";
            document.getElementById(conv_value).innerText = "\u00a0" + data[i].cvt_score;

            var safety_graph = "safety_" + orders[i] + "_graph";
            document.getElementById(safety_graph).style.width = data[i].safe_score * 2 - 10 + "px";

            var conv_graph = "conv_" + orders[i] + "_graph";
            document.getElementById(conv_graph).style.width = data[i].cvt_score * 2 - 10 + "px";
        }
    }
    function chart(data) {
        if (data && data.length > 0) {
            updateChart('policeOfficeChart', ['구 평균 파출소', '파출소'], [23, data[0].police_office], ['#0b5dd7ac', '#0b5dd7']);
            updateChart('cctvChart', ['구 평균 CCTV', 'CCTV'], [3719, data[0].cctv], ['rgba(248, 45, 45, 0.697)', 'rgba(248, 45, 45)']);
            updateChart('arrestChart', ['구 평균 검거율', '검거율'], [72, data[0].safe_score], ['rgba(69, 69, 69, 0.719)', 'rgba(69, 69, 69)']);
            updateChart('restaurantChart', ['구 평균 음식점', '음식점'], [4957, data[0].restourant], ['rgba(0, 189, 0, 0.687)', 'rgba(0, 189, 0)']);
            updateChart('convStoreChart', ['구 평균 편의점', '편의점'], [341, data[0].cvt_store], ['rgba(238, 130, 238, 0.683)', 'rgba(238, 130, 238)']);
            updateChart('cafeChart', ['구 평균 카페', '카페'], [940, data[0].cafe], ['rgba(171, 58, 58, 0.669)', 'rgba(171, 58, 58)']);
        }
    }

    function updateChart(chartId, labels, data, backgroundColor) {
        var chartData = {
            labels: labels,
            datasets: [{
                label: labels[1],
                data: data,
                backgroundColor: backgroundColor,
            }]
        };

        var existingChart = window[chartId + 'Instance'];

        if (existingChart) {
            existingChart.data = chartData;
            existingChart.update();
        } else {
            var chartElement = document.getElementById(chartId);
            window[chartId + 'Instance'] = new Chart(chartElement.getContext('2d'), {
                type: 'bar',
                data: chartData,
                options: {
                    maxBarThickness: 40
                }
            });
        }
    }

    var first_rec = document.getElementById("recommend_first_result");
    var first_rec_detail = document.getElementById("recommend_first_result_detail");
    var second_rec = document.getElementById("recommend_second_result");
    var second_rec_detail = document.getElementById("recommend_second_result_detail");
    var third_rec = document.getElementById("recommend_third_result");
    var third_rec_detail = document.getElementById("recommend_third_result_detail");
    var chart_name = document.querySelectorAll(".chart_name");
    var chart_safe_rank = document.getElementById("chart_safe_rank");
    var chart_conv_rank = document.getElementById("chart_conv_rank");
    var gu_info_review = document.getElementById("gu_review");

    function chart_update(data) {
        for (var i = 0; i < data.length; i++) {
            console.log("chart_update함수 실행 : " + data[i]);
        }

        first_rec.addEventListener("click", function () {
            first_gu_name(data[0].gu_name, data[0].police_office, data[0].cctv, data[0].safe_score, data[0].restourant, data[0].cafe, data[0].cvt_store);
        });

        first_rec_detail.addEventListener("click", function () {
            first_gu_name(data[0].gu_name, data[0].police_office, data[0].cctv, data[0].safe_score, data[0].restourant, data[0].cafe, data[0].cvt_store);
        });

        second_rec.addEventListener("click", function () {
            second_gu_name(data[1].gu_name, data[1].police_office, data[1].cctv, data[1].safe_score, data[1].restourant, data[1].cafe, data[1].cvt_store);
        });

        second_rec_detail.addEventListener("click", function () {
            second_gu_name(data[1].gu_name, data[1].police_office, data[1].cctv, data[1].safe_score, data[1].restourant, data[1].cafe, data[1].cvt_store);
        });

        third_rec.addEventListener("click", function () {
            third_gu_name(data[2].gu_name, data[2].police_office, data[2].cctv, data[2].safe_score, data[2].restourant, data[2].cafe, data[2].cvt_store);
        });

        third_rec_detail.addEventListener("click", function () {
            third_gu_name(data[2].gu_name, data[2].police_office, data[2].cctv, data[2].safe_score, data[2].restourant, data[2].cafe, data[2].cvt_store);
        });
    }

    function first_gu_name(gu_name, police_office, cctv, safe_score, restourant, cafe, cvt_store) {
        for (var j = 0; j < chart_name.length; j++) {
            chart_name[j].innerText = gu_name;
        }

        for (var j = 0; j < populationArea.length; j++) {
            if (gu_name == populationArea[j].name) {
                chart_safe_rank.innerText = populationArea[j].safe_rank;
                chart_conv_rank.innerText = populationArea[j].conv_rank;
                gu_info_review.innerText = populationArea[j].gu_review;
            }
        }

        updateChart('policeOfficeChart', ['구 평균 파출소', '파출소'], [23, police_office], ['#0b5dd7ac', '#0b5dd7']);
        updateChart('cctvChart', ['구 평균 CCTV', 'CCTV'], [3719, cctv], ['rgba(248, 45, 45, 0.697)', 'rgba(248, 45, 45)']);
        updateChart('arrestChart', ['구 평균 검거율', '검거율'], [72, safe_score], ['rgba(69, 69, 69, 0.719)', 'rgba(69, 69, 69)']);
        updateChart('restaurantChart', ['구 평균 음식점', '음식점'], [4957, restourant], ['rgba(0, 189, 0, 0.687)', 'rgba(0, 189, 0)']);
        updateChart('convStoreChart', ['구 평균 편의점', '편의점'], [341, cvt_store], ['rgba(238, 130, 238, 0.683)', 'rgba(238, 130, 238)']);
        updateChart('cafeChart', ['구 평균 카페', '카페'], [940, cafe], ['rgba(171, 58, 58, 0.669)', 'rgba(171, 58, 58)']);
    }

    function second_gu_name(gu_name, police_office, cctv, safe_score, restourant, cafe, cvt_store) {
        for (var j = 0; j < chart_name.length; j++) {
            chart_name[j].innerText = gu_name;
        }

        for (var j = 0; j < populationArea.length; j++) {
            if (gu_name == populationArea[j].name) {
                chart_safe_rank.innerText = populationArea[j].safe_rank;
                chart_conv_rank.innerText = populationArea[j].conv_rank;
                gu_info_review.innerText = populationArea[j].gu_review;
            }
        }

        updateChart('policeOfficeChart', ['구 평균 파출소', '파출소'], [23, police_office], ['#0b5dd7ac', '#0b5dd7']);
        updateChart('cctvChart', ['구 평균 CCTV', 'CCTV'], [3719, cctv], ['rgba(248, 45, 45, 0.697)', 'rgba(248, 45, 45)']);
        updateChart('arrestChart', ['구 평균 검거율', '검거율'], [72, safe_score], ['rgba(69, 69, 69, 0.719)', 'rgba(69, 69, 69)']);
        updateChart('restaurantChart', ['구 평균 음식점', '음식점'], [4957, restourant], ['rgba(0, 189, 0, 0.687)', 'rgba(0, 189, 0)']);
        updateChart('convStoreChart', ['구 평균 편의점', '편의점'], [341, cvt_store], ['rgba(238, 130, 238, 0.683)', 'rgba(238, 130, 238)']);
        updateChart('cafeChart', ['구 평균 카페', '카페'], [940, cafe], ['rgba(171, 58, 58, 0.669)', 'rgba(171, 58, 58)']);
    }

    function third_gu_name(gu_name, police_office, cctv, safe_score, restourant, cafe, cvt_store) {
        for (var j = 0; j < chart_name.length; j++) {
            chart_name[j].innerText = gu_name;
        }

        for (var j = 0; j < populationArea.length; j++) {
            if (gu_name == populationArea[j].name) {
                chart_safe_rank.innerText = populationArea[j].safe_rank;
                chart_conv_rank.innerText = populationArea[j].conv_rank;
                gu_info_review.innerText = populationArea[j].gu_review;
            }
        }

        updateChart('policeOfficeChart', ['구 평균 파출소', '파출소'], [23, police_office], ['#0b5dd7ac', '#0b5dd7']);
        updateChart('cctvChart', ['구 평균 CCTV', 'CCTV'], [3719, cctv], ['rgba(248, 45, 45, 0.697)', 'rgba(248, 45, 45)']);
        updateChart('arrestChart', ['구 평균 검거율', '검거율'], [72, safe_score], ['rgba(69, 69, 69, 0.719)', 'rgba(69, 69, 69)']);
        updateChart('restaurantChart', ['구 평균 음식점', '음식점'], [4957, restourant], ['rgba(0, 189, 0, 0.687)', 'rgba(0, 189, 0)']);
        updateChart('convStoreChart', ['구 평균 편의점', '편의점'], [341, cvt_store], ['rgba(238, 130, 238, 0.683)', 'rgba(238, 130, 238)']);
        updateChart('cafeChart', ['구 평균 카페', '카페'], [940, cafe], ['rgba(171, 58, 58, 0.669)', 'rgba(171, 58, 58)']);
    }

    // 추천 지역 다시 그리기
    function showMap(data) {
        var rand = [];
        recommendIdx = [];
        clearInterval(polygon_interval);

        polygons.forEach(polygon => {
            polygon.setMap(null);
        })

        polygons = []; //다각형 초기화

        for (var i = 0; i < 3; i++) {
            var num = data[i].gu_id;
            if (rand.indexOf(num) == -1) {
                rand.push(num);
                recommendIdx.push(num);
            }
        }
        mapMatch(rand);
    }

    function mapMatch(rand) {
        var randIdx = 0;
        for (var i = 0; i < areas.length; i++) {
            if (rand.indexOf(i) != -1) {
                displayArea(areas[i], populationArea[i], true);
                randIdx++;
            } else {
                displayArea(areas[i], populationArea[i], false);
            }
        }
        polygon_interval = setInterval(intervalFunc, 500);
    }
}

function intervalFunc() {
    if (polygons[recommendIdx[0]].Eb[0].strokeColor == "none") {
        polygons[recommendIdx[0]].setOptions({ strokeColor: "rgba(255,0,0,1)" });
        polygons[recommendIdx[1]].setOptions({ strokeColor: "rgba(255,0,0,1)" });
        polygons[recommendIdx[2]].setOptions({ strokeColor: "rgba(255,0,0,1)" });
    } else {
        polygons[recommendIdx[0]].setOptions({ strokeColor: "none" });
        polygons[recommendIdx[1]].setOptions({ strokeColor: "none" });
        polygons[recommendIdx[2]].setOptions({ strokeColor: "none" });
    }
}


// 첫번째 추천결과창
function showDetailFirst() {
    document.getElementById("recommend_first").style.display = "none";
    document.getElementById("recommend_first_info").style.display = "block";
}
function hideDetailFirst() {
    document.getElementById("recommend_first").style.display = "block";
    document.getElementById("recommend_first_info").style.display = "none";
}
function showFirstCharterFee() {
    document.getElementById("select_first_charter").style.display = "block";
    document.getElementById("select_first_monthly").style.display = "none";
}
function showFirstMonthlyFee() {
    document.getElementById("select_first_charter").style.display = "none";
    document.getElementById("select_first_monthly").style.display = "block";
}

// 두번째 추천결과창
function showDetailSecond() {
    document.getElementById("recommend_second").style.display = "none";
    document.getElementById("recommend_second_info").style.display = "block";
}
function hideDetailSecond() {
    document.getElementById("recommend_second").style.display = "block";
    document.getElementById("recommend_second_info").style.display = "none";
}
function showSecondCharterFee() {
    document.getElementById("select_second_charter").style.display = "block";
    document.getElementById("select_second_monthly").style.display = "none";
}
function showSecondMonthlyFee() {
    document.getElementById("select_second_charter").style.display = "none";
    document.getElementById("select_second_monthly").style.display = "block";
}

// 세번째 추천결과창
function showDetailThird() {
    document.getElementById("recommend_third").style.display = "none";
    document.getElementById("recommend_third_info").style.display = "block";
}
function hideDetailThird() {
    document.getElementById("recommend_third").style.display = "block";
    document.getElementById("recommend_third_info").style.display = "none";
}
function showThirdCharterFee() {
    document.getElementById("select_third_charter").style.display = "block";
    document.getElementById("select_third_monthly").style.display = "none";
}
function showThirdMonthlyFee() {
    document.getElementById("select_third_charter").style.display = "none";
    document.getElementById("select_third_monthly").style.display = "block";
}


// 상세비교창 띄우기
function showComparison(selMenu) {
    var check_first = document.getElementById("check_first");
    var check_second = document.getElementById("check_second");
    var check_third = document.getElementById("check_third");

    var isChecked = [check_first.checked, check_second.checked, check_third.checked];
    var cnt = 0;

    isChecked.forEach(e => {
        if (e) {
            cnt++;
        }
    });
    var increaseLeft = 100 / cnt;

    //선택된 구 개수에 따라서 그래프
    if (cnt == 0) {
        alert("1개 이상의 구를 선택해주세요");
        return;
    } else if (cnt == 1) {
        $(".graph_bar").each((index, element) => {
            element.style.left = "48.7%";
        });
    } else if (cnt == 2) {
        $(".graph_bar").each((index, element) => {
            element.style.left = "47.5%";
        });
    } else {
        $(".graph_bar").each((index, element) => {
            element.style.left = "46.5%";
        });
    }


    var recommend_first_name = $("#recommend_first_result").text();
    var recommend_second_name = $("#recommend_second_result").text();
    var recommend_third_name = $("#recommend_third_result").text();
    var recommend_names = [recommend_first_name, recommend_second_name, recommend_third_name];

    var orders = ["first", "second", "third"];

    // 체크박스 선택에 따른 동적 화면 변경
    var preLeft = -increaseLeft;
    for (var i = 0; i < 3; i++) {
        var wraps = document.querySelectorAll("." + orders[i] + "_wrap");

        if (isChecked[i]) {
            preLeft += increaseLeft;
            $("." + orders[i] + "_wrap").each((index, div) => {
                div.style.width = increaseLeft + "%";
                div.style.left = preLeft + "%";
                div.style.display = "block";
            });

            $(".label_gu" + (i + 1)).each((index, element) => {
                element.innerText = recommend_names[i];
                element.style.width = "100%";
                element.display = "block";
            });
        } else {
            $("." + orders[i] + "_wrap").each((index, div) => {
                div.style.width = "0%";
                div.style.display = "none";
            });

            $(".label_gu" + (i + 1)).each((index, element) => {
                element.innerText = "";
                element.style.width = "0%";
                element.display = "none";
            });

        }
    }

    var modal = document.querySelector(".modal");
    modal.style.display = "flex";
    modal.style.zIndex = 2;
    selectModal(1);
    initConv(1);
    initSafety(1);
    searchGu("safety", "pollice");
}

function searchGu(selMenu, selContent) {
    var check_first = document.getElementById("check_first");
    var check_second = document.getElementById("check_second");
    var check_third = document.getElementById("check_third");

    var recommend_first_name = $("#recommend_first_result").text();
    var recommend_second_name = $("#recommend_second_result").text();
    var recommend_third_name = $("#recommend_third_result").text();

    for (var i = 0; i < guSpec.length; i++) {
        if (check_first.checked && guSpec[i].name === recommend_first_name) {
            graphInit(guSpec[i], 1, selMenu, selContent);
            continue;
        }
        if (check_second.checked && guSpec[i].name === recommend_second_name) {
            graphInit(guSpec[i], 2, selMenu, selContent);
            continue;
        }
        if (check_third.checked && guSpec[i].name === recommend_third_name) {
            graphInit(guSpec[i], 3, selMenu, selContent);
            continue;
        }
    }
}

function graphInit(spec, num, selMenu, selContent) {
    var selColor = "#000";
    if (selMenu === "safety") {
        if (selContent === "pollice") {
            selColor = "#33BBC5";
            document.getElementById("content_graph_title").innerText = "파출소";
            document.getElementById("content_bar" + num).style.height = spec.polliceOffice + 200 + "px";
            document.getElementById("content_value" + num).innerText = spec.polliceOffice;
        } else if (selContent === "cctv") {
            selColor = "#F6635C";
            document.getElementById("content_graph_title").innerText = "CCTV";
            document.getElementById("content_bar" + num).style.height = spec.cctv / 20 + "px";
            document.getElementById("content_value" + num).innerText = spec.cctv;
        } else {
            selColor = "#85E6C5";
            document.getElementById("content_graph_title").innerText = "검거율";
            document.getElementById("content_bar" + num).style.height = spec.arrest + 200 + "px";
            document.getElementById("content_value" + num).innerText = spec.arrest;
        }
    } else {
        if (selContent === "convStore") {
            selColor = "#CDB2DB";
            document.getElementById("content_graph_title").innerText = "편의점";
            document.getElementById("content_bar" + num).style.height = spec.convenienceStore / 2 + "px";
            document.getElementById("content_value" + num).innerText = spec.convenienceStore;
        } else if (selContent === "restaurant") {
            selColor = "#FFC8DD";
            document.getElementById("content_graph_title").innerText = "음식점";
            document.getElementById("content_bar" + num).style.height = spec.restaurant / 30 + "px";
            document.getElementById("content_value" + num).innerText = spec.restaurant;
        } else if (selContent === "cafe") {
            selColor = "#FFAFCD";
            document.getElementById("content_graph_title").innerText = "카페";
            document.getElementById("content_bar" + num).style.height = spec.cafe / 5 + "px";
            document.getElementById("content_value" + num).innerText = spec.cafe;
        } else if (selContent === "olive") {
            selColor = "#A3D2FF";
            document.getElementById("content_graph_title").innerText = "올리브영";
            document.getElementById("content_bar" + num).style.height = spec.olive * 15 + "px";
            document.getElementById("content_value" + num).innerText = spec.olive;
        } else {
            selColor = "#BCE0FD";
            document.getElementById("content_graph_title").innerText = "다이소";
            document.getElementById("content_bar" + num).style.height = spec.daiso * 20 + "px";
            document.getElementById("content_value" + num).innerText = spec.daiso;
        }
    }
    document.getElementById("content_bar" + num).style.backgroundColor = selColor;
}

/**
 * 인구밀집도 시각화를 위한 임의 데이터 생성 함수
 * @returns [{name, population, idx}]
 */
function initPopulation() {
    var populationArea = [];
    populationArea.push({ name: "강동구", population: 18 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 9, deposit_avg_rank: 6, monthly_avg_rank: 14, conv_rank: 17, safe_rank: 19, congest_rank: 8, gu_review: "집값은 평균선인데\n안전성과 편의성이 다소 낮네.." });
    populationArea.push({ name: "송파구", population: 19 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 3, deposit_avg_rank: 1, monthly_avg_rank: 3, conv_rank: 4, safe_rank: 24, congest_rank: 7, gu_review: "강남 3구답게 높은 집값 + 좋은 편의성\n그러나 안전성은 조금 낮네?" });
    populationArea.push({ name: "강남구", population: 6 * 40000 + 10000, color: "rgba(0,0,255,1)", charter_avg_rank: 2, deposit_avg_rank: 3, monthly_avg_rank: 1, conv_rank: 1, safe_rank: 7, congest_rank: 20, gu_review: "종합적으로 전부 최상위권!\n그러나 집값도 최상위권.." });
    populationArea.push({ name: "서초구", population: 2 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 1, deposit_avg_rank: 2, monthly_avg_rank: 2, conv_rank: 7, safe_rank: 3, congest_rank: 24, gu_review: "전체적으로 살기 굉장히 좋은 동네\n하지만 그만큼 집값도.." });
    populationArea.push({ name: "관악구", population: 13 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 17, deposit_avg_rank: 7, monthly_avg_rank: 21, conv_rank: 10, safe_rank: 18, congest_rank: 13, gu_review: "집값이 너무 괜찮다 여기?!\n그러나 안전성은 보장할 수 없다.." });
    populationArea.push({ name: "동작구", population: 23 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 11, deposit_avg_rank: 10, monthly_avg_rank: 17, conv_rank: 21, safe_rank: 22, congest_rank: 3, gu_review: "가격면에서는 괜찮지만 \n안전성과 편의성이 조금 부족하네.." });
    populationArea.push({ name: "영등포구", population: 12 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 7, deposit_avg_rank: 4, monthly_avg_rank: 9, conv_rank: 5, safe_rank: 11, congest_rank: 14, gu_review: "집값이 다소 높게 형성되어 있지만\n편의시설이 많은 편. 안전성도 not bad!" });
    populationArea.push({ name: "금천구", population: 17 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 16, deposit_avg_rank: 18, monthly_avg_rank: 18, conv_rank: 23, safe_rank: 13, congest_rank: 9, gu_review: "편의성이 중요해! X\n집값이 중요해! O" });
    populationArea.push({ name: "구로구", population: 21 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 22, deposit_avg_rank: 20, monthly_avg_rank: 24, conv_rank: 14, safe_rank: 14, congest_rank: 5, gu_review: "집값 너무 괜찮고 편의 안전 모두 평균!\n그러나 밀집도가 약간 높은것이 함정.." });
    populationArea.push({ name: "강서구", population: 7 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 12, deposit_avg_rank: 12, monthly_avg_rank: 8, conv_rank: 7, safe_rank: 23, congest_rank: 19, gu_review: "집값 평균! 편의성 good! 밀집도 good!\n안전성 (not)good!" });
    populationArea.push({ name: "양천구", population: 25 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 15, deposit_avg_rank: 15, monthly_avg_rank: 22, conv_rank: 24, safe_rank: 25, congest_rank: 1, gu_review: "편의성과 안전성 밀집도 모두 좋지 않은\n점수지만 집값은 괜찮은 동네" });
    populationArea.push({ name: "마포구", population: 10 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 8, deposit_avg_rank: 11, monthly_avg_rank: 5, conv_rank: 1, safe_rank: 9, congest_rank: 16, gu_review: "집값은 살짝 높지만 서울 핫플레이스가\n몰려있는 뛰어난 편의성!" });
    populationArea.push({ name: "서대문구", population: 16 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 18, deposit_avg_rank: 17, monthly_avg_rank: 11, conv_rank: 11, safe_rank: 16, congest_rank: 10, gu_review: "모든 것이 평균이라고 할 수 있죠\n대학거리도 많아서 놀기 좋은 동네!" });
    populationArea.push({ name: "은평구", population: 11 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 21, deposit_avg_rank: 16, monthly_avg_rank: 15, conv_rank: 17, safe_rank: 10, congest_rank: 15, gu_review: "정말 모든 것이 딱 평균!\n집값이 조금 싼편인게 장점?!" });
    populationArea.push({ name: "노원구", population: 8 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 23, deposit_avg_rank: 25, monthly_avg_rank: 25, conv_rank: 21, safe_rank: 15, congest_rank: 18, gu_review: "장점 : 집값이 싸다\n단점 : 집값만 싸다" });
    populationArea.push({ name: "도봉구", population: 9 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 25, deposit_avg_rank: 23, monthly_avg_rank: 16, conv_rank: 25, safe_rank: 17, congest_rank: 17, gu_review: "집값이 엄청 싼 지역이지만\n편의성이 너무 떨어진다.." });
    populationArea.push({ name: "강북구", population: 4 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 24, deposit_avg_rank: 24, monthly_avg_rank: 20, conv_rank: 20, safe_rank: 5, congest_rank: 22, gu_review: "안전성도 괜찮고 집값도 괜찮네\n하지만 편의성이 조금 부족.." });
    populationArea.push({ name: "성북구", population: 15 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 19, deposit_avg_rank: 21, monthly_avg_rank: 19, conv_rank: 16, safe_rank: 6, congest_rank: 11, gu_review: "안전성도 상위권이고 집값도 싸다!\n편의성도 이정도면 괜찮은데..?" });
    populationArea.push({ name: "중랑구", population: 22 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 20, deposit_avg_rank: 5, monthly_avg_rank: 23, conv_rank: 19, safe_rank: 20, congest_rank: 4, gu_review: "집값 싸지만 낮은 편의성과 안전성\n밀집도도 꽤 높다.." });
    populationArea.push({ name: "동대문구", population: 24 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 14, deposit_avg_rank: 22, monthly_avg_rank: 12, conv_rank: 13, safe_rank: 12, congest_rank: 2, gu_review: "집값도 낮고 편의성과 안전성도 평균!\n그러나 인구 밀집도가 높은게 함정.." });
    populationArea.push({ name: "광진구", population: 20 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 10, deposit_avg_rank: 9, monthly_avg_rank: 10, conv_rank: 11, safe_rank: 21, congest_rank: 6, gu_review: "편의성은 다소 높지만 안전성이 낮은 편..\n평균 집값도 만만치 않다" });
    populationArea.push({ name: "성동구", population: 14 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 4, deposit_avg_rank: 13, monthly_avg_rank: 13, conv_rank: 14, safe_rank: 8, congest_rank: 12, gu_review: "모든 수치 평균이상! 하지만\n한강근처이니 집값은 이정도는 뭐.." });
    populationArea.push({ name: "용산구", population: 3 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 6, deposit_avg_rank: 8, monthly_avg_rank: 7, conv_rank: 9, safe_rank: 4, congest_rank: 23, gu_review: "집값이 낮진 않지만 전체적인 벨런스 good\n밀집도도 낮고 밑에는 한강이?!" });
    populationArea.push({ name: "중구", population: 5 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 5, deposit_avg_rank: 14, monthly_avg_rank: 4, conv_rank: 6, safe_rank: 2, congest_rank: 21, gu_review: "편의성과 안전성 모두 최상위권 !\n인구 밀집도도 낮지만 집값이 다소 높은 편.." });
    populationArea.push({ name: "종로구", population: 1 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 13, deposit_avg_rank: 19, monthly_avg_rank: 6, conv_rank: 3, safe_rank: 1, congest_rank: 25, gu_review: "안전 1등 ! 가격도 착한 지역 !\n밀집도도 최하! 위치도 너무 좋다.." });

    var max = populationArea[0].population;
    var min = populationArea[0].population;

    populationArea.forEach(e => {
        var temp = e.population;
        max = temp > max ? temp : max;
        min = temp > min ? min : temp;
    })
    var interval = (max - min) / 7;

    populationArea.forEach(element => {
        if (element.population <= min + (interval * 0)) {
            element.color = "rgba(255, 0, 0, 0.2)";
        } else if (element.population <= min + (interval * 1)) {
            element.color = "rgba(255, 0, 0, 0.275)";
        } else if (element.population <= min + (interval * 2)) {
            element.color = "rgba(255, 0, 0, 0.35)";
        } else if (element.population <= min + (interval * 3)) {
            element.color = "rgba(255, 0, 0, 0.425)";
        } else if (element.population <= min + (interval * 4)) {
            element.color = "rgba(255, 0, 0, 0.5)";
        } else if (element.population <= min + (interval * 5)) {
            element.color = "rgba(255, 0, 0, 0.575)";
        } else {
            element.color = "rgba(255, 0, 0, 0.65)";
        }
    })
    return populationArea;
}