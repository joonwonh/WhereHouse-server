package com.model.dto;

import java.sql.Timestamp;

public class BDto {
	
	private int contentnum;
	private String userid;
	private String title;
	private String bcontent;
	private String region;
	private int bgroup;
	private int bstep;
	private int bindent;
	private int hit;
	private Timestamp bdate;
	
	public BDto() {
		
	}

	public BDto(int contentnum, String userid, String title, String bcontent, int bgroup, int bstep, int bindent, int hit, Timestamp bdate) {
		
		this.contentnum = contentnum;
		this.userid = userid;
		this.title = title;
		this.bcontent = bcontent;
		this.bgroup = bgroup;
		this.bstep = bstep;
		this.bindent = bindent;
		this.hit = hit;
		this.bdate = bdate;
	}
	
	public int getcontentnum() {
		return contentnum;
	}
	
	public void setcontentnum(int contentnum) {
		this.contentnum = contentnum;
	}
	
	public String getuserid() {
		return userid;
	}
	
	public void setuserid(String userid) {
		this.userid = userid;
	}
	
	public String gettitle() {
		return title;
	}
	
	public void settitle(String title) {
		this.title = title;
	}
	
	
	public String getbcontent() {
		return bcontent;
	}
	
	public void setbcontent(String bcontent) {
		this.bcontent = bcontent;
	}
	
	public String getregion() {
		return region;
	}
	
	public void setregion(String region) {
		this.region = region;
	}
	
	public int getbstep() {
		return bstep;
	}
	
	public void setbstep(int bstep) {
		this.bstep = bstep;
	}
	
	public int getbgroup() {
		return bgroup;
	}
	
	public void setbgroup(int bgroup) {
		this.bgroup = bgroup;
	}
	
	public int getbindent() {
		return bindent;
	}
	
	public void setbindent(int bindent) {
		this.bindent = bindent;
	}
	
	
	public int gethit() {
		return hit;
	}
	
	public void sethit(int hit) {
		this.hit = hit;
	}
	
	public Timestamp getbdate() {
		return bdate;
	}
	
	public void setbdate(Timestamp bdate) {
		this.bdate = bdate;
	}
}
