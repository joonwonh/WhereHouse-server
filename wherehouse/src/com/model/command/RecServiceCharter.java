package com.model.command;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.model.dao.RecServiceDao;
import com.model.dto.RecServiceDto;


public class RecServiceCharter implements RecCommand {
	private RecServiceDao dao;
	
	public RecServiceCharter() {
		dao = RecServiceDao.getInstance();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

        try {
            StringBuilder buffer = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;

            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }

            String jsonData = buffer.toString();

            Gson gson = new Gson();
            RecServiceDto dto = gson.fromJson(jsonData, RecServiceDto.class);
            
            int charter = dto.getCharter_avg();
            System.out.println("�Է¹��� ������ : "+charter);
            int safe_score = dto.getSafe_score();
            System.out.println("�Է¹��� ���� �ܰ� : " + safe_score);
            int cvt_score = dto.getCvt_score();
            System.out.println("�Է¹��� ���� �ܰ� : " + cvt_score);
            
            ArrayList<RecServiceDto> dtos = new ArrayList<RecServiceDto>();

            try {
                    if (charter != 0) {
                        dtos = dao.chooseCharterRec(charter, safe_score, cvt_score);
                        System.out.println("���� ����");
                    }
                
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }

            // ����� JSON �������� ����
            try {
                String jsonResponse = gson.toJson(dtos);
                response.getWriter().write(jsonResponse);
            } catch (IOException e) {
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
	
}
