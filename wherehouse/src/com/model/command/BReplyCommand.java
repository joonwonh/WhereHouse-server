package com.model.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.model.dao.BDao;
import com.model.dto.BDto;


public class BReplyCommand implements BCommand{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		BDao bdao = new BDao();
		
		HttpSession session = request.getSession();
		
		int connum = Integer.parseInt(request.getParameter("bId"));		/* 현재 댓글 쓰는 게시판 글 id */
		String userid = (String) request.getParameter("sessionId"); 	/* 현재 로그인 아이디 */
		String nickname = (String) session.getAttribute("nickname");
		String title = request.getParameter("title");
		String bconent = request.getParameter("replyvalue");
		int bgroup = Integer.parseInt(request.getParameter("bgroup"));
		int bstep = Integer.parseInt(request.getParameter("bstep"));
		int bindent = Integer.parseInt(request.getParameter("bindent"));
		
		request.setAttribute("bId", String.valueOf(connum));
		
		bdao.reply(connum, userid, nickname , title, bconent, bgroup, bstep, bindent);
	}
}