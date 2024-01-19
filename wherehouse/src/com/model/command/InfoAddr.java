package com.model.command;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.model.dao.AddrDao;
import com.model.dao.CCTVDao;
import com.model.dto.CCTVDto;

public class InfoAddr implements InfoCommand {
	private AddrDao dao;
	
	public InfoAddr() {
		dao = AddrDao.getInstance();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		String addr = (String)request.getParameter("addr");
		
		JsonObject json = dao.getArrestRate(addr);
		
		try (PrintWriter out = response.getWriter()) {
	        out.print(json);
	        out.flush();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}

}
