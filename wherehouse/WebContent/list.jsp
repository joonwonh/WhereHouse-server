<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String nickname = (String) session.getAttribute("nickname");
%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/09b067fdc5.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/list.css?ver=123">
    <script src="js/list.js?ver=123"></script>
</head>

<body>
    <div id="map">
    </div>

    <div id="information">
        <div id="btn"><span>◀</span></div>

        <!-- 게시판 메인 내용 -->
        <aside id="side-bar">
            <div class="board-info">
                게시판
            </div>

            <div class="board-nickName">
                닉네임 님
            </div>
        </aside>
    </div>
</body>

</html>