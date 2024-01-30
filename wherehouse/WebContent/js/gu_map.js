var guInfo = [];

//카카오맵 커스텀 오버레이
var customOverlay;

window.onload = function () {
    guInfoInit();
    var container = document.getElementById("map");
    var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 8,
        minLevel: 8,
        maxLevel: 8, // 5
        disableDoubleClickZoom: true // 더블 클릭 확대 잠금
    };

    var map = new kakao.maps.Map(container, options);


    // 구 선택에 따른 이벤트
    var selectGu = document.getElementById("gu_select");
    selectGu.addEventListener("change", () => {
        var selected_name = $("#gu_select option:selected").val();
        initInfo(selected_name);
    });

    // json 파싱 및 전처리
    var locate = JSON.parse(JSON.stringify(mapData));
    var feat = locate.features;
    var areas = [];
    feat.forEach(element => {
        var geo = element.geometry;
        var coor = geo.coordinates;
        var name = element.properties.SIG_KOR_NM;
        var path = [];
        coor[0].forEach(point => {
            path.push(new kakao.maps.LatLng(point[1], point[0]));
        });
        var area = { name, path };
        areas.push(area);
    });

    // 구 별 인구 밀집도 데이터 초기화
    var populationArea = initPopulation();

    // 화면에 다각형 생성
    for (var i = 0, len = areas.length; i < len; i++) {
        displayArea(areas[i], populationArea[i]);
    }

    function displayArea(area, population) {
        var polygon = new kakao.maps.Polygon({
            map: map,
            path: area.path,
            strokeWeight: 2,
            strokeColor: population.color,
            strokeOpacity: 0.8,
            fillColor: population.color,
            fillOpacity: 0.7
        });

        kakao.maps.event.addListener(polygon, 'mouseover', function () {
            polygon.setOptions({ strokeWeight: 5, strokeColor: "rgba(255, 0, 0, 1)" });
        });

        kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({ strokeWeight: 2, strokeColor: population.color });
            polygon.setOptions({ fillColor: population.color });
        });

        // 다각형에 click 이벤트를 등록, 이벤트 시 커스텀 오버레이 표시 
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

            for (var i = 0; i < selectGu.options.length; i++) {
                if (selectGu.options[i].value === population.name) {
                    selectGu.options[i].selected = true;
                    initInfo(selectGu.options[i].value);
                    break;
                }
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

    // 패널 열고 닫기
    var info = document.querySelector("#information");
    var func = document.querySelector("#btn");

    func.addEventListener("click", panelFunc);

    function panelFunc() {
        if (info.style.left == "0px") {
            info.style.left = "-333px";
            func.innerText = "▶";
        } else {
            info.style.left = "0px";
            func.innerText = "◀";
        }
    }

    // 전세/월세 라디오 버튼 선택
    var rentalType = document.querySelectorAll("input[name='rentalType']");
    rentalType.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            var current = e.currentTarget;
            if (current.getAttribute("id") === "btn_charter") {
                document.getElementById("select_need").style.height = "17%";
                document.getElementById("average-charter").style.display = "block";
                document.getElementById("average-monthly").style.display = "none";
                document.getElementById("hotPlace_wrap").style.top = "51%";
            } else {
                document.getElementById("select_need").style.height = "21%";
                document.getElementById("average-charter").style.display = "none";
                document.getElementById("average-monthly").style.display = "block";
                document.getElementById("hotPlace_wrap").style.top = "55%";
            }
        })
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
}

/**
 * 커스텀 오버레이 정보창 닫기
 */
function infoClose() {
    customOverlay.setMap(null);
}

/**
 * 지역구 선택 및 변경 시 정보를 다시 뿌려주는 함수
 */
