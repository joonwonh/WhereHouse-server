<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

		<% String sessionId=(String) session.getAttribute("id"); String sessionNickname=(String)
			session.getAttribute("nickname"); %>

			<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
			<html>

			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
				<title>게시글 수정 페이지</title>
				<script language="JavaScript" src="./js/Contentview.js"></script>
				<link href="./css/contentView.css" rel="stylesheet">
			</head>

			<body>
				<h1 class="maintitle">Where House 게시글</h1>
				<form action="modify.do" name="modifyform" class="modifyform" method="post">

					<!-- sessionId와 writeId는 수정 버튼 클릭 시 "Contentview.js" 파일에서 "modifycheck()" 함수 통해 게시글 사용자와 현재 로그인
						사용자가 동일한지 확인하기 위한 값. -->
					<input type="hidden" name="sessionId" class="sessionId" value="<%=sessionId %>"> <!-- 현재 로그인 ID -->
					<input type="hidden" name="writerId" class="writerId" value="${content_view.userid}">
					<!-- 게시글 작성 ID -->

					<!-- 화면 하단 페이지 삭제 버튼 눌를시 form 태그 통해 BDeleteCommand.java 로 전달되어 삭제 진행 하기 위한 input tage. -->
					<input type="hidden" name="bId" class="bId" value="${content_view.contentnum}">

					<!-- 댓글 작성 위한 input tag들 -->
					<input type="hidden" name="nickname" class="nickname" value="<%=sessionNickname %>">
					<!-- 현재 댓글 쓸 로그인 사용자의 nickname -->
					<input type="hidden" name="bgroup" class="bgroup" value="${content_view.bgroup}">
					<input type="hidden" name="bstep" class="bstep" value="${content_view.bstep}">
					<input type="hidden" name="bindent" class="bindent" value="${content_view.bindent}">

					<!-- [header 부분]
						1. headerTitle : 게시글 제목(title) 영역 부분
						2. headerbody : 작성자 닉네임, 게시글 지역, 게시글 조회수, 게시글 날짜. 영역 부분 -->

					<div class="header">

						<!-- 1. 게시글 제목 : 게시글 제목 -->
						<div class="headerTitle">
							<textarea name="title" class="title" value="${content_view.title}"
								readonly>${content_view.title}</textarea>
						</div>

						<!-- 2. 작성자 닉네임, 게시글 지역, 게시글 조회수, 게시글 날짜. -->
						<div class="headerbody">

							<!-- 작성자 닉네임 -->
							<div class="boardUser">
								<span>작성자 닉네임 </span><span class="nickname">${mdto.nickname}</span>
							</div>
							<!-- 게시글 지역 작성 내용 -->
							<div class="boardResion">
								<span>게시글 지역 </span><span name="regions" class="regions"
									value="${content_view.region}">${content_view.region}</span>
							</div>

							<!-- 게시글 날짜 -->
							<div class="boardDate">
								<span>게시글 날짜 </span>
								<input class="bDate" type="hidden" value="${content_view.bdate}"
									readonly>${content_view.bdate}</input>
							</div>
							<!-- 게시글 조회수 -->
							<div class="boardHit">
								<span>조회수 </span>
								<input class="bHit" type="hidden" value="${content_view.hit}"
									readonly>${content_view.hit}</input>
							</div>
						</div>
					</div>

					<!-- 게시글 본문 들어가는 부분-->
					<div class="boardContent">
						<textarea rows="10" cols="54" name="bcontent" class="bcontent"
							readonly>${content_view.bcontent}</textarea></td>
					</div>

					<!-- 댓글 작성되는 부분 -->
					<textarea rows="4" cols="54" name="replyvalue" class="replyvalue"></textarea></td>

					<h3 class="commenttitle">댓글 목록</h3>

					<!-- 게시글 댓글 목록 보이는 테이블 부분 -->
					<table class="commnetTbl" border="1">
						<tr class="showtitle">
							<td>작성자</td>
							<td>작성 내용</td>
						</tr>
						<c:forEach var="comments" items="${comments}">
							<tr class="showcomment">

								<td class="commentUser">${comments.nickname}</td>
								<td class="commentContent">${comments.content}</td>
							</tr>
						</c:forEach>
					</table>


					<!-- <button value="글 수정하기" type="button" class="editbutton" style="width:100px; heigth:50px;"
						onclick="modifycheck()">글 수정하기</button> 현재 sessionId와 게시글 작성 id를 비교하여 일치 해야지만 수정 허용 -->
					<button value="글 페이지로 이동하기" type="button" class="editbutton" style="width:100px; heigth:50px;"
						onclick="modifyview()">글 수정페이지 이동</button>
					<button value="해당 글 삭제하기" type="button" class="deletebutton" style="width:100px; heigth:50px;"
						onclick="deletecheck()">글 삭제하기</button> <!-- 현재 sessionId와 게시글 작성 id를 비교하여 일치 해야지만 삭제 -->
					<button value="전체 글 목록 보기" type="button" class="listbutton" style="width:100px; heigth:50px;"
						onclick="showlist()">전체 글 보기</button> <!-- list.do 요청 -->
					<button value="댓글 작성하기" type="button" class="replybutton" style="width:100px; heigth:50px;"
						onclick="writereply()">댓글 작성하기</button> <!-- reply.do 요청 -->

				</form>
			</body>

			</html>