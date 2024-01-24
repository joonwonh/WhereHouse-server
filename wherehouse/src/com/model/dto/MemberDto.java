package com.model.dto;

import java.sql.Timestamp;

public class MemberDto {
	
	String id;
	String pw;
	String nickname;
	String name;
	String tel;
	String email;
	Timestamp joindate;
	
	public void setid(String id) {
		
		this.id = id;
	}
	
	public String getid() {
		
		return id;
	}
	
	public void setpw(String pw) {
		
		this.pw = pw; 
	}
	
	public String getpw() {
		
		return pw;
	}
	
	public void setnickname(String nickname) {
		
		this.nickname = nickname;
	}
	
	public String getnickname() {
		
		return nickname;
	}
	
	public void setname(String name) {
		
		this.name = name;
	}
	
	public String getname() {
		
		return name;
	}
	
	public void settel(String tel) {
		
		this.tel = tel;
	}
	
	public String gettel() {
		
		return tel;
	}
	
	public void setemail(String email) {
		
		this.email = email;
	}
	
	public String getemail() {
		
		return email;
	}
	
	public void setjoindate(Timestamp joindate) {
		
		this.joindate = joindate;
	}
	
	public Timestamp getjoindate() {
		
		return joindate;
	}
}