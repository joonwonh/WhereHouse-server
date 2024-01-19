package com.model.command;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.model.dao.RecServiceDao;
import com.model.dto.RecServiceDto;


public class RecServiceMonthly implements RecCommand {
	private RecServiceDao dao;
	
	public RecServiceMonthly() {
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
            
            int monthly = dto.getMonthly_avg();

            System.out.println(monthly);

            ArrayList<RecServiceDto> dtos = new ArrayList<RecServiceDto>();

            try {
                    if(monthly != 0) {
                        dtos = dao.chooseMonthlyRec(monthly);
                        System.out.println("월세 실행");
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
