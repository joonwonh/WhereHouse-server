package com.model.controller;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.command.RecCommand;
import com.model.command.RecService;
import com.model.command.RecServiceMonthly;

@WebServlet("/RecServiceController/*")
public class RecServiceController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Override
	public void init() throws ServletException {

		System.out.println("init");
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		actionDo(request,response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		actionDo(request,response);
	}

	private void actionDo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("actiondo����");
        request.setCharacterEncoding("UTF-8");

		String uri = request.getRequestURI();
		String ctx = request.getContextPath();
		String com = uri.substring(ctx.length());
		
		System.out.println(com);
        
		if(com.equals("/RecServiceController/charter"))	{
			 System.out.println("controller chrater start");
        RecCommand command = new RecService();
        command.execute(request, response);
        System.out.println("controller chrater start");
		}
		if(com.equals("/RecServiceController/monthly"))	{
			System.out.println("controller monthly start");
	        RecCommand command = new RecServiceMonthly();
	        command.execute(request, response);
	        System.out.println("controller monthly start");
			}
	}	
}
