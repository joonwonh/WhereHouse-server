package com.model.json;

import com.google.gson.JsonArray;

public class GeoJSON {
	private String type;
	private JsonArray features;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public JsonArray getFeatures() {
		return features;
	}
	public void setFeatures(JsonArray features) {
		this.features = features;
	}
	
	
}