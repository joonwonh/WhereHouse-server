package com.model.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.command.*;
//import com.model.dto.PagenationDto;
import com.model.dto.BDto;

/**
 * Servlet implementation class FrontController
 */
@WebServlet("/ModelController/*")
public class ModelController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		doHandle(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		doHandle(request, response);
	}
	
	public void doHandle(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("actionDo");
		
		request.setCharacterEncoding("UTF-8");
		
		String nextpage = null;
		BCommand command = null;
		
		String uri = request.getRequestURI();
		
		System.out.println("uri : " + uri);
		String conPath = request.getContextPath() + "/ModelController";
		System.out.println("conpath : " + conPath);
		
		String com = uri.substring(conPath.length());
		
		System.out.println("com : " + com);
		
		if(com.equals("/list.do")) {	
			
			command = new BListCommand();
			command.execute(request, response);
			nextpage = "/list.jsp";
		
			
		} else if(com.equals("/write.do")) {
			
			command = new BWriteCommand();
			command.execute(request, response);
			nextpage = "/list.do";				
		
		} else if(com.equals("/content.do")) {	
			
			command = new BContentCommand();
			command.execute(request, response);
			nextpage = "/content_view.jsp";
			
		} else if(com.equals("/modify.do")) {
			
			command = new BModifyCommand();    
			command.execute(request, response);
			nextpage = "/list.do";
			
		} else if(com.equals("/delete.do")){
			
			command = new BDeleteCommand();
			command.execute(request, response);
			nextpage = "/list.do";
			
		} else if(com.equals("/reply_view.do")) {
			
			command = new BReplyViewCommand();
			command.execute(request, response);
			nextpage = "/reply_view.jsp";
			
		} else if (com.equals("/reply.do")) {
			
			command = new BReplyCommand();
			command.execute(request, response);
			
			String bId = (String) request.getAttribute("bId");
			
			nextpage = "content.do?connum="+bId;
		}
		
		RequestDispatcher dispathcer = request.getRequestDispatcher(nextpage);
		dispathcer.forward(request, response);
	}
}
