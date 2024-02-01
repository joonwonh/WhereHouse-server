package com.model.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.dao.BDao;
import com.model.dto.BDto;

/* �Խ��� �۾��� */
public class BWriteCommand implements BCommand{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		BDao bdao = new BDao();
		BDto bdto = new BDto();
		
		HttpSession sessionobj = request.getSession();
		
		bdto.setuserid((String) sessionobj.getAttribute("id"));
		bdto.settitle(request.getParameter("title"));
		bdto.setbcontent(request.getParameter("bcontent"));
		bdto.setregion(request.getParameter("regions"));
		
		bdao.Write(bdto);
	}
}
