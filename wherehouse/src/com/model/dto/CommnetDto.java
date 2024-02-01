package com.model.dto;

import java.sql.Timestamp;

public class CommnetDto {
	
	private int num;
	private String id;
	private int connum;
	private String nickname;
	private String title;
	private String content;
	private int bgroup;
	private int bstep;
	private int bindent;
	private Timestamp recorddate;
	
	public CommnetDto() {
		
	}

	public CommnetDto(int num, String id, int connum, String nickname, String title, String content, int bgroup, int bstep, int bindent, String bcontent) {
		
		this.num = num;
		this.id = id;
		this.connum = connum;
		this.nickname = nickname;
		this.title = title;
		this.content = content;
		this.bgroup = bgroup;
		this.bstep = bstep;
		this.bindent = bindent;
	}
	
	public int getnum() {
		return num;
	}
	
	public void  setnum(int num) {
		this.num = num;
	}
	
	public String getid() {
		return id;
	}
	
	public void setid(String id) {
		this.id = id;
	}
	
	public int getconnum() {
		return connum;
	}
	
	public void setconnum(int connum) {
		this.connum = connum;
	}
	
	public String getnickname() {
		return nickname;
	}
	
	public void setnickname(String nickname) {
		this.nickname = nickname;
	}
	
	public String gettitle() {
		return title;
	}
	
	public void settitle(String title) {
		this.title = title;
	}
	
	public String getcontent() {
		return content;
	}
	
	public void setcontent(String content) {
		this.content = content;
	}
	
	public int getbgroup() {
		return bgroup;
	}
	
	public void setbgroup(int bgroup) {
		this.bgroup = bgroup;
	}
	
	public int getbstep() {
		return bstep;
	}
	
	public void setbstep(int bstep) {
		this.bstep = bstep;
	}
	
	public int getbindent() {
		return bindent;
	}
	
	public void setbindent(int bindent) {
		this.bindent = bindent;
	}
	
	public Timestamp getrecorddate() {
		return recorddate;
	}
	
	public void setrecorddate(Timestamp recorddate) {
		this.recorddate = recorddate;
	}
}
