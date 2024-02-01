package com.model.command;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.dao.BDao;
import com.model.dao.MemberDao;
import com.model.dto.BDto;
import com.model.dto.CommnetDto;
import com.model.dto.MemberDto;

public class BListCommand implements BCommand{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		
		BDao bdao = new BDao();
		MemberDao mdao = MemberDao.getInstance();
		
		ArrayList<BDto> btos = bdao.list();							/* 게시판 글 목록 전체 내용 가져오기. */
		ArrayList<MemberDto> mtos = new ArrayList<MemberDto>(); 	/* 가져온 게시글에 해당하는 사용자의 닉네임을 가져오기 위한 arraylist  */
		
		
		/* 모든 게시글 번호를 가지고 각 게시글을 쓴 사용자를 검색하여 저장 후 list.jsp에 띄우기 위함 */
		for(BDto bto : btos) {
	
			mtos.add(mdao.getMember(bto.getuserid()));
		}
				
		 /* list 페이지에서 테이블 목록 보여주는 용도 */
		request.setAttribute("list", btos);
		
		/* list 페이지에서 닉네임 띄우기 위한 용도 */
		request.setAttribute("members", mtos);
		
		
	}
}