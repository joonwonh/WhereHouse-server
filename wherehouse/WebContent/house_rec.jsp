<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script src="json/mapData.json" type="text/javascript"></script>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d24dfa7488d79e7f12995de4945ddcfa">
    </script>
    <script src="https://kit.fontawesome.com/09b067fdc5.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/house_rec.css">
    <link rel="stylesheet" href="css//rec_graph.css">
    <link rel="stylesheet" href="css/gu_main_map.css">
    <link rel="stylesheet" href="css/rec_info.css">
    <link rel="stylesheet" href="css/comp_modal.css">
    <script src="js/house_rec.js"></script>
</head>
<body>
    <div id="map">
    </div>

    <!-- 상세 비교 모달 창 -->
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-header">
                <div class="modal-title">
                    상세 비교
                    <button type="button" class="btn-close" id="modalCloseBtn">x</button>
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-content">
                    <div class="modal-select">
                        <button type="button" id="btn_safety">생활 안전</button>
                        <button type="button" id="btn_convenience">생활 편의</button>
                    </div>
                    <div class="modal-select-content" id="modal-select-safety">
                        <button type="button" id="pollice_content_btn">파출소</button>
                        <button type="button" id="cctv_content_btn">CCTV</button>
                        <button type="button" id="arrest_content_btn">검거율</button>
                    </div>
                    <div class="modal-select-content" id="modal-select-conv">
                        <button type="button" id="convStore_content_btn">편의점</button>
                        <button type="button" id="restaurant_content_btn">음식점</button>
                        <button type="button" id="cafe_content_btn">카페</button>
                        <button type="button" id="olive_content_btn">올리브영</button>
                        <button type="button" id="daiso_content_btn">다이소</button>
                    </div>
                    <div id="modal-graph-wrap">
                        <div id="content_graph_container" class="container-graph">

                            <div id="content_graph_title" class="bar_title">편의점 수</div>
                            <div class="container_content_graph">
                                <div class="content_graph_wrap first_wrap" id="content_graph_gu1">
                                    <div class="content_graph">
                                        <div id="content_bar1" class="content_bar graph_bar">
                                            <div id="content_value1" class="graph_value"></div>
                                        </div>
                                    </div>
                                    <div class="label_gu1"></div>
                                </div>
                                <div class="content_graph_wrap second_wrap" id="content_graph_gu2">
                                    <div class="content_graph">
                                        <div id="content_bar2" class="content_bar graph_bar">
                                            <div id="content_value2" class="graph_value"></div>
                                        </div>
                                    </div>
                                    <div class="label_gu2"></div>
                                </div>
                                <div class="content_graph_wrap third_wrap" id="content_graph_gu3">
                                    <div class="content_graph">
                                        <div id="content_bar3" class="content_bar graph_bar">
                                            <div id="content_value3" class="graph_value"></div>
                                        </div>
                                    </div>
                                    <div class="label_gu3"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <!-- 상세 비교 모달 창 끝 -->

    <div id="information">
        <div id="btn">◀</div>
        <aside id="side-bar">
            <!-- 사용자 입력창 -->
            <div id="user-input">
                <div class="house_recommend">
                    거주지 추천
                </div>
                <div class="select_need">
                    <p>전세 / 월세</p>
                    <hr class="gu_name_hr" id="char_month_hr">
                    <div class="btn-group check_need" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" name="rentalType" class="btn-check" id="btn_charter" autocomplete="off">
                        <label for="btn_charter" class="btn btn-outline-primary">전세</label>
                        <div style="width: 40px;"></div>
                        <input type="radio" name="rentalType" class="btn-check" id="btn_monthly" autocomplete="off"
                            checked>
                        <label for="btn_monthly" class="btn btn-outline-primary">월세</label>
                    </div>
                    <div id="rentInput">
                        <!-- 전세를 선택한 경우 -->
                        <div id="charterInput">
                            <div>
                                전세금(최대):
                                <input type="text" name="charterDeposit" placeholder="" class="inputPrice"> 만원
                            </div>
                        </div>

                        <!-- 월세를 선택한 경우 -->
                        <div id="monthlyInput">
                            <div>
                                보증금(최대):
                                <input type="text" name="monthlyDeposit" placeholder="" class="inputPrice"> 만원
                            </div>
                            <div>
                                월세금(최대):
                                <input type="text" name="monthlyMonth" placeholder="" class="inputPrice"> 만원
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 치안 편의 선택창 -->
                <div class="safety_convenience">
                    <p style="margin: 0;">생활 안전 / 편의</p>
                    <hr class="gu_name_hr">
                    <div class="slider">
                        안전
                        <input type="range" min="0" max="9" value="0" id="myRange_safety"> <span id="safety_f"> 0
                            단계</span>
                    </div>
                    <div class="slider">
                        편의
                        <input type="range" min="0" max="9" value="0" id="myRange_convenience"> <span
                            id="convenience_f"> 0 단계</span>
                    </div>
                    <div id="descript">
                        <div id="descript_safety"></div>
                        <div id="descript_convenience"></div>
                    </div>
                </div>

                <!-- 추천 결과 확인 -->
                <div id="recommend_result">
                    <div id="recommend_result_btn" onclick="showResult()">
                        <input type="button" disabled>
                        추천 결과 확인
                    </div>
                </div>
            </div>
            <div id="recommend_result_page">
                <div class="house_recommend">
                    거주지 추천
                </div>
                <div id="recommend_result_title">
                    <p onclick="showRecommend()">◀</p> 거주지 추천 결과
                </div>
                <div id="recommend_first">
                    <div class="recommend_inner_text">
                        <div class="rec_result_div">
                            1. <span id="recommend_first_result">ex1</span>
                        </div>
                        <input type="checkbox" name="first" value="first" id="check_first">
                        <span id="recommend_first_btn" onclick="showDetailFirst()">▼</span>
                    </div>
                </div>
                <div id="recommend_first_info">
                    <div class="recommend_inner_text">
                        <div class="rec_result_div">
                            1. <span id="recommend_first_result_detail">ex1</span>
                        </div>
                        <input type="checkbox" name="first" value="first" id="check_first_info">
                        <span id="recommend_first_btn" onclick="hideDetailFirst()">▲</span>
                    </div>
                    <hr class="gu_name_hr">
                    <div id="select_first_charter" class="select_price">
                        평균 전세금 : <span id="first_charter_fee" class="average_money">ex</span> 만원
                    </div>
                    <div id="select_first_monthly" class="select_price">
                        평균 보증금 : <span id="first_deposit_fee" class="average_money">ex</span> 만원<br>
                        평균 월세금 : <span id="first_monthly_fee" class="average_money">ex</span> 만원
                    </div>
                    <hr class="price_hr">
                    <div class="result_graph_wrap">
                        <div class="safety_wrap">
                            <div class="result_label_safety">생활 안전</div>
                            <div id="safety_first_graph" class="result_safety_graph">
                            </div>
                            <span id="safety_first_value">&nbsp 4</span>
                        </div>
                        <div class="conv_wrap">
                            <div class="result_label_conv">생활 편의</div>
                            <div id="conv_first_graph" class="result_conv_graph">
                            </div><span id="conv_first_value">&nbsp 2</span>
                        </div>
                    </div>
                </div>


                <div id="recommend_second">
                    <div class="recommend_inner_text">
                        <div class="rec_result_div">
                            2. <span id="recommend_second_result">ex2</span>
                        </div>
                        <input type="checkbox" name="second" value="second" id="check_second">
                        <span id="recommend_second_btn" onclick="showDetailSecond()">▼</span>
                    </div>
                </div>
                <div id="recommend_second_info">
                    <div class="recommend_inner_text">
                        <div class="rec_result_div">
                            2. <span id="recommend_second_result_detail">ex2</span>
                        </div>
                        <input type="checkbox" name="second" value="second" id="check_second_info">
                        <span id="recommend_second_btn" onclick="hideDetailSecond()">▲</span>
                    </div>
                    <hr class="gu_name_hr">
                    <div id="select_second_charter" class="select_price">
                        평균 전세금 : <span id="second_charter_fee" class="average_money">ex</span> 만원
                    </div>
                    <div id="select_second_monthly" class="select_price">
                        평균 보증금 : <span id="second_deposit_fee" class="average_money">ex</span> 만원<br>
                        평균 월세금 : <span id="second_monthly_fee" class="average_money">ex</span> 만원
                    </div>
                    <hr class="price_hr">
                    <div class="result_graph_wrap">
                        <div class="safety_wrap">
                            <div class="result_label_safety">생활 안전</div>
                            <div id="safety_second_graph" class="result_safety_graph">
                            </div>
                            <span id="safety_second_value">&nbsp 4</span>
                        </div>
                        <div class="conv_wrap">
                            <div class="result_label_conv">생활 편의</div>
                            <div id="conv_second_graph" class="result_conv_graph">
                            </div><span id="conv_second_value">&nbsp 2</span>
                        </div>
                    </div>
                </div>

                <div id="recommend_third">
                    <div class="recommend_inner_text">
                        <div class="rec_result_div">
                            3. <span id="recommend_third_result">ex3</span>
                        </div>
                        <input type="checkbox" name="third" value="third" id="check_third">
                        <span id="recommend_third_btn" onclick="showDetailThird()">▼</span>
                    </div>
                </div>
                <div id="recommend_third_info">
                    <div class="recommend_inner_text">
                        <div class="rec_result_div">
                            3. <span id="recommend_third_result_detail">ex3</span>
                        </div>
                        <input type="checkbox" name="third" value="third" id="check_third_info">
                        <span id="recommend_third_btn" onclick="hideDetailThird()">▲</span>
                    </div>
                    <hr class="gu_name_hr">
                    <div id="select_third_charter" class="select_price">
                        평균 전세금 : <span id="third_charter_fee" class="average_money">ex</span> 만원
                    </div>
                    <div id="select_third_monthly" class="select_price">
                        평균 보증금 : <span id="third_deposit_fee" class="average_money">ex</span> 만원<br>
                        평균 월세금 : <span id="third_monthly_fee" class="average_money">ex</span> 만원
                    </div>
                    <hr class="price_hr">
                    <div class="result_graph_wrap">
                        <div class="safety_wrap">
                            <div class="result_label_safety">생활 안전</div>
                            <div id="safety_third_graph" class="result_safety_graph">
                            </div>
                            <span id="safety_third_value">&nbsp 4</span>
                        </div>
                        <div class="conv_wrap">
                            <div class="result_label_conv">생활 편의</div>
                            <div id="conv_third_graph" class="result_conv_graph">
                            </div><span id="conv_third_value">&nbsp 2</span>
                        </div>
                    </div>
                </div>

                <div id="recommend_comparison">
                    <div id="recommend_comparison_btn" onclick="showComparison()">
                        <input type="button" id="compBtn">
                        상세 비교
                    </div>
                </div>
            </div>
            <!-- <div id="logo-img"><img src="/images/home_icon.png" alt=""></div> -->
        </aside>
    </div>
    <div id="population-shame-bar">
        <div id="population-shame-text">인구 밀집도 수치</div>
        <div id="population-shame-btn">-</div>
    </div>
    <div id="population-shame-info">
        <div id="population-shame-num">
            <div id="population-shame-num-0">0</div>
            <div id="population-shame-num-7">7</div>
        </div>
        <div id="population-shame-graph">
            <div id="population-shame-graph-1"></div>
            <div id="population-shame-graph-2"></div>
            <div id="population-shame-graph-3"></div>
            <div id="population-shame-graph-4"></div>
            <div id="population-shame-graph-5"></div>
            <div id="population-shame-graph-6"></div>
            <div id="population-shame-graph-7"></div>
        </div>
    </div>
</body>
</html>