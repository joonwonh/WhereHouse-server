/**
 * [이재서] 마우스 이벤트
 */
import { marker_toMouseEvent } from "./marker.js";
import { circle_toMouseEvent } from "./circle.js";
import { moveGraph } from "./graph.js";
import { getLength_toMouseEvent } from "./policeOffice.js";
import { getCCTV_toMouseEvent } from "./cctv.js";
import { getArrestRate_toMouseEvent } from "./getAddress.js";
import { saftyScore } from "./score.js";

var saftyWeight = { d : 60,
    c : 30,
    r : 10 };

// 지도에 클릭 이벤트를 등록
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    // 클릭한 위도, 경도 정보
    var latlng = mouseEvent.latLng

    //핀포인트 마커 표시
    marker_toMouseEvent(latlng);

    //500m 서클 표시
    circle_toMouseEvent(latlng);

    // 화면 이동
    map.panTo(latlng);

    //안전성 점수 시각화 그래프
    saftyScore([distFunction, cctvFunction, arrestRateFunction], latlng, (results) => {
        var safty = document.querySelector("#safty");
        var value = results[0]*saftyWeight.d + results[1]*saftyWeight.c + results[2]*saftyWeight.r;

        moveGraph(safty, value);
    });

});

//=======================================================================================================

function distFunction(latlng, callback) {
    //파출소 최단거리를 표시하고 거리식 적용해서 콜백
    getLength_toMouseEvent(latlng, (result) => {
        document.querySelector("#distance").innerHTML = Math.round(result) + ' M';
        var distScore;
        if (result < 1000) { distScore = (1 / Math.log(result + 150))/0.2; }
        else if (result < 1743 && result >= 1000) { distScore = (1 / Math.log(result - 850))/0.5; }
        else { distScore = (1 / Math.log(result - 1700)); }

        callback(distScore)
    })
}

function cctvFunction(latlng, callback) {
    // 반경 500m안 cctv을 표시하고 cctv가 300대 이상이면 만점. 계산된 점수 콜백
    getCCTV_toMouseEvent(latlng, (result) => {
        document.querySelector("#cctvPcs").innerHTML = result + ' 개';
        var cctvScore = Math.min(result/300, 1);

        callback(cctvScore);
    })
}

function arrestRateFunction(latlng, callback) {
    getArrestRate_toMouseEvent(latlng, (result) => {
        $.ajax({
            url : "addr.do",
            type : "get",
            data : {
                'addr' : result
            },
            dataType : "json",
            success : function(result) {
                callback(result.rate);
            }
        
        });

    })
}

