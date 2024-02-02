package com.model.command;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.dao.BDao;
import com.model.dao.MemberDao;
import com.model.dto.BDto;
import com.model.dto.CommnetDto;
import com.model.dto.MemberDto;

public class BListCommand_temp implements BCommand{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		BoardListCommand_temp Blc = BoardListCommand_temp.getInstance();
		
		ArrayList <BDto> btos;
		ArrayList <MemberDto> mtos;
		/* 매개변수 pindex 가 null 이라면 새로운 게시판 요청이라 판단, pnindex을 1로 설정 하여 주며 전체 페이지 네이션 길이 주기
		 * 	(페이지 ) */
		if(request.getParameter("pnindex") == null) {
			
			int pnSize = Blc.pnSize;		// 초기 요청이니 전체 페이지 네이션 크기을 알려주고 클라이언트는 이를 받으면 버튼 갯수 정해서 만든다.
			int pnindex = 0;				// 초기 게시판 요청이니 페이지 네이션 위치도 0로 설정.
			
			btos = Blc.BDtos(pnindex);
			mtos = Blc.NickNames(pnindex);
			
			request.setAttribute("pnSize", pnSize);
			
		} else {
			
			int pnindex = Integer.parseInt(request.getParameter("pnindex"));
			
			btos = Blc.BDtos(pnindex);
			mtos = Blc.NickNames(pnindex);
		}

		
		 /* list 페이지에서 테이블 목록 보여주는 용도 */
		request.setAttribute("list", btos);
		
		/* list 페이지에서 닉네임 띄우기 위한 용도 */
		request.setAttribute("members", mtos);
	}
}