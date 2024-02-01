package com.model.command;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.dao.BDao;
import com.model.dao.MemberDao;
import com.model.dto.BDto;
import com.model.dto.CommnetDto;
import com.model.dto.MemberDto;

public class BContentCommand implements BCommand{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		int connum = Integer.parseInt(request.getParameter("connum"));
		request.setAttribute("bId", String.valueOf(connum));
		
		BDao dao = new BDao();	
		dao.upHit(connum);
		
		/* 게시판 정보 가져오기 */
		BDto bdto = dao.contentView(connum);			
		request.setAttribute("content_view", bdto);						// 게시글 테이블 "whereboard" 내용 Dto
		
		/* connum(게시글 번호)를 기준으로 모든 댓글 중 해당 게시글에 포함된 댓글들을 가져오기. */
		ArrayList<CommnetDto> comments = dao.listcomments(connum);		// 게시판(whereboard) 글 번호, 이 번호를 사용하여 commenttbl의 "NUM"(게시판 외래키)로 검색
		request.setAttribute("comments", comments);						// 게시글 ArrayList 가져오기
	
		/* 사용자 닉네임을 보여주기 위해서 bdto의 userid를 가지고 membertbl을 조회 */
		MemberDao Mdao = MemberDao.getInstance();
		MemberDto Mdto = Mdao.getMember(bdto.getuserid());
		
		request.setAttribute("mdto", Mdto);
	}
}
