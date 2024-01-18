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

	public ArrayList<PoliceOfficeDto> getListPO() {
		ArrayList<PoliceOfficeDto> dtos = new ArrayList<PoliceOfficeDto>();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;

		try {
			con = dataFactory.getConnection();

			String query = "select * from policeoffice";
			pstmt = con.prepareStatement(query);
			set = pstmt.executeQuery();

			while (set.next()) {
				PoliceOfficeDto dto = new PoliceOfficeDto();
				dto.setAddress(set.getString("address"));
				dto.setLatitude(set.getDouble("latitude"));
				dto.setLongitude(set.getDouble("longitude"));

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
	
	public PoliceOfficeDto getClosestPO(double latitude, double longitude) {
		PoliceOfficeDto dto = new PoliceOfficeDto();
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
				dto.setAddress(set.getString("address"));
				dto.setLatitude(set.getDouble("latitude"));
				dto.setLongitude(set.getDouble("longitude"));
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
		
		System.out.println(dto.getAddress());
		System.out.println(dto.getLatitude());
		System.out.println(dto.getLongitude());
		
		return dto;
	}

	public boolean checkDB(String table) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet set = null;

		try {
			con = dataFactory.getConnection();

			String query = "select 1 from " + table + " where rownum <= 1";
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

	public void setDBPO(JsonArray json) {
		Connection con = null;
		PreparedStatement pstmt = null;
		try {
			int count = 0;
			con = dataFactory.getConnection();
			for (int i = 0; i < json.size(); i++) {
				if (json.get(i).getAsJsonObject() != null) {
					JsonObject jsonObject = json.get(i).getAsJsonObject();
					if (jsonObject.has("address") && jsonObject.has("lat") && jsonObject.has("lng")) {
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
							count = 0;
						} else {
							if (count == 2) {
								break;
							}
							count++;
						}
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

	public void setDBCCTV(JsonArray json) {
		Connection con = null;
		PreparedStatement pstmt = null;
		try {
			con = dataFactory.getConnection();
			for (int i=0; i<json.size(); i++) {
				if (json.get(i).getAsJsonObject() != null) {
					JsonObject jsonObject = json.get(i).getAsJsonObject();
					int number = 0;
					String address = null;
					double lat = 0, lng = 0;
					int cctvCount = 1;
					
					if (jsonObject.has("Number") && jsonObject.has("WGS84Latitude") && jsonObject.has("WGS84Longitude")) {
						number = jsonObject.getAsJsonPrimitive("Number").getAsInt();
						lat = jsonObject.getAsJsonPrimitive("WGS84Latitude").getAsDouble();
						lng = jsonObject.getAsJsonPrimitive("WGS84Longitude").getAsDouble();
					} else { continue; }
					
					if (jsonObject.has("Address")) {
						address = jsonObject.getAsJsonPrimitive("Address").getAsString();
					}
					if (jsonObject.has("CameraCount")) {
						cctvCount = jsonObject.getAsJsonPrimitive("CameraCount").getAsInt();
					}
					
					String query = "insert into cctv values (?,?,?,?,?)";
					pstmt = con.prepareStatement(query);
					pstmt.setInt(1, number);
					pstmt.setString(2, address);
					pstmt.setDouble(3, lat);
					pstmt.setDouble(4, lng);
					pstmt.setInt(5, cctvCount);
					pstmt.executeUpdate();
					pstmt.close();
				}
			}
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
			try {
				if (con != null)
					con.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		System.out.println("#디비 삽입 완료!");
	}
}
