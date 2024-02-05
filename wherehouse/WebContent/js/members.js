//정범진
function updateInfoConfirm(){
	
	if(document.reg_frm.pw.value== ""){
		
		alert("비밀번호를 입력하세요");
		document.reg_frm.pw.focus();
		return;
	}
	
	if(document.reg_frm.pw.value != document.reg_frm.pw_check.value){
		
		alert("비밀번호가 일치하지 않습니다.");
		document.reg_frm.pw.focus();
		return;
	}
	
	if(document.reg_frm.nickname.value == ""){
		
		alert("닉네임을 입력하지 않았습니다.");
		document.reg_frm.nickname.focus();
		return;
	}
	
	if(document.reg_frm.tel.value == ""){
		
		alert("전화번호를 입력하지 않았습니다.");
		document.reg_frm.tel.focus();
		return;
	}
	
	if(document.reg_frm.email.value == ""){
		
		alert("이메일을 입력하지 않았습니다.");
		document.reg_frm.email.focus();
		return;
	}
	
	document.reg_frm.submit();
}

function infoConfirm(){		// 회원 가입.
	
	if(document.reg_frm.pw_check.value == ""){
		
		alert("패스워드를 입력하세요");
		document.reg_frm.pw.focus();
		return;
	}
	
	if(document.reg_frm.pw_check.value != document.reg_frm.pw_check.value){
		
		alert("비밀번호가 일치하지 않습니다");
		document.reg_frm.pw.focus();
		return;
	}
	
	if(document.reg_frm.nickname.length == 0){
		
		alert("닉네임은 필수 입니다.");
		document.reg_frm.nickname.focus();
		return;
	}
		
	if(document.reg_frm.tel.length == 0){
		
		alert("전화번호는 필수 입니다.");
		document.reg_frm.tel.focus();
		return;
	}
	
	if(document.reg_frm.email.length == 0){
		alert("이메일은 필수입니다");
		document.reg_frm.email.focus();
		return;
	}
	
	document.reg_frm.submit();
}