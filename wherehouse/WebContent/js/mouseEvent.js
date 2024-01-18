/**
 * [이재서] 마우스 이벤트
 */
import { marker_toMouseEvent } from "./marker.js";
import { circle_toMouseEvent } from "./circle.js";
import { getLength_toMouseEvent } from "./policeOffice.js";

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

    // 파출소 최단 거리
    var closest;
    getLength_toMouseEvent(latlng, function (callback) {
        closest = callback;
        document.querySelector("#distance").innerHTML = Math.round(closest) + ' M';
    });

    searchAddrFromCoords(latlng, displayInfo);
    searchDetailAddrFromCoords(latlng, displayDetailInfo);

});

// =====================================================================================================
// 주소 - 좌표 변환 객체
var geocoder = new kakao.maps.services.Geocoder();

// 좌표의 행정동 주소 정보 요청 함수
function searchAddrFromCoords(coords, callback) {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
}

// 좌표의 법정동 상세 주소 정보 요청 함수
function searchDetailAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도의 간략한 주소를 표출하는 함수
function displayInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.querySelector("#addr");

        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
            }
        } 
    }
}

// 지도의 상세 주소를 표출하는 함수
function displayDetailInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.querySelector(".detailAddr");

        infoDiv.innerHTML = !! result[0].road_address ? "도로명 : " + result[0].road_address.address_name +
                                                        "<br>지번 : " + result[0].address.address_name
                                                        :
                                                        "도로명 : -<br>지번  : -";
    }
}