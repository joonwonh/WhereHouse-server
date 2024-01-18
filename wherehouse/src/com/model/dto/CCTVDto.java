package com.model.dto;

public class CCTVDto {
	private String address;
	private double latitude;
	private double longitude;
	private int cameraCount;
	private int numbers;
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
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
	public int getNumbers() {
		return numbers;
	}
	public void setNumbers(int numbers) {
		this.numbers = numbers;
	}
}