function initInfo(selected_name) {
    if (customOverlay != null) {
        infoClose();
    }
    var div_score = document.getElementById("average-score");
    var div_hPlace = document.getElementById("hotPlace_wrap");
    var select_need = document.getElementById("select_need");

    var charter_fee = document.getElementById("charter-deposit-fee");
    var deposit_fee = document.getElementById("monthly-deposit-fee");
    var monthly_fee = document.getElementById("monthly-month-fee");

    // 전세/월세 가격 표시
    
    for (var i = 0; i < guInfo.length; i++) {
        if (guInfo[i].name === selected_name) {
            charter_fee.innerText = guInfo[i].charter;
            deposit_fee.innerText = guInfo[i].deposit;
            monthly_fee.innerText = guInfo[i].monthly;
        }
    }
    if (selected_name === "default") {
        div_score.style.display = "none";
        div_hPlace.style.display = "none";
        select_need.style.display = "none";
    } else {
        div_score.style.display = "block";
        div_hPlace.style.display = "block";
        select_need.style.display = "block";

        //그래프 그리기
        var safety_barChart = document.getElementById("safety_barChart");
        var conv_barChart = document.getElementById("convenience_barChart");

        for (var i = 0; i < guInfo.length; i++) {
            if (guInfo[i].name === selected_name) {
                document.getElementById("safety_value").innerText = guInfo[i].safe_score;
                document.getElementById("convenience_value").innerText = guInfo[i].conv_score;
                safety_barChart.style.height = guInfo[i].safe_score + "px";
                conv_barChart.style.height = guInfo[i].conv_score + "px";
            }
        }
    }

    var imgPath = "images/hotPlace/" + selected_name;

    for (var i = 0; i < guInfo.length; i++) {
        if (guInfo[i].name === selected_name) {
            for (var j = 1; j <= 3; j++) {
                document.getElementById("carousel-img" + j).src = imgPath + "/img" + j + ".jpg";
                document.getElementById("carousel-caption" + j).innerText = guInfo[i].place_name[j - 1];
            }
            break;
        }
    }
}


/**
 * 인구밀집도 시각화를 위한 임의 데이터 생성 함수
 * @returns [{name, population, idx}]
 */
