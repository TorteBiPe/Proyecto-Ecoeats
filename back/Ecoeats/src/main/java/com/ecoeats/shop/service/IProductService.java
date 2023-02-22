package com.ecoeats.shop.service;

import java.util.List;

import com.ecoeats.shop.entity.Product;

public interface IProductService {
	public List<Product> findAll();
	
	public Product findBy(int id);
	
	public Product save(Product product);
	
	public void delete(int id);

}
