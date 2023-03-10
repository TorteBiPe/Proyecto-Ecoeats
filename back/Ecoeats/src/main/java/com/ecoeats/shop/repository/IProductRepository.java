package com.ecoeats.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoeats.shop.entity.Product;

@Repository
public interface IProductRepository extends JpaRepository<Product, Integer>{
	
}
