package com.model.command;

import java.util.ArrayList;
import java.util.HashMap;

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
		
		/* 1. 클라이언트 측 파라메터(pnIndex) 가 null 이면 그냥 게시판 최초 요청으로 판단하여 Dao가 게시판 내용을 조회 후 일부분을 페이지 네이션으로써
		 * 		반환할 때에 1번째 항목부터 10개만 반환.
		 * 2.  클라이언트 측 파라메터(pnIndex) 가 null이 아니면 Dao가 게시판 내용을 조회 후 해당 인덱스 위치(pnindex*10) 위치부터 10개 반한하는데,
		 * 		이때  마지막 페이지여서 10개가 안되는데 10개를 참고하게 되면 nullPointeException이 발생할 수 있으므로 확인 작업으로 Dao 내 
		 * 		if()를 사용하여 마지막 페이지 일 시 해당 인덱스 위치(pnindexx*10) 부터 마지막 항목(전체 select 크기)에 한해서 반복문 돌려서 작업한다.
		*/
		
		int pnindex = 0;
		
		/* 입력받은 페이지 네이션 목적 별 인덱스 값을 설정할 시 + 9 필요. */
		if(request.getParameter("pnindex") == null)	
			pnindex = 0;
		else {
			pnindex = Integer.parseInt(request.getParameter("pnindex"));
			pnindex = pnindex * 10;
		}
		BDao bdao = new BDao();
		MemberDao mdao = MemberDao.getInstance();
		
		HashMap<String, Object> daoresult = bdao.list(pnindex);				/* 게시판 글 목록에서 사용자가 지정한 페이지 네이션 위치 값을 기준으로 가져오며
		 																	전체 페이지 네이션 개수 가져오기 가져오기. */
		ArrayList<BDto> btos = null;
		
		if(daoresult.get("list") instanceof ArrayList<?>) {
			btos = (ArrayList<BDto>) daoresult.get("list");
		}
		
		int pnSize = (Integer) daoresult.get("pnSize");
		
		ArrayList<MemberDto> mtos = new ArrayList<MemberDto>(); 		/* 가져온 게시글에 해당하는 사용자의 닉네임을 가져오기 위한 arraylist  */
		
		
		/* 모든 게시글 번호를 가지고 각 게시글을 쓴 사용자를 검색하여 저장 후 list.jsp에 띄우기 위함 */
		for(BDto bto : btos) {
	
			mtos.add(mdao.getMember(bto.getuserid()));
		}
		
	
		
		 /* list 페이지에서 테이블 목록 보여주는 용도 */
		request.setAttribute("list", btos);
		
		/* list 페이지에서 닉네임 띄우기 위한 용도 */
		request.setAttribute("members", mtos);
		
		/* list 페이지에서 페이지 네이션을 위한 총 페이지 개수를 파악하여 페이지 네이션 이동 버튼 만들기 위함. */
		request.setAttribute("pnSize", pnSize);
	}
}