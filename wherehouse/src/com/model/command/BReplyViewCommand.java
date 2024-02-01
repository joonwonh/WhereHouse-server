package com.model.command;
import com.model.dao.BDao;
import com.model.dto.BDto;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.dao.BDao;
import com.model.dto.BDto;

public class BReplyViewCommand implements BCommand{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		int connum = Integer.parseInt(request.getParameter("connum"));
		
		BDao dao = new BDao();
		BDto dto = dao.reply_view(connum);
		
		request.setAttribute("reply_view", dto);
	}	
}