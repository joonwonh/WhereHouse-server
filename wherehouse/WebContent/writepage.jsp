<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>

		<meta http-equiv="Content-Type" charset="text/html;charset=UTF-8">
		<script language="JavaScript" src="./js/writedo.js"></script>
		<title>Insert title here</title>

	</head>

	<body>
		<table border="1" class="writetbl">
			<form action="write.do" name="writefrm" method="post">
				<input type="hidden" name="id" value="${sessionScope.id}">

				<tr>
					<td>이름</td>
					<td>${sessionScope.name}</td>
				</tr>

				<tr>
					<td>제목</td>
					<td><textarea name="title" class="title" rows="1" cols="50"></textarea></td>
				</tr>
				<tr>
					<td>
						<label for="regions">지역 선택하세요 </label>
					</td>
					<td>
						<select name="regions" class="regions">
							<option value="선택 지역 없음">지역구를 선택해주세요</option>
							<option value="강남구">강남구</option>
							<option value="강동구">강동구</option>
							<option value="강북구">강북구</option>
							<option value="강서구">강서구</option>
							<option value="관악구">관악구</option>
							<option value="광진구">광진구</option>
							<option value="구로구">구로구</option>
							<option value="금천구">금천구</option>
							<option value="노원구">노원구</option>
							<option value="도봉구">도봉구</option>
							<option value="동대문구">동대문구</option>
							<option value="동작구">동작구</option>
							<option value="마포구">마포구</option>
							<option value="서대문구">서대문구</option>
							<option value="서초구">서초구</option>
							<option value="성동구">성동구</option>
							<option value="성북구">성북구</option>
							<option value="송파구">송파구</option>
							<option value="양천구">양천구</option>
							<option value="영등포구">영등포구</option>
							<option value="용산구">용산구</option>
							<option value="은평구">은평구</option>
							<option value="종로구">종로구</option>
							<option value="중구">중구</option>
							<option value="중랑구">중랑구</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>내용</td>
					<td><textarea name="bcontent" class="bcontent" rows="8" cols="50"></textarea></td>
				</tr>
				<tr>
					<td colspan="2"><input type="button" onclick="writedo()" value="입력">&nbsp;&nbsp;<a href="list.do">목록보기</a></td>
				</tr>
			</form>
		</table>
	</body>

	</html>