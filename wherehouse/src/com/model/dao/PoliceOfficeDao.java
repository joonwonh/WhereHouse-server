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

public class PoliceOfficeDao {
	private DataSource dataFactory;
	private static PoliceOfficeDao Instance = new PoliceOfficeDao();

	private PoliceOfficeDao() {
		try {
			Context ctx = new InitialContext();
			dataFactory = (DataSource) ctx.lookup("java:/comp/env/jdbc/Oracle11g");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static PoliceOfficeDao getInstance() {
		return Instance;
	}

	public JsonArray getListPO() {
		JsonArray jsonArray = new JsonArray();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;

		try {
			con = dataFactory.getConnection();

			String query = "select * from policeoffice";
			pstmt = con.prepareStatement(query);
			set = pstmt.executeQuery();

			while (set.next()) {
				JsonObject json = new JsonObject();
				json.addProperty("address", set.getString("address"));
			    json.addProperty("latitude", set.getDouble("latitude"));
			    json.addProperty("longitude", set.getDouble("longitude"));
			    
			    jsonArray.add(json);
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

		return jsonArray;
	}
	
	public JsonObject getClosestPO(double latitude, double longitude) {
		JsonObject json = new JsonObject();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;

		try {
			con = dataFactory.getConnection();

			String query = "select * from (select * from policeoffice order by abs(latitude - ?) + abs(longitude - ?)) where rownum = 1";
			pstmt = con.prepareStatement(query);
			pstmt.setDouble(1, latitude);
			pstmt.setDouble(2, longitude);
			set = pstmt.executeQuery();
			
			if (set.next()) {
				json.addProperty("address", set.getString("address"));
			    json.addProperty("latitude", set.getDouble("latitude"));
			    json.addProperty("longitude", set.getDouble("longitude"));
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
		
		return json;
	}

}
