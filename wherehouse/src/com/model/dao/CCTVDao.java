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
import com.model.dto.CCTVDto;

public class CCTVDao {
	private DataSource dataFactory;
	private static CCTVDao Instance = new CCTVDao();

	private CCTVDao() {
		try {
			Context ctx = new InitialContext();
			dataFactory = (DataSource) ctx.lookup("java:/comp/env/jdbc/Oracle11g");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static CCTVDao getInstance() {
		return Instance;
	}

	public ArrayList<CCTVDto> getListCCTV(double longitude) {
		ArrayList<CCTVDto> dtos = new ArrayList<CCTVDto>();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;

		try {
			con = dataFactory.getConnection();

			String query = "select * from cctv where abs(longitude - ?)<0.005";
			pstmt = con.prepareStatement(query);
			pstmt.setDouble(1, longitude);
			set = pstmt.executeQuery();

			while (set.next()) {
				CCTVDto dto = new CCTVDto();
				dto.setAddress(set.getString("address"));
				dto.setLatitude(set.getDouble("latitude"));
				dto.setLongitude(set.getDouble("longitude"));
				dto.setCameraCount(set.getInt("cameraCount"));
				dto.setNumbers(set.getInt("numbers"));

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
