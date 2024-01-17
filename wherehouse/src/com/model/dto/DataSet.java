package com.model.dto;

public class DataSet {
	private String type;
	private Features[] features;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Features[] getFeatures() {
		return features;
	}
	public void setFeatures(Features[] features) {
		this.features = features;
	}
}
