package com.model.command;

import java.util.ArrayList;

import com.model.dao.BDao;
import com.model.dao.MemberDao;
import com.model.dto.BDto;
import com.model.dto.MemberDto;

public class BoardListCommand_temp {
	
	private static final int Object = 0;

	public BoardListCommand_temp() {};
	
	private static BoardListCommand_temp instance = new BoardListCommand_temp();		
	
	public int pnSize = 0;		// BListCommand 통한 요청 받을 시 사용자 브라우저 내 전체 버튼 갯수를 만들기 위한 페이지 네이션 전체 길이.
	public int pgCount = 10;	// 전체 페이지 네이션 중 각각의 페이지 네이션 내 포함되는 게시글 최대 갯수.
	
	public ArrayList<Object> BoardAll = null;
	public ArrayList<Object> NicknameAll = null;
	
	public static BoardListCommand_temp getInstance() {
		return instance;
	}
	
	public void LoadBoardList() {	/* 테이블 전체 내용을 가져오는  함수, 페이지 네이션을 위한 데이터 셋 설정. */
		
		BDao bdao = new BDao();
		ArrayList<BDto> btos = bdao.list();											/* 게시판 글 목록 전체 내용 가져오기. */
		
		MemberDao mdao = MemberDao.getInstance();
		
		ArrayList<MemberDto> mtos = new ArrayList<MemberDto>(); 	/* 가져온 게시글에 해당하는 사용자의 닉네임을 가져오기 위한 arryList  */
		
		/* 모든 게시글 번호를 가지고 각 게시글을 쓴 사용자를 검색하여 저장 후 list.jsp에 띄우기 위함 */
		for(BDto bto : btos) {
	
			mtos.add(mdao.getMember(bto.getuserid()));
		}
		
		/* list 페이지에서 테이블 목록 보여주는 용도 */
		// request.setAttribute("list", btos);
		
		/* list 페이지에서 닉네임 띄우기 위한 용도 */
		//request.setAttribute("members", mtos);
		
		/* == 페이지 네이션 위한 본 작업 == */
		BoardAll = pgNation(btos);		// 게시판 페이지에 대한 페이지 네이션 구성한 결과물
		NicknameAll = nnNation(mtos);		// 게시판 각각의 목록에 대해 동일한 위치로 매칭되어 검색 가능하도록 설정.
		pnSize = BoardAll.size();		// 페이지 네이션 전체 크기 파악, LoadBoardList 함수 실행 하면  사용자 브라우저에서는 전체 페이지 네이션 항목을 만들 목적.
		
		/* 이후 사용자가 페이지를 브라우저 내 js로 요청하면 요청 시마다  BListCommand 통해 "ListSerach" 함수 실행하여 페이지 가져오기 */
	}
	
	
	/* 모든 게시판 목록을 페이지 네이션의 각 페이지 수 별로 나누어져 제공할 수 있도록 작업. */
	public ArrayList<Object> pgNation(ArrayList<BDto> btos) {
		
		/* 전체 게시글 페이지 개수 파악(페이지 네이션 할 게시글 수) */
		int pnCount = (int) Math.ceil(btos.size() / pgCount);
		
		
		/* 각 페이지 네이션 별로 저장한 페이지(PgObject)를 전체로 저장하는 ArrayList */
		ArrayList<Object> BoardAll = new ArrayList<Object>();	// 전체 게시글의 각 페이지네이션  페이지을 모두 담아두기 위한 ArrayList
		
		int index = 0;							// btos 의 첫번째 위치부터 마지막 위치까지 찾는 첨자
		
		for(int i = 0; i< pnCount; i++) {		/* 전체 페이지 네이션 할 횟수 만큼 반복 */
			
			ArrayList<BDto> PgObject = null;
			
			for(int i2 = 0; i2 < pgCount && index < pgCount ; i++) {	// 하나의 ArrayList, 즉 하나의 게시판 페이지 당 pgCount 의 게시글 포함. 
				
				PgObject.add(btos.get(index));
			}
			BoardAll.add(PgObject);										// 각각 정리한 게시판 페이지들을 전체 페이지 네이션 위치로 사용할 "BoardAll" 저장
		}
		return BoardAll;
	}
	
	/* BoardAll 와 다른 점은 게시글 목록 대신 닉네임 목록을 페이지 네이션 크기 만큼 조정하는 것. */
	public ArrayList<Object> nnNation(ArrayList<MemberDto> mtos) {
		
		/* 전체 게시글 페이지 하고 동일한 개수이나 각 페이지 하나하나에 매칭되는 닉네임들 개수 파악해서 각 페이지 수 별로 나누기*/
		int mtCount = (int) Math.ceil(mtos.size() / pgCount);
		
		/* 각 "게시판 목록" 별 순서대로 매칭되는 사용자 닉네임(mtos)를 저장하는 ArrayList */
		
		int index = 0;							// mtos 의 첫번째 위치부터 마지막 위치까지 찾는 첨자
		
		for(int i = 0; i< mtCount; i++) {		/* 페이지 횟수 만큼 반복 */
			
			ArrayList<MemberDto> mtObject = null;
			
			for(int i2 = 0; i2 < pgCount && index < pgCount ; i++) {	// 하나의 ArrayList, 즉 하나의 게시판 페이지 당 pgCount 의 게시글 포함. 
				
				mtObject.add(mtos.get(index));
			}
			
			NicknameAll.add(mtObject);			// 각각 정리한 게시판 페이지들을 전체 페이지 네이션 위치로 사용할 "BoardAll" 저장
		}
		return NicknameAll;
	}
	
	/* 페이지 네이션 데이터 중 게시판 페이지 네이션 위치를 데이터를 사용자가 입력한 버튼에 따라 인덱스 값을 받아서 찾아서 반환해주기, 즉 사용자가 버튼 등으로 요청한 한 페이지 네이션에서 한 페이지 위치임 */
	public ArrayList<BDto> BDtos(int pnindex){
	
		ArrayList<BDto> BDtos =  (ArrayList<BDto>) BoardAll.get(pnindex);
		return BDtos;
	}
	
	/* 페이지 네이션 데이터 중 닉네임 데이터를 사용자가 입력한 버튼에 따라 인덱스 값을 받아서 찾아서 반환해주기, 즉 사용자가 버튼 등으로 요청한 한 페이지 네이션에서 한 페이지 위치임 */
	public ArrayList<MemberDto> NickNames(int pnindex){
		
		ArrayList<MemberDto> NickNames =  (ArrayList<MemberDto>) NicknameAll.get(pnindex);
		return NickNames;
	}
}