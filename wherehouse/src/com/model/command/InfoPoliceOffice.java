package com.model.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.dao.InfoDao;

public class InfoPoliceOffice implements InfoCommand {
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		InfoDao dao = InfoDao.getInstance();
	}

}
