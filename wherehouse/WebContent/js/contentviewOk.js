/* 게시글 수정 페이지로 이동 */
function modifyview() {

	/* 로그인한 사용자 계정과 세션 아이디가 일치해야지만 수정 페이지 이동 허용*/
	var writerId = document.querySelector('.writerId').value; 	// 게시글 작성한 사용자 ID 정보
	var sessionId = document.querySelector('.sessionId').value;   // 현재 seesion 내 로그인한 사용자 ID 정보

	if (writerId == sessionId) {		/* 현재 로그인 한 계정과 게시글 작성 사용자가 일치하면 동작 */

		/* 수정 페이지에서 필요한 내용들을 전달해 주어야 한다.
		글 번호
		제목
		닉네임
		게시글 지역
		게시글 날짜
		조회수
		본문 내용
	*/

		var bId = document.querySelector('.bId').value;
		var title = document.querySelector('.title').value;
		// var nickname = document.querySelector('.nickname').value;  		/* 닉네임은 세션에 저장되어 있음*/
		var boardResion = document.querySelector('.regions').value;		/* 게시글 지역 */
		var boardDate = document.querySelector('.bDate').value;			/* 게시글 날짜 */
		var boardHit = document.querySelector('.bHit').value;			/* 조회수 */
		var boardContent = document.querySelector('.boardContent').value;	/* 본문내용 */

		/* 이 내용들을 바로 contentedit로 전달하기. */
		window.location.href = `contentedit.jsp?
			bId=${bId}&title=${title}&
			boardResion=${boardResion}&boardDate=${boardDate}&
			boardDate=${boardDate}&boardHit=${boardHit}&
			boardContent=${boardContent}`;

	} else {						/* 현재 로그인한 계정과 게시글 작성 사용자가 다르면 그냥 경고창만 띄움 */

		alert("현재 사용자는 게시글 작성자와 다릅니다.");
	}
}

function deletecheck() {

	var writerId = document.querySelector('.writerId').value; 	// 게시글 작성한 사용자 ID 정보
	var sessionId = document.querySelector('.sessionId').value;   // 현재 seesion 내 로그인한 사용자 ID 정보

	if (writerId == sessionId) {

		var bId = document.querySelector('.bId').value;

		alert("현재 글을 삭제합니다.");
		window.location.href = `delete.do?bId=${bId}`;

	} else if (writerId != sessionId) {

		alert("현재 사용자와 게시글 작성자가 다르므로 삭제할 수 없습니다.");
		event.preventDefault();
		return;
	}
}

function showlist() {

	alert("전체 글 목록으로 이동합니다.");
	window.location.href = 'list.do';
}

function writereply() {

	var bId = document.querySelector('.bId').value;
	var sessionId = document.querySelector('.sessionId').value;
	var nickname = document.querySelector('.nickname').value;
	var title = document.querySelector('.title').value;
	var replyvalue = document.querySelector('.replyvalue').value;
	var bgroup = document.querySelector('.bgroup').value;
	var bstep = document.querySelector('.bstep').value;
	var bindent = document.querySelector('.bindent').value;


	if (replyvalue == "") {						/* 댓글 입력 창이 공백이라면 게시글 메시지만 띄우기*/

		alert("댓글 작성 내용이 없습니다!!.");

	} else {

		/* db 내 댓글 추가 */
		window.location.href = `reply.do?
			bId=${bId}&sessionId=${sessionId}&
			nickname=${nickname}&nickname=${nickname}&
			title=${title}&replyvalue=${replyvalue}&
			bgroup=${bgroup}&bstep=${bstep}&
			bindent=${bindent}`;

		window.location.href = `content.do?connum=${bId}`;		/* 현재 페이지를 재 요청 */

		alert("댓글이 추가되었습니다.");
	}
}

