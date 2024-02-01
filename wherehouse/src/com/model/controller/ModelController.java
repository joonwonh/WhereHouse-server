package com.model.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.command.*;
import com.model.dto.PagenationDto;

/**
 * Servlet implementation class FrontController
 */
@WebServlet("/ModelController/*")
public class ModelController extends HttpServlet {
	private static final long serialVersionUID = 1L;

//	@Override
//	public void init() {
//		
//		/* 초기 값으로 전체 테이블 리스트를 페이지 네이션으로 조회할 수 있도록 함, 이후 게시글 수정 및 삭제,  */
//		BoardListCommand Blc = BoardListCommand.getInstance();
//		Blc.LoadBoardList();
//		
//		PagenationDto pdto = new PagenationDto();
//	}
	
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
			
			command = new BListCommand_rename();
			command.execute(request, response);
			nextpage = "/list.jsp";
		
			
		} else if(com.equals("/write.do")) {	//write.do2
			
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
			
		} else if(com.equals("/reply_view.do")) {		/* 현재는 안 씀, content_view.jsp 페이지에서 댓글 사용하기 때문  */
			
			command = new BReplyViewCommand();
			command.execute(request, response);
			nextpage = "/reply_view.jsp";
			
		} else if (com.equals("/reply.do")) {
			
			command = new BReplyCommand();
			command.execute(request, response);
			
			String bId = (String) request.getAttribute("bId");
			
			nextpage = "content.do?connum="+bId;
		}
		
		System.out.println("nextpage : " + nextpage);
		
		RequestDispatcher dispathcer = request.getRequestDispatcher(nextpage);
		dispathcer.forward(request, response);
	}
}
