package com.model.controller;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.command.*;
import com.model.dao.InfoDao;
import com.model.json.ReadJSON;

/**
 * Servlet implementation class IServiceController
 */
@WebServlet("/information/*")
public class IServiceController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void actionDo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		
		InfoCommand command = null;
		
		String uri = request.getRequestURI();
		String ctx = request.getContextPath() + request.getServletPath();
		String com = uri.substring(ctx.length());
		
		if (com.equals("/policeOffice.do")) {
			command = new InfoPoliceOffice();
		} else if (com.equals("/dist.do")) {
			command = new InfoClosest();
		} else if (com.equals("/cctv.do")) {
			command = new InfoCCTV();
		}
		
		command.execute(request, response);	
	}
	
	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {	
		InfoDao dao = InfoDao.getInstance();
		//������ ȣ��� �� DB�� �����Ͱ� �ִ��� üũ
		if (!dao.checkDB("policeOffice")) {dao.setDBPO(ReadJSON.readGeoJson("C:\\Users\\admin\\git\\WhereHouse2\\wherehouse\\WebContent\\json\\policeOffice.geojson"));}
		if (!dao.checkDB("cctv")) {dao.setDBCCTV(ReadJSON.readJsonArray("C:\\Users\\admin\\git\\WhereHouse2\\wherehouse\\WebContent\\json\\SeoulCCTV.json"));}
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
