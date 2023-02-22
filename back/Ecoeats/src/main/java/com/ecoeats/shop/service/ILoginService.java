package com.ecoeats.shop.service;

import java.util.List;

import com.ecoeats.shop.entity.UserLogin;

public interface ILoginService {
	
	public List<UserLogin> findAll();
	
	public UserLogin save(UserLogin userLogin);
	
	//public void delete(int id);
}
