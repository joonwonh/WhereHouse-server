<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.model.dao.*" %>
<%@ page import="com.model.dto.*" %>
<%
	request.setCharacterEncoding("UTF-8");

	String id = request.getParameter("id");
	
	MemberDao dao = MemberDao.getInstance();
	int checkNum = dao.userCheck(id, request.getParameter("pw"));
	
	if(checkNum == -1){
%>
	<script language="javascript">
		alert("아이디가 존재하지 않습니다.");
		history.go(-1);
	</script>
<%
	} else if(checkNum == 0) {
%>
	<script language="javascript">
		alert("비밀번호가 틀립니다");
		history.go(-1);
	</script>
<%
	} else if(checkNum == 1){			// id와 패스워드 모두 동일하면 dto 내 객체 저장.
		MemberDto dto = dao.getMember(id);
			
		if(dto == null) {				
%>
	<script language="javascript">
		alert("존재하지 않는 회원입니다.");
		history.go(-1);
	</script>
<%
		} else {		/* 로그인 성공할 시 dt 내부 데이터를 세션으로 저장  */
			String name = dto.getname();
			String nickname = dto.getnickname();
		
			session.setAttribute("id", id);
			session.setAttribute("name", name);
			session.setAttribute("nickname", nickname);
			session.setAttribute("validMem", "yes");
			response.sendRedirect("loginSuccess.jsp");	/* 준원 추가 코드. */
		}
 }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<title>html 본문 사용하지 않음.</title>
</head>
<body>
</body>
</html>