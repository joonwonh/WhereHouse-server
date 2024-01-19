package com.model.dto;

public class CCTVDto {
	private double latitude;
	private double longitude;
	private int cameraCount;
	
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public int getCameraCount() {
		return cameraCount;
	}
	public void setCameraCount(int cameraCount) {
		this.cameraCount = cameraCount;
	}
	
}
