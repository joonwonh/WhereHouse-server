package com.model.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.dao.BDao;
import com.model.dto.BDto;

public class BDeleteCommand implements BCommand{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		BDao dao = new BDao();
		
		int bId = Integer.parseInt(request.getParameter("bId"));
		System.out.println("bId : " + bId);
		dao.delete(bId);
	}

}
