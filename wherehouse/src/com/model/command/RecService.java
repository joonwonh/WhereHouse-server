package com.model.command;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.model.dao.RecServiceDao;
import com.model.dto.RecServiceDto;


public class RecService implements RecCommand {
	private RecServiceDao dao;
	
	public RecService() {
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
            System.out.println(charter);

            ArrayList<RecServiceDto> dtos = new ArrayList<RecServiceDto>();

            try {
                    if (charter != 0) {
                        dtos = dao.chooseCharterRec(charter);
                        System.out.println("전세 실행");
                    }
                
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }

            // 결과를 JSON 형식으로 응답
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
