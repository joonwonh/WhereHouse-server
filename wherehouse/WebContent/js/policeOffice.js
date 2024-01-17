/**
 * [이재서] 파출소 호출
 */
var policeOffice = [];

$.ajax({
	url : "policeOffice.do",
	type : "get",
	dataType : "json",
	success : function(result) {
		for (var i = 0; i < result.length; i++) {
			// 마커 이미지의 이미지 주소
			var imageSrc = "./imgs/police_office_icon.png";
			// 마커 이미지의 이미지 크기
			var imageSize = new kakao.maps.Size(52, 52);
			// 마커 이미지를 생성
			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
			// 마커를 생성
			var marker = new kakao.maps.Marker({
				map : map, // 마커를 표시할 지도
				position : new kakao.maps.LatLng(result[i].latitude,
							result[i].latitude), // 마커를 표시할 위치
				title : result[i].address, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
				image : markerImage, // 마커 이미지
				opacity : 0.9, // 마커 투명도
				zIndex : 1
			});

			policeOffice.push(marker);
		}
	}
});
