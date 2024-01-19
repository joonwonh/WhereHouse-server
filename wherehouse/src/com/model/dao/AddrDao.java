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

public class AddrDao {
	private DataSource dataFactory;
	private static AddrDao Instance = new AddrDao();

	private AddrDao() {
		try {
			Context ctx = new InitialContext();
			dataFactory = (DataSource) ctx.lookup("java:/comp/env/jdbc/Oracle11g");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static AddrDao getInstance() {
		return Instance;
	}

	public JsonObject getArrestRate(String addr) {
		JsonObject json = new JsonObject();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;

		try {
			con = dataFactory.getConnection();

			String query = "select * from arrestrate where addr = ?";
			pstmt = con.prepareStatement(query);
			pstmt.setString(1, addr);
			set = pstmt.executeQuery();

			if (set.next()) {
			    json.addProperty("rate", set.getDouble("rate"));
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
