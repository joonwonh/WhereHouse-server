package com.model.command;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
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

		double longitude = Double.parseDouble(request.getParameter("longitude"));
		
		JsonArray jsonArray = new JsonArray();
		
		for (CCTVDto dto : dao.getListCCTV(longitude)) {
		    JsonObject json = new JsonObject();
		    json.addProperty("address", dto.getAddress());
		    json.addProperty("latitude", dto.getLatitude());
		    json.addProperty("longitude", dto.getLongitude());
		    json.addProperty("cameraCount", dto.getCameraCount());
		    json.addProperty("numbers", dto.getNumbers());
		    
		    jsonArray.add(json);
		}
		
		try (PrintWriter out = response.getWriter()) {
	        out.print(jsonArray);
	        out.flush();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}

}
