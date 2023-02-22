package com.ecoeats.shop.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecoeats.shop.entity.UserLogin;
import com.ecoeats.shop.repository.loginRepository;
import com.ecoeats.shop.service.LoginService;

@Service
public class LoginService implements ILoginService{

	@Autowired
	private loginRepository login_Repository;
	
	@Override
	@Transactional(readOnly = true)
	public List<UserLogin> findAll() {
		return (List<UserLogin>) login_Repository.findAll();
	}

	@Override
	@Transactional
	public UserLogin save(UserLogin login) {
		return login_Repository.save(login);
	}

	/*@Override
	@Transactional
	public void delete(int id) {
		login_Repository.deleteById(id);
	}*/

}
