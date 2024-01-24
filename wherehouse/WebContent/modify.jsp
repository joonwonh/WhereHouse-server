<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.model.dao.*" %>
<%@ page import="com.model.dto.*" %>
<%
	request.setCharacterEncoding("UTF-8");
	
	String id = (String)session.getAttribute("id");
	MemberDao dao = MemberDao.getInstance();
	MemberDto dto = dao.getMember(id);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0.1 Tansitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script language="JavaScript" src="members.js"></script>
</head>
<body>
	<form action="modifyOk.jsp" method="post" name="reg_frm">
		아이디 : <%= dto.getid() %> <br />
		비밀번호 : <input type="password" name="pw" size=20><br/>
		비밀번호 확인 : <input type="password" name="pw_check" size="20"><br/>
		닉네임 : <input type="text" name="nickname" value="<%= dto.getnickname() %>"><br/>
		전화번호 : <input type="text" name="tel" size="40" value="<%= dto.gettel() %>"><br/>
		메일 : <input type="text" name="email" size="40" value="<%= dto.getemail() %>"><br/>
		<input type="button" value="수정" onclick="updateInfoConfirm()">&nbsp;&nbsp;<input type="reset" value="취소" onclick="javascript:window.location='login.jsp'">
	</form>
</body>
</html>