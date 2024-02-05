function writepage() {

    var Nickname = document.querySelector(".nickname").value;

    if (Nickname != 'null') {

        alert("글 작성 페이지로 이동합니다.");
        window.location.href = "writepage.jsp"

    } else {
        alert("글 작성은 로그인한 회원만 가능합니다.");
    }
}