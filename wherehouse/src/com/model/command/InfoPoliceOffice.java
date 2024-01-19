package com.model.command;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.model.dao.PoliceOfficeDao;
import com.model.dto.PoliceOfficeDto;

public class InfoPoliceOffice implements InfoCommand {
	private PoliceOfficeDao dao;
	
	public InfoPoliceOffice() {
		dao = PoliceOfficeDao.getInstance();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		long startTime = System.currentTimeMillis();
		System.out.println("시작!");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		JsonArray jsonArray = dao.getListPO();
		
		try (PrintWriter out = response.getWriter()) {
	        out.print(jsonArray);
	        out.flush();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
		System.out.println("걸린시간 : "+(System.currentTimeMillis()-startTime)+"ms");
	}

}
