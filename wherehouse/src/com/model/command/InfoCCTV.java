package com.model.command;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.model.dao.CCTVDao;
import com.model.dto.CCTVDto;

public class InfoCCTV implements InfoCommand {
	private CCTVDao dao;
	
	public InfoCCTV() {
		dao = CCTVDao.getInstance();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		double latitude = Double.parseDouble(request.getParameter("latitude"));
		double longitude = Double.parseDouble(request.getParameter("longitude"));
		
		JsonArray jsonArray = dao.getListCCTV(latitude, longitude);
		
		try (PrintWriter out = response.getWriter()) {
	        out.print(jsonArray);
	        out.flush();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}

}
