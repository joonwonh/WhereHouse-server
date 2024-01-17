package com.model.dto;

public abstract class Features {
	public String type;
	public Feature properties;
	
	class Feature {
		public String address;
		public double lng;
		public double lat;
	}
}