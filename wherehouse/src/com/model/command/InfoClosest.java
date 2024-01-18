package com.model.command;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.model.dao.InfoDao;
import com.model.dao.PoliceOfficeDao;
import com.model.dto.PoliceOfficeDto;

public class InfoClosest implements InfoCommand {
private PoliceOfficeDao dao;
	
	public InfoClosest() {
		dao = PoliceOfficeDao.getInstance();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		double latitude = Double.parseDouble(request.getParameter("latitude"));
		double longitude = Double.parseDouble(request.getParameter("longitude"));
		
		PoliceOfficeDto dto = dao.getClosestPO(latitude, longitude);
		
		JsonObject json = new JsonObject();
		
		json.addProperty("address", dto.getAddress());
	    json.addProperty("latitude", dto.getLatitude());
	    json.addProperty("longitude", dto.getLongitude());
		
		try (PrintWriter out = response.getWriter()) {
	        out.print(json);
	        out.flush();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}

}
