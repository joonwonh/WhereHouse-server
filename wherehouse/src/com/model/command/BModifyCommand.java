package com.model.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.model.dao.BDao;
import com.model.dto.BDto;

public class BModifyCommand implements BCommand{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		String bId = request.getParameter("bId");			// 게시판 Id
		String title = request.getParameter("title");		// 게시판 글 제목
		String region = request.getParameter("regions");	// 게시판 내용 중 "지역 선택"
		String content = request.getParameter("bcontent");
	
		BDao bdao = new BDao();
		bdao.modify(bId, title, content, region);
	}
}
