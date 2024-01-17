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
			// JSON ���� �б�
            Reader reader = new FileReader(path);
            // JSON �Ľ�
            JsonObject jsonObject = JsonParser.parseReader(reader).getAsJsonObject();
            // Gson ��ü ����
            Gson gson = new Gson();
            // JsonObject�� ���ϴ� Ŭ������ ��ȯ (��: DataSet Ŭ����)
            GeoJSON dataSet = gson.fromJson(jsonObject, GeoJSON.class);
            // ���� �ݱ�
            reader.close();
            
            JsonArray jsonArray = dataSet.getFeatures();
            
            JsonArray propertiesArray = new JsonArray();
            
            for (int i = 0; i < jsonArray.size(); i++) {
                // �� feature�� properties�� ������
                JsonObject feature = jsonArray.get(i).getAsJsonObject();
                JsonObject properties = feature.getAsJsonObject("properties");

                // ���ο� JsonArray�� �߰�
                propertiesArray.add(properties);
            }
            
            return propertiesArray;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static JsonArray readJson(String path) {
		try {
			// JSON ���� �б�
            Reader reader = new FileReader(path);
            // JSON �Ľ�
            JsonObject jsonObject = JsonParser.parseReader(reader).getAsJsonObject();
            // ���� �ݱ�
            reader.close();
            
            JsonArray jsonArray = new JsonArray();
            jsonArray.add(jsonObject);
            
            return jsonArray;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static JsonArray readJsonArray(String path) {
		try {
			// JSON ���� �б�
            Reader reader = new FileReader(path);
            // JSON �Ľ�
            JsonArray jsonArray = JsonParser.parseReader(reader).getAsJsonArray();
            // ���� �ݱ�
            reader.close();
            
            return jsonArray;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
