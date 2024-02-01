<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

   <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
      <% String nickname=(String) session.getAttribute("nickname"); %>
         <!DOCTYPE html>
         <html lang="ko">

         <head>
            <meta http-equiv="Content-Type" charset="text/html;charset=UTF-8">

            <!-- 부트 스트랩 -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
               integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
               crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
               integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
               crossorigin="anonymous"></script>

            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
            <script src="https://kit.fontawesome.com/09b067fdc5.js" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="css/list.css?ver=123">
            <!-- <script src="js/list.js?ver=123"></script> 패널 열고 닫는 버튼 사용하지 않음. -->
            <link href="./css/listTable.css" rel="stylesheet"> <!-- 페이지 리스트 보여주는 테이블 디자인 -->

         </head>

         <body>

            <h1 class="title">WhereHouse 게시판</h1>
            <!-- 게시판 목록 보여주는 화면. -->
            <div class="showlist">
               <table id="boardtable" class="table table-bordered border-dark">
                  <thead>
                     <tr class=" table-primary">
                        <th scope="col">글번호</th>
                        <th scope="col">제목</th>
                        <th scope="col">닉네임</th>
                        <th scope="col">지역구</th>
                        <th scope="col">조회수</th>
                        <th scope="col">날짜</th>
                     </tr>
                  </thead>
                  <tbody>
                     <c:forEach var="dto" items="${list}" varStatus="status">
                        <tr>
                           <td>${dto.contentnum}</td>
                           <td><a href="content.do?connum=${dto.contentnum}">${dto.title}</a></td>
                           <td>${members[status.index].nickname}</td>
                           <td>${dto.region}</td>
                           <td>${dto.hit}</td>
                           <td>${dto.bdate}</td>
                        </tr>
                     </c:forEach>
                  </tbody>
               </table>
               <table>
                  <tr>
                     <td class="writebtn" colspan="5"><a href="writepage.jsp">글 작성</a></td>
                  </tr>
               </table>

               <div class="paginationbtn">
                  <a href="#">&laquo;</a>
                  <a href="#">1</a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">4</a>
                  <a href="#">5</a>
                  <a href="#">6</a>
                  <a href="#">&raquo;</a>
               </div>
            </div>
         </body>

         </html>