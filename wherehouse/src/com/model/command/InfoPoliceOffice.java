package com.model.command;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.model.dao.InfoDao;
import com.model.dto.PoliceOfficeDto;

public class InfoPoliceOffice implements InfoCommand {
	private InfoDao dao;
	
	public InfoPoliceOffice() {
		dao = InfoDao.getInstance();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		JsonArray jsonArray = new JsonArray();
		
		ArrayList<PoliceOfficeDto> dtos = new ArrayList<PoliceOfficeDto>();
		dtos = dao.getListPO();
		
		for (PoliceOfficeDto dto : dao.getListPO()) {
		    JsonObject json = new JsonObject();
		    json.addProperty("address", dto.getAddress());
		    json.addProperty("latitude", dto.getLatitude());
		    json.addProperty("longitude", dto.getLongitude());
		    
		    jsonArray.add(json);
		}
		
		try (PrintWriter out = response.getWriter()) {
	        out.print(jsonArray.toString());
	        out.flush();
	    } catch (IOException e) {
	        e.printStackTrace(); // 에러 처리 로직 추가
	    }
	}

}