function initPopulation() {
    var populationArea = [];
    populationArea.push({ name: "강동구", population: 18 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 11, deposit_avg_rank: 6, monthly_avg_rank: 14, conv_rank: 17, safe_rank: 19, congest_rank: 8 });
    populationArea.push({ name: "송파구", population: 19 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 8, deposit_avg_rank: 1, monthly_avg_rank: 3, conv_rank: 2, safe_rank: 24, congest_rank: 7 });
    populationArea.push({ name: "강남구", population: 6 * 40000 + 10000, color: "rgba(0,0,255,1)", charter_avg_rank: 2, deposit_avg_rank: 3, monthly_avg_rank: 1, conv_rank: 1, safe_rank: 7, congest_rank: 20 });
    populationArea.push({ name: "서초구", population: 2 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 1, deposit_avg_rank: 2, monthly_avg_rank: 2, conv_rank: 7, safe_rank: 3, congest_rank: 24 });
    populationArea.push({ name: "관악구", population: 13 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 13, deposit_avg_rank: 7, monthly_avg_rank: 21, conv_rank: 14, safe_rank: 18, congest_rank: 13 });
    populationArea.push({ name: "동작구", population: 23 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 10, deposit_avg_rank: 10, monthly_avg_rank: 17, conv_rank: 11, safe_rank: 22, congest_rank: 3 });
    populationArea.push({ name: "영등포구", population: 12 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 4, deposit_avg_rank: 4, monthly_avg_rank: 9, conv_rank: 5, safe_rank: 11, congest_rank: 14 });
    populationArea.push({ name: "금천구", population: 17 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 17, deposit_avg_rank: 18, monthly_avg_rank: 18, conv_rank: 21, safe_rank: 13, congest_rank: 9 });
    populationArea.push({ name: "구로구", population: 21 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 20, deposit_avg_rank: 20, monthly_avg_rank: 24, conv_rank: 12, safe_rank: 14, congest_rank: 5 });
    populationArea.push({ name: "강서구", population: 7 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 12, deposit_avg_rank: 12, monthly_avg_rank: 8, conv_rank: 6, safe_rank: 23, congest_rank: 19 });
    populationArea.push({ name: "양천구", population: 25 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 16, deposit_avg_rank: 15, monthly_avg_rank: 22, conv_rank: 23, safe_rank: 25, congest_rank: 1 });
    populationArea.push({ name: "마포구", population: 10 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 9, deposit_avg_rank: 11, monthly_avg_rank: 5, conv_rank: 4, safe_rank: 9, congest_rank: 16 });
    populationArea.push({ name: "서대문구", population: 16 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 21, deposit_avg_rank: 17, monthly_avg_rank: 11, conv_rank: 20, safe_rank: 16, congest_rank: 10 });
    populationArea.push({ name: "은평구", population: 11 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 19, deposit_avg_rank: 16, monthly_avg_rank: 15, conv_rank: 18, safe_rank: 10, congest_rank: 15 });
    populationArea.push({ name: "노원구", population: 8 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 25, deposit_avg_rank: 25, monthly_avg_rank: 25, conv_rank: 19, safe_rank: 15, congest_rank: 18 });
    populationArea.push({ name: "도봉구", population: 9 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 22, deposit_avg_rank: 23, monthly_avg_rank: 16, conv_rank: 25, safe_rank: 17, congest_rank: 17 });
    populationArea.push({ name: "강북구", population: 4 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 24, deposit_avg_rank: 24, monthly_avg_rank: 20, conv_rank: 24, safe_rank: 5, congest_rank: 22 });
    populationArea.push({ name: "성북구", population: 15 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 18, deposit_avg_rank: 21, monthly_avg_rank: 19, conv_rank: 15, safe_rank: 6, congest_rank: 11 });
    populationArea.push({ name: "중랑구", population: 22 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 15, deposit_avg_rank: 5, monthly_avg_rank: 23, conv_rank: 22, safe_rank: 20, congest_rank: 4 });
    populationArea.push({ name: "동대문구", population: 24 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 14, deposit_avg_rank: 22, monthly_avg_rank: 12, conv_rank: 9, safe_rank: 12, congest_rank: 2 });
    populationArea.push({ name: "광진구", population: 20 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 3, deposit_avg_rank: 9, monthly_avg_rank: 10, conv_rank: 10, safe_rank: 21, congest_rank: 6 });
    populationArea.push({ name: "성동구", population: 14 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 5, deposit_avg_rank: 13, monthly_avg_rank: 13, conv_rank: 13, safe_rank: 8, congest_rank: 12 });
    populationArea.push({ name: "용산구", population: 3 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 6, deposit_avg_rank: 8, monthly_avg_rank: 7, conv_rank: 16, safe_rank: 4, congest_rank: 23 });
    populationArea.push({ name: "중구", population: 5 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 7, deposit_avg_rank: 14, monthly_avg_rank: 4, conv_rank: 3, safe_rank: 2, congest_rank: 21 });
    populationArea.push({ name: "종로구", population: 1 * 40000 + 10000, color: "rgba(0,0,0,0)", charter_avg_rank: 23, deposit_avg_rank: 19, monthly_avg_rank: 6, conv_rank: 8, safe_rank: 1, congest_rank: 25 });

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

//핫플레이스 캐러셀 데이터 초기화
function guInfoInit() {
    guInfo.push({ name: "강동구", place_name: ["천호동 로데오거리", "성내동 카페거리", "성내동 강풀만화거리"], charter: 6767, deposit: 3254, monthly: 43, safe_score: 69, conv_score: 43 });
    guInfo.push({ name: "송파구", place_name: ["롯데월드 타워", "송리단길", "석촌호수"], charter: 7734, deposit: 4302, monthly: 55, safe_score: 65, conv_score: 81 });
    guInfo.push({ name: "강남구", place_name: ["압구정동 로데오거리", "강남역 먹자골목", "코엑스 별마당 도서관"], charter: 9421, deposit: 3751, monthly: 69, safe_score: 74, conv_score: 90 });
    guInfo.push({ name: "서초구", place_name: ["세빛섬", "예술의 전당", "양재천 카페거리"], charter: 9435, deposit: 4205, monthly: 58, safe_score: 80, conv_score: 58 });
    guInfo.push({ name: "관악구", place_name: ["관악 별빛신사리", "낙성대 공원", "샤로수길"], charter: 5804, deposit: 3242, monthly: 39, safe_score: 69, conv_score: 45 });
    guInfo.push({ name: "동작구", place_name: ["노량진 수산시장", "보라매공원", "신대방삼거리역 거리"], charter: 6415, deposit: 2826, monthly: 41, safe_score: 67, conv_score: 47 });
    guInfo.push({ name: "영등포구", place_name: ["타임스퀘어", "여의도 한강공원", "더 현대 서울"], charter: 7198, deposit: 3451, monthly: 47, safe_score: 72, conv_score: 71 });
    guInfo.push({ name: "금천구", place_name: ["호암산 숲길 공원", "가산 인크 커피", "금빛 공원"], charter: 6067, deposit: 2277, monthly: 41, safe_score: 71, conv_score: 36 });
    guInfo.push({ name: "구로구", place_name: ["항동 푸른수목원", "구로 깔깔거리", "고척스카이돔"], charter: 4988, deposit: 2172, monthly: 38, safe_score: 70, conv_score: 46 });
    guInfo.push({ name: "강서구", place_name: ["서울 식물원", "강서구청 먹자골목", "국립 항공 박물관"], charter: 6313, deposit: 2733, monthly: 49, safe_score: 66, conv_score: 66 });
    guInfo.push({ name: "양천구", place_name: ["서서울 호수공원", "목동 로데오거리", "신정네거리역 거리"], charter: 6099, deposit: 2443, monthly: 39, safe_score: 64, conv_score: 34 });
    guInfo.push({ name: "마포구", place_name: ["망원 한강공원", "합정 메세나폴리스", "홍대거리"], charter: 7162, deposit: 2752, monthly: 53, safe_score: 73, conv_score: 77 });
    guInfo.push({ name: "서대문구", place_name: ["연희동거리", "신촌동거리", "디지털 미디어 시티"], charter: 5799, deposit: 2300, monthly: 47, safe_score: 70, conv_score: 37 });
    guInfo.push({ name: "은평구", place_name: ["연신내 로데오거리", "불광천", "은평 한옥마을"], charter: 5240, deposit: 2349, monthly: 43, safe_score: 73, conv_score: 40 });
    guInfo.push({ name: "노원구", place_name: ["노원역 문화의 거리 ", "노원 불빛 정원", "공릉동 국수거리"], charter: 4607, deposit: 1487, monthly: 37, safe_score: 70, conv_score: 38 });
    guInfo.push({ name: "도봉구", place_name: ["쌍문역 쌍리단길", "창동역 포차거리", "서울 창포원"], charter: 4176, deposit: 1835, monthly: 42, safe_score: 70, conv_score: 23 });
    guInfo.push({ name: "강북구", place_name: ["수유리 먹자골목", "강북구청 앞 거리", "우이천"], charter: 4255, deposit: 1512, monthly: 40, safe_score: 76, conv_score: 30 });
    guInfo.push({ name: "성북구", place_name: ["성신여대 로데오거리", "석계역 포장마차", "성북천"], charter: 5506, deposit: 2059, monthly: 40, safe_score: 75, conv_score: 44 });
    guInfo.push({ name: "중랑구", place_name: ["면목동 면리단길", "중랑천 벚꽃길", "상봉동 먹자골목"], charter: 5372, deposit: 3449, monthly: 38, safe_score: 69, conv_score: 36 });
    guInfo.push({ name: "동대문구", place_name: ["청량리 먹자골목", "회기역 파전골목", "청량리 통닭골목"], charter: 6184, deposit: 1865, monthly: 47, safe_score: 71, conv_score: 54 });
    guInfo.push({ name: "광진구", place_name: ["뚝섬 한강공원", "건대 맛의거리", "어린이대공원"], charter: 6727, deposit: 2858, monthly: 47, safe_score: 67, conv_score: 48 });
    guInfo.push({ name: "성동구", place_name: ["서울숲", "뚝섬 한강공원", "마장동 먹자골목"], charter: 7449, deposit: 2657, monthly: 46, safe_score: 74, conv_score: 45 });
    guInfo.push({ name: "용산구", place_name: ["한남동 카페거리", "이태원 거리", "남산서울타워"], charter: 7219, deposit: 2917, monthly: 50, safe_score: 79, conv_score: 43 });
    guInfo.push({ name: "중구", place_name: ["명동거리", "신당 포차거리", "을지로 골목"], charter: 7277, deposit: 2452, monthly: 54, safe_score: 86, conv_score: 79 });
    guInfo.push({ name: "종로구", place_name: ["경복궁", "인사동", "혜화 대학로"], charter: 6266, deposit: 2193, monthly: 51, safe_score: 93, conv_score: 56 });
}