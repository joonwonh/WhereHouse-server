package com.model.frontcontroller;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.command.InfoCommand;
import com.model.command.InfoPoliceOffice;
import com.model.command.RecCommand;
import com.model.command.RecService;
import com.model.command.RecServiceMonthly;
import com.model.dao.InfoDao;
import com.model.json.ReadJSON;

/**
 * Servlet implementation class FrontController
 */
@WebServlet("*.do")
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void actionDo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		
		String viewPage = "index.jsp";
		
		String uri = request.getRequestURI();
		String ctx = request.getContextPath();
		String com = uri.substring(ctx.length());
		
		if (com.equals("/policeOffice.do") || com.equals("/dist.do") || com.equals("/cctv.do") || com.equals("/addr.do")) {
			viewPage = "/information"+com;
		}
		else if(com.equals("/charter.do") || com.equals("/monthly.do")) {
			viewPage = "/RecServiceController"+com;
		}
		else if(com.equals("/list.do") || com.equals("/write.do") || com.equals("/reply.do") ||      
	             com.equals("/content.do")|| com.equals("/modify.do") || com.equals("/delete.do")){      

	         viewPage = "/ModelController"+com;
	      }
		

		request.getRequestDispatcher(viewPage).forward(request, response);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		actionDo(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		actionDo(request, response);
	}

}
