package com.ecoeats.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoeats.shop.entity.UserLogin;

@Repository
public interface loginRepository extends JpaRepository<UserLogin, Long> {

}
