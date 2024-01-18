package com.model.json;

import java.io.FileReader;
import java.io.Reader;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class ReadJSON {
	public static JsonArray readGeoJson(String path) {
		try {
			// JSON 파일 읽기
            Reader reader = new FileReader(path);
            // JSON 파싱
            JsonObject jsonObject = JsonParser.parseReader(reader).getAsJsonObject();
            // Gson 객체 생성
            Gson gson = new Gson();
            // JsonObject를 원하는 클래스로 변환 (예: DataSet 클래스)
            GeoJSON dataSet = gson.fromJson(jsonObject, GeoJSON.class);
            
            JsonArray jsonArray = dataSet.getFeatures();
            JsonArray propertiesArray = new JsonArray();
            
            for (int i = 0; i < jsonArray.size(); i++) {
                // 각 feature의 properties를 가져옴
                JsonObject feature = jsonArray.get(i).getAsJsonObject();
                JsonObject properties = feature.getAsJsonObject("properties");

                // 새로운 JsonArray에 추가
                propertiesArray.add(properties);
            }
            
            // 리더 닫기
            reader.close();
            
            return propertiesArray;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static JsonArray readJson(String path) {
		try {
			// JSON 파일 읽기
            Reader reader = new FileReader(path);
            // JSON 파싱
            JsonObject jsonObject = JsonParser.parseReader(reader).getAsJsonObject();
            
            // 리턴 통일을 위한 Array로 변환
            JsonArray jsonArray = new JsonArray();
            jsonArray.add(jsonObject);
            
            // 리더 닫기
            reader.close();
            
            return jsonArray;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static JsonArray readJsonArray(String path) {
		try {
			// JSON 파일 읽기
            Reader reader = new FileReader(path);
            // JSON 파싱
            JsonArray jsonArray = JsonParser.parseReader(reader).getAsJsonArray();
            // 리더 닫기
            reader.close();
            
            return jsonArray;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
