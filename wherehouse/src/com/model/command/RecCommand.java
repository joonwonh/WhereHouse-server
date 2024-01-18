package com.model.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface RecCommand {
	void execute(HttpServletRequest request, HttpServletResponse response);
}
