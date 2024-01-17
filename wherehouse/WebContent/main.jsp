<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhereHouse</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="icon" href="images/home_icon.png">
    <script src="js/main.js"></script>
</head>
<body>
    <nav>
        <div id="menu">
            <div id="menu_home">
                <div id="menu_home_icon">
                    <img src="images/home_icon.png" alt="">
                </div>
                <hr id="menu_division">
            </div>

            <div id="menu_suggest">
                <div id="menu_suggest_icon">
                    <img src="images/suggest_icon.png" alt="">
                </div>
                <div class="menu_txt">
                    거주지 추천
                </div>
            </div>
            <div id="menu_gu">
                <div id="menu_gu_icon">
                    <img src="images/gu_icon.png" alt="">
                </div>
                <div class="menu_txt">
                    지역구 지도
                </div>
            </div>
            <div id="menu_detail">
                <div id="menu_detail_icon">
                    <img src="images/detail_icon.png" alt="">
                </div>
                <div class="menu_txt">
                    상세 지도
                </div>
            </div>
        </div>
    </nav>
    <section>
        <iframe src="" frameborder="0" id="iframe_section"></iframe>
    </section>
</body>
</html>