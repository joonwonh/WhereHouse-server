package com.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.model.dto.PoliceOfficeDto;

public class InfoDao {
	private DataSource dataFactory;
	private static InfoDao Instance = new InfoDao();
	
	private InfoDao() {
		try {
			Context ctx = new InitialContext();
			dataFactory = (DataSource) ctx.lookup("java:/comp/env/jdbc/Oracle11g");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static InfoDao getInstance() {
		return Instance;
	}
	
	public ArrayList<PoliceOfficeDto> getPO() {
		ArrayList<PoliceOfficeDto> dtos = new ArrayList<PoliceOfficeDto>();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;
		
		try {
			con = dataFactory.getConnection();

			String query = "select bId,bName,bTitle,bContent,bDate,bHit,bGroup,bStep,bIndent from mvc_board order by bGroup desc, bStep asc";
			pstmt = con.prepareStatement(query);
			set = pstmt.executeQuery();

			while (set.next()) {
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (set != null)
					set.close();
				if (pstmt != null)
					pstmt.close();
				if (con != null)
					con.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		
		return dtos;
	}
	
	public boolean checkDB(String table) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;
		
		try {
			con = dataFactory.getConnection();

			String query = "select 1 from "+ table +" where rownum <= 1";
			pstmt = con.prepareStatement(query);
			set = pstmt.executeQuery();
			
			if (set.next()) {
                if (set.getInt(1) > 0) {
                	return true;
                }
            }
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (set != null)
					set.close();
				if (pstmt != null)
					pstmt.close();
				if (con != null)
					con.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		
		return false;
	}
	
	public void setDB(JsonArray json) {
		Connection con = null;
		PreparedStatement pstmt = null;
		int count = 0;
		try {
			con = dataFactory.getConnection();
			for (int i=0; i<json.size(); i++) {
				if (json.get(i).getAsJsonObject() != null) {
					JsonObject jsonObject = json.get(i).getAsJsonObject();
					String address = jsonObject.getAsJsonPrimitive("address").getAsString();
					double lat = jsonObject.getAsJsonPrimitive("lat").getAsDouble();
					double lng = jsonObject.getAsJsonPrimitive("lng").getAsDouble();
					
					if (address.contains("서울")) {
						String query = "insert into policeoffice values (?,?,?)";
						pstmt = con.prepareStatement(query);
						pstmt.setString(1, address);
						pstmt.setDouble(2, lat);
						pstmt.setDouble(3, lng);
						pstmt.executeUpdate();
					} else {
						if (count == 2) {
							break;
						}
						count++;
					}
				}
			}
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
			try {
				if (pstmt != null)
					pstmt.close();
				if (con != null)
					con.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		System.out.println("#디비 삽입 완료!");
	}
}
