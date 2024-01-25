<%@ page import="com.model.dao.*" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
 %>
 
<jsp:useBean id="dto" class="com.model.dto.MemberDto"/>
<jsp:setProperty name="dto" property="*"/>

<%
	String id = (String)session.getAttribute("id");
	dto.setid(id);
	dto.setpw((String)request.getParameter("pw"));
	dto.setnickname((String) request.getParameter("nickname"));
	dto.settel((String) request.getParameter("tel"));
	dto.setemail((String) request.getParameter("email"));

	MemberDao dao = MemberDao.getInstance();
	int ri = dao.updateMember(dto);
	
	if(ri == 1){
%>
	
	<script language="javascript">
		alert("정보 수정되었습니다.");
		document.location.href="loginSuccess.jsp"
	</script>
<%
	} else {
%>
	<script language="javascript">
		alert("정보 수정 실패입니다.");
		history.go(-1);
	</script>
<%
	}
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>