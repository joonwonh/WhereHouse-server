<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.model.dto.*" %>
<%@ page import="com.model.dao.*" %>

<%
	request.setCharacterEncoding("UTF-8");
%>
<jsp:useBean id="dto" class="com.model.dto.MemberDto"/>
<jsp:setProperty name="dto" property="*"/>

<%
	MemberDao dao = MemberDao.getInstance();
	
	dto.setid(request.getParameter("id"));
	dto.setpw(request.getParameter("pw"));
	dto.setnickname(request.getParameter("nickname"));
	dto.setname(request.getParameter("name"));
	dto.settel(request.getParameter("tel"));
	dto.setemail(request.getParameter("email"));

	if(dao.confirmId(dto.getid()) == 1){	// 여기서 결과 값이 0이라면 정상적으로 db 내 해당 id에 대한 사용자가 없다는 의미.
%>
	<script langauage="javascript">
		alert("아이디가 이미 존재 합니다.");
		
		document.location.href = "login.jsp";
	</script>
<%
	} else {	
		
		int ri = dao.insertMember(dto);		// 데이터를 집어 넣고 반환 값으로 1이 나오면 잘 된것.
		if(ri == 1){
%>
		<script language="javascript">
			alert("회원가입이 정상적으로 되었습니다.");
			document.location.href = "login.jsp";
		</script>
<%
		} else {
			
%>
		<script language="javascript">
			alert("회원가입에 실패 했습니다.");
			document.location.href = "login.jsp";
		</script>		
<%
		}
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