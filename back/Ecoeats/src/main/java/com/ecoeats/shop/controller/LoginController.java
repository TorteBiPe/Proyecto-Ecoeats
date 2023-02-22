package com.ecoeats.shop.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoeats.shop.entity.UserLogin;
import com.ecoeats.shop.service.ILoginService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class LoginController {
 
	@Autowired
    private ILoginService loginService;
	
	
	@GetMapping("/users")
    public List<UserLogin> getAllLogins(){
    	return loginService.findAll();
    }//getAllLogins
    
    
    @PostMapping("/users/logout")
    public HttpStatus logUserOut(@Valid @RequestBody UserLogin user) {
        List<UserLogin> users = loginService.findAll();
        for (UserLogin other : users) {
            if (other.equals(user)) {
                loginService.save(user);
                return HttpStatus.OK;
            }
        }
        return HttpStatus.BAD_REQUEST;
    }//logUserOut
}
