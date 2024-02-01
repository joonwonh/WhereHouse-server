/* 까꿍 */
package com.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.model.dto.BDto;
import com.model.dto.CommnetDto;


public class BDao {
	
	DataSource dataSource;
	
	public BDao() {
		
		try {
			
			Context context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/Oracle11g");
			
		} catch(Exception e) {
			
			e.printStackTrace();
		}
	}
	
	public ArrayList<BDto> list(){
		
		
		ArrayList<BDto> bdtos = new ArrayList<BDto>();
	
		String query = "select * from whereboard order by connum desc";		/* 프로젝트 이어 붙이기 전 query 문을 try에서 해당 위지로 이전 */
		
		Connection connection = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			
			connection = dataSource.getConnection();
			
			
			pstmt = connection.prepareStatement(query);
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				
				BDto bdto = new BDto();
				bdto.setcontentnum(rs.getInt("connum"));
				bdto.setuserid(rs.getString(("id")));
				bdto.settitle(rs.getString("title"));
				bdto.setbcontent(rs.getString("content"));
				bdto.setregion(rs.getString("region"));
				bdto.setbgroup(rs.getInt("bgroup"));
				bdto.sethit(rs.getInt("hit"));
				bdto.setbdate(Timestamp.valueOf((rs.getString("bdate"))));
				
				bdtos.add(bdto);
				
			}
			
		} catch(Exception e) {
			
			e.printStackTrace();
		} 
		
		finally {
			
			 try {
			        if (rs != null) rs.close();
			        
			    } catch (SQLException e) {
			        e.printStackTrace();
			    }
			    try {
			        if (pstmt != null) pstmt.close();
			    } catch (SQLException e) {
			        e.printStackTrace();
			    }
			    try {
			        if (connection != null) connection.close();
			        ;
			    } catch (SQLException e) {
			        e.printStackTrace();
			    }
		}
		return bdtos;
	}
	
	public void Write(BDto bdto) {
		
		String query = "insert into whereboard(connum, id, title, content, region, bgroup)"
				+ "			values(whereboarder_seq.nextval, ?, ?, ?, ?, whereboarder_seq.nextval)";
		
		Connection connection = null;
		PreparedStatement pstmt = null;
				
		try {
			
			System.out.println("region : " + bdto.getregion());
			connection = dataSource.getConnection();
			
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, bdto.getuserid());
			pstmt.setString(2, bdto.gettitle());
			pstmt.setString(3, bdto.getbcontent());
			pstmt.setString(4, bdto.getregion());
			
			pstmt.executeUpdate();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			
			try {
			
				pstmt.close();
				connection.close();
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public BDto contentView(int bId) {
		
		String query = "select * from whereboard where connum = ?";
		BDto dto = null;
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection connection = null;
		
		try {
			
			connection = dataSource.getConnection();
			
			pstmt = connection.prepareStatement(query);
			pstmt.setInt(1, bId);
			rs = pstmt.executeQuery();
			
			dto = new BDto();
			
			while(rs.next()) {
				
				dto.setcontentnum(rs.getInt("connum"));
				dto.setuserid(rs.getString("id"));
				dto.settitle(rs.getString("title"));
				dto.setbcontent(rs.getString("content"));
				dto.setregion(rs.getString("region"));
				dto.setbgroup(rs.getInt("bgroup"));
				dto.setbstep(rs.getInt("bstep"));
				dto.setbindent(rs.getInt("bindent"));
				dto.sethit(rs.getInt("hit"));
				dto.setbdate(rs.getTimestamp("bdate"));
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  finally {
			
			try {
				
				rs.close();
				pstmt.close();
				connection.close();
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	
		return dto;
	}
	
	public void reply(int connum, String userid, String nickname, String title ,String content, int bgroup, int bstep, int bindent) {
		
		replyShape(bgroup, bstep);
		
		Connection connection = null;
		PreparedStatement pstmt = null;
		
		try {
			
			connection = dataSource.getConnection();
			
			String query = "insert into commenttbl(num, id, connum, nickname, title, content, bgroup, bstep, bindent)"
					+ "values (?, ?, whereboarder_seq.nextval, ?, ?, ?, ? ,?, ?)";
			
			pstmt = connection.prepareStatement(query);
			
			pstmt.setInt(1, connum);		
			pstmt.setString(2, userid);		
			pstmt.setString(3, nickname);	
			pstmt.setString(4, title);
			pstmt.setString(5, content);
			pstmt.setInt(6, bgroup);
			pstmt.setInt(7, bstep + 1);		
			pstmt.setInt(8, bindent + 1);
			
			pstmt.executeUpdate();
			
		} catch (Exception e){
			
			e.printStackTrace();
			
		} finally {
			
			try {
				
				pstmt.close();
				connection.close();
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} 
	}
	
	
	
	private void replyShape(int bgroup, int bstep) {
		
		Connection connection = null;
		PreparedStatement pstmt = null;
		
		String query = "update whereboard set bstep = bstep+1 where bgroup = ? and bstep > ?";
		
		try {
			
			connection = dataSource.getConnection();
			
			pstmt = connection.prepareStatement(query);
			pstmt.setInt(1, bgroup);
			pstmt.setInt(2, bstep);
			pstmt.executeUpdate();
			
			pstmt.executeUpdate();
			
		} catch (Exception e) {
			
			
		}finally {
			
			try {
				
				pstmt.close();
				connection.close();
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public ArrayList<CommnetDto> listcomments(int connum){
		
		ArrayList<CommnetDto> commentdtos = new ArrayList<CommnetDto>();
		
		Connection connection = null;
		PreparedStatement pstmt = null;
		
		String query = "select * from commenttbl where num = ?";		/* 전달 받은 게시글 번호를 가지고 그에 해당하는 댓글 검색.*/
		
		ResultSet rs = null;
		
		try {
			
			connection = dataSource.getConnection();
			pstmt = connection.prepareStatement(query);
			
			pstmt.setInt(1, connum);
			rs = pstmt.executeQuery();
			
			
			while(rs.next()) {
				
				CommnetDto cdto = new CommnetDto();
				
				cdto.setnum(rs.getInt("num"));	
				cdto.setid(rs.getString("id"));	
				cdto.setconnum(rs.getInt("connum"));	 
				cdto.setnickname(rs.getString("nickname"));
				cdto.settitle(rs.getString("title")); 
				cdto.setcontent(rs.getString("content"));;	
				cdto.setbgroup(rs.getInt("bgroup"));;	 
				cdto.setbstep(rs.getInt("bstep"));;	 
				cdto.setbindent(rs.getInt("bindent"));;
				commentdtos.add(cdto);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		} finally {
			
			try {
				rs.close();
				pstmt.close();
				connection.close();
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return commentdtos;
	}
	
	
	public BDto reply_view(int connum) {
		
		BDto bdto = new BDto();
		
		String query = "select * from whereboard where connum = ?";
		
		Connection connection = null;
		PreparedStatement pstmt = null;
		
		ResultSet rs = null;
		
		try {
			
			connection = dataSource.getConnection();
			pstmt = connection.prepareStatement(query);
			
			pstmt.setInt(1, connum);
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				
				int conid = rs.getInt("connum");
				String id = rs.getString("id");
				String title = rs.getString("title");
				String content = rs.getString("content");
				int bgroup = rs.getInt("bgroup");
				int bstep = rs.getInt("bstep");
				int bindent = rs.getInt("bindent");
				int bhit = rs.getInt("hit");
				Timestamp bdate = rs.getTimestamp("bdate");
				
				bdto = new BDto(conid, id, title, content, bgroup, bstep, bindent, bhit, bdate);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			
			
			try {
				rs.close();
				pstmt.close();
				connection.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return bdto;
	}
	
	public void delete(int bId) {
		
		int ri = 0;
		
		Connection connection = null;
		PreparedStatement pstmt = null;
		
		String query = "delete from whereboard where connum = ?";
		
		try {
			
			connection = dataSource.getConnection();
			pstmt = connection.prepareStatement(query);
			
			pstmt.setInt(1, bId);
			
			pstmt.executeUpdate();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			
			
			try {
				pstmt.close();
				connection.close();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
	}
	
	public void modify(String bId, String title, String content, String region) {
		
		int ri = 0;
		
		Connection connection = null;
		PreparedStatement pstmt = null;
		
		String query = "update whereboard set title = ?, content = ?, region =? where connum = ?";
		
		try {
			
			connection = dataSource.getConnection();
			pstmt = connection.prepareStatement(query);
			
			pstmt.setString(1, title);
			pstmt.setString(2, content);
			pstmt.setString(3, region);
			pstmt.setString(4, bId);
			
			
			ri = pstmt.executeUpdate();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			
			try {
				pstmt.close();
				connection.close();
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public void upHit(int bId) {
		
		String query = "update whereboard set HIT = HIT+1 where connum = ?";
		
		Connection connection = null;
		PreparedStatement pstmt = null;
		
		int ri = 0;
		
		try {
			
			connection = dataSource.getConnection();
			pstmt = connection.prepareStatement(query);
			
			pstmt.setInt(1, bId);
			ri = pstmt.executeUpdate();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			
			try {
				pstmt.close();
				connection.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}
}
