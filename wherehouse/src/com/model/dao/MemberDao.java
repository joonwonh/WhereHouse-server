package com.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.model.dto.MemberDto;

public class MemberDao {
   
   private static MemberDao instance = new MemberDao();
   
   private MemberDao() {
   }
   
   public static MemberDao getInstance() {
      return instance;
   }
   
   
   public MemberDto getMember(String id) {
      Connection connection = getConnection();
      
      PreparedStatement pstmt = null;
      String query = "select * from membertbl where id = ?";
      ResultSet rs = null;
      
      
      MemberDto dto = new MemberDto();
      
      try {
         
         pstmt = connection.prepareStatement(query);
         pstmt.setString(1, id);
         
         rs = pstmt.executeQuery();
         if(rs.next()) {
            
            String sid = rs.getString("id");
            String pw = rs.getString("pw");
            String nickname = rs.getString("nickname");
            String name = rs.getString("name");
            String tel = rs.getString("tel");
            String email = rs.getString("email");
            
            dto.setid(sid);
            dto.setpw(pw);
            dto.setnickname(nickname);
            dto.setname(name);
            dto.settel(tel);
            dto.setemail(email);
         }
         
      } catch (Exception e) {} 
      finally {
          try {
                 if (rs != null) rs.close();
          } catch (Exception e) {
                 e.printStackTrace();
          }
          try {
                if (pstmt != null) pstmt.close();
          } catch (Exception e) {
                e.printStackTrace();
          }
          try {
               if (connection != null) connection.close();
          } catch (Exception e) {
                e.printStackTrace();
          }
      }
      
      return dto;
   }
      
   public int confirmId(String id) {
      Connection connection = getConnection();
      String query = "select id from membertbl where id = ?";
      ResultSet rs;
      
      int ri = 0;
      
      try {
         PreparedStatement pstmt = connection.prepareStatement(query);
         
         pstmt.setString(1, id);
         rs = pstmt.executeQuery();
         
         if(rs.next()) {      // 1    ޾ƿ     ̹  db    ȸ               Է       ̵       Ѵٴ   ǹ 
            
            ri = 1;
         } else {
            ri = 0;
         }
         
         rs.close();
         pstmt.close();
         connection.close();
         
      } catch (SQLException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
      
      return ri;
   }
   
   public int userCheck(String id, String pw) {      //  α          id   pw    ޾  db        ڰ   Է    ȸ           ִ     Ȯ  .
      Connection connection = getConnection();
      int ri = 0;
      
      String sp = null;
      
      PreparedStatement pstmt = null;
      String query = "select * from membertbl where id = ?";
      ResultSet rs = null;
      
      
      try {
         
         pstmt = connection.prepareStatement(query);
         pstmt.setString(1, id);
         rs = pstmt.executeQuery();
         
         if(rs.next()) {
            
            sp = rs.getString("pw");
            
            if(pw.equals(sp)) {
               
               ri = 1;
               
            } else {
               
               ri = 0;
            }
               
            
         } else {
            ri = -1;
         }
         
      } catch (Exception e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
      
      return ri;   
   }
   
   public int insertMember(MemberDto dto) {
      
      int ri = 0;
      Connection connection = getConnection();
      
      String query = "insert into membertbl(id, pw, nickname, name, tel, email) values(?, ?, ?, ?, ?, ?)"; 
      
      try {
         
         PreparedStatement pstmt = connection.prepareStatement(query);
         
         pstmt.setString(1, dto.getid());
         pstmt.setString(2, dto.getpw());
         pstmt.setString(3, dto.getnickname());
         pstmt.setString(4, dto.getname());
         pstmt.setString(5, dto.gettel());
         pstmt.setString(6, dto.getemail());
         ri = pstmt.executeUpdate();
         
      } catch (SQLException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
      
      return ri;
   }
   
   public int updateMember(MemberDto dto) {
      
      String query = "update membertbl set pw=?, nickname=?, tel=?, email=? where id=?";
      int ri = 0;
      
      Connection connection = getConnection();
      
      try {
         
         PreparedStatement pstmt = connection.prepareStatement(query);
         pstmt.setString(1, dto.getpw());
         pstmt.setString(2, dto.getnickname());
         pstmt.setString(3, dto.gettel());
         pstmt.setString(4, dto.getemail());
         pstmt.setString(5, dto.getid());
         ri = pstmt.executeUpdate();
         
      }catch(Exception e) {
         e.printStackTrace();
      }
      
      return ri;
   }
   
   public Connection getConnection() {
      
      
      Context context = null;
      DataSource dataSource = null;
      Connection connection = null;
      
      try {
         
         context = new InitialContext();
         dataSource = (DataSource) context.lookup("java:comp/env/jdbc/Oracle11g");
         connection = dataSource.getConnection();
         
      } catch (Exception e) {
         e.printStackTrace();
      }
   
      return connection;
   }
}