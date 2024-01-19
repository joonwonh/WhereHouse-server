<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
	integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
	crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- 카카오맵 API 키 세팅 -->
    <script type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4c3c68c349cd485fe2feeb1800479027&libraries=services,drawing"></script>
    <!-- 이모티콘 용 -->
    <script src="https://kit.fontawesome.com/eafa49c7a2.js" crossorigin="anonymous"></script>
    <!--  <script src="./json/mapData.json" type="text/javascript"></script>  -->

    <link rel="stylesheet" href="./css/information.css">
<title>상세 페이지</title>
</head>
<body>
	<div id="map" style="width:1832px; height:945px;"></div>
    <div id="information">
        <div id="btn">◀</div>
        <div id="infoPanel"></div>
        <div id="detail">
            <ul class="address">
                <li id="addr">지도를 클릭 해 주세요.</li>
                <li class="detailAddr" style="margin-top: 12px;">도로명 : -<br>지번 : -</li>
            </ul>
            <ul class="detailInfo">
                <li id="cctv">
                    <div>CCTV 수 :</div>
                    <div id="cctvPcs" style="text-align: right;">- 개</div>
                </li>
                <li id="policeOffice">
                    <div>가까운 파출소 :</div>
                    <div id="distance" style="text-align: right;">- M</div>
                </li>
                <li id="amenity">
                    <div style="margin: 0 auto; width: 90%; line-height: 150%; font-size: 1.3rem;">인근 편의시설</div>
                    <div class="each" id="each1" style="color: #3a80e9;">-</div>
                    <div class="each" id="each2" style="color: #3a80e9;">-</div>
                    <div class="each" id="each3" style="color: #3a80e9;">-</div>
                    <div class="each" id="each4" style="color: #3a80e9;">-</div>
                    <div class="each" id="each5" style="color: #3a80e9;">-</div>
                </li>
                <li id="pinImgs">
                    <img src="./images/pin_icon.png" alt="">
                    <img src="./images/pin_icon.png" alt="">
                    <img src="./images/pin_icon.png" alt="">
                    <img src="./images/pin_icon.png" alt="">
                    <img src="./images/pin_icon.png" alt="">
                </li>
                <div class="tip" style="bottom: 0; right: 6px; bottom: 3px;">*반경 500m 범위의 정보입니다.</div>
            </ul>
        </div>
        <div id="section">
            <div id="sectionName">종합 점수</div>
            <ul id="view">
                <li id="tag">
                    <div style="margin-top: 6px;">종합</div>
                    <div>안전성</div>
                    <div>편의성</div>
                </li>
                <li id="graph">
                    <div id="total" class="graphBar" style="margin-top: 7px;"></div>
                    <div id="safty" class="graphBar"></div>
                    <div id="conv" class="graphBar"></div>
                </li>
                <div id="infoDiv">
                    <div id="infoDivDetail">이모티콘</div>
                    <div id="infoDivScore">그래프 점수</div>
                </div>
            </ul>
            <div class="option">
                <div class="check_wrap">
                    <label for="check_btn"><span>인구 밀집 선호</span></label>
                    <input type="checkbox" id="check_btn" />
                </div>
                <div class="dropdown">선호 유형
                    <select id="preference">
                        <option value="none" selected>-</option>
                        <option value="safty">안전</option>
                        <option value="conv">편의</option>
                    </select>
                </div>
            </div>
            <ul id="link">
            </ul>
        </div>
        <footer>
            <img src="./images/home_icon.png" alt="" style="width: 110px;">
            <div class="tip" style="font-size: 0.64rem;">마포구 신촌로 176 / 마포구 대흥동 12-20 / 전화번호 : 02-313-1711</div>
        </footer>
    </div>
    
    <script src="./js/map.js"></script>
    <script src="./js/panel.js"></script>
    <script type="module" src="./js/marker.js"></script>
    <script type="module" src="./js/circle.js"></script>
    <script type="module" src="./js/policeOffice.js"></script>
    <script type="module" src="./js/cctv.js"></script>
    <script type="module" src="./js/score.js"></script>
    <script type="module" src="./js/mouseEvent.js"></script>
</body>
</html>