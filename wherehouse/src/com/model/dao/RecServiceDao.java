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
import com.model.dto.RecServiceDto;

public class RecServiceDao {
	private DataSource dataFactory;
	private static RecServiceDao Instance = new RecServiceDao();
	
	private RecServiceDao() {
		try {
			Context ctx = new InitialContext();
			dataFactory = (DataSource) ctx.lookup("java:/comp/env/jdbc/Oracle11g");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static RecServiceDao getInstance() {
		return Instance;
	}
	
	public ArrayList<RecServiceDto> chooseCharterRec(int inputData, int safe, int cvt) {
		ArrayList<RecServiceDto> dtos = new ArrayList<RecServiceDto>();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;
		
		try {
			con = dataFactory.getConnection();
			String query = "";
			if(cvt>safe)	{
				query = "SELECT * FROM ( SELECT * FROM gu_info ORDER BY ABS(charter_avg - ?)) WHERE ROWNUM <= 3 order by cvt_score desc";
			}
			else if(cvt<safe)	{
				query = "SELECT * FROM ( SELECT * FROM gu_info ORDER BY ABS(charter_avg - ?)) WHERE ROWNUM <= 3 order by safe_score desc";
			}
			else if(cvt == safe)	{
				query = "SELECT * FROM ( SELECT * FROM gu_info ORDER BY ABS(charter_avg - ?)) WHERE ROWNUM <= 3";
			}
			
			pstmt = con.prepareStatement(query);
	        pstmt.setInt(1, inputData);
	        set = pstmt.executeQuery();
			while (set.next()) {
				RecServiceDto dto = new RecServiceDto();
				dto.setGu_id(set.getInt("gu_id"));
	            dto.setGu_name(set.getString("gu_name"));	
	            dto.setCvt_score(set.getInt("cvt_score"));
	            dto.setSafe_score(set.getInt("safe_score"));
	            dto.setCafe(set.getInt("cafe"));
	            dto.setCvt_store(set.getInt("cvt_store"));
	            dto.setDaiso(set.getInt("daiso"));
	            dto.setOliveYoung(set.getInt("oliveYoung"));
	            dto.setRestourant(set.getInt("restourant"));
	            dto.setPolice_office(set.getInt("police_office"));
	            dto.setCctv(set.getInt("cctv"));
	            dto.setCharter_avg(set.getInt("charter_avg"));
	            dto.setDeposit_avg(set.getInt("deposit_avg"));
	            dto.setMonthly_avg(set.getInt("monthly_avg"));
				
				dtos.add(dto);
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
	
	public ArrayList<RecServiceDto> chooseMonthlyRec(int inputData, int safe, int cvt) {
		ArrayList<RecServiceDto> dtos = new ArrayList<RecServiceDto>();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;
		
		try {
			con = dataFactory.getConnection();

			String query = "";
			if(cvt>safe)	{
				query = "SELECT * FROM ( SELECT * FROM gu_info ORDER BY ABS(monthly_avg - ?), deposit_avg) WHERE ROWNUM <= 3 order by cvt_score desc";
			}
			else if(cvt<safe)	{
				query = "SELECT * FROM ( SELECT * FROM gu_info ORDER BY ABS(monthly_avg - ?), deposit_avg) WHERE ROWNUM <= 3 order by safe_score desc";
			}
			else if(cvt == safe)	{
				query = "SELECT * FROM ( SELECT * FROM gu_info ORDER BY ABS(monthly_avg - ?), deposit_avg) WHERE ROWNUM <= 3";
			}
			pstmt = con.prepareStatement(query);
	        pstmt.setInt(1, inputData);
	        set = pstmt.executeQuery();
			while (set.next()) {
				RecServiceDto dto = new RecServiceDto();
				dto.setGu_id(set.getInt("gu_id"));
	            dto.setGu_name(set.getString("gu_name"));	
	            dto.setCvt_score(set.getInt("cvt_score"));
	            dto.setSafe_score(set.getInt("safe_score"));
	            dto.setCafe(set.getInt("cafe"));
	            dto.setCvt_store(set.getInt("cvt_store"));
	            dto.setDaiso(set.getInt("daiso"));
	            dto.setOliveYoung(set.getInt("oliveYoung"));
	            dto.setRestourant(set.getInt("restourant"));
	            dto.setPolice_office(set.getInt("police_office"));
	            dto.setCctv(set.getInt("cctv"));
	            dto.setCharter_avg(set.getInt("charter_avg"));
	            dto.setDeposit_avg(set.getInt("deposit_avg"));
	            dto.setMonthly_avg(set.getInt("monthly_avg"));
				
				dtos.add(dto); 
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

	
}
