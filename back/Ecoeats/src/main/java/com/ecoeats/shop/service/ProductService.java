package com.ecoeats.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecoeats.shop.entity.Product;
import com.ecoeats.shop.repository.IProductRepository;
@Service
public class ProductService implements IProductService{
	
	@Autowired
	private IProductRepository product_Repository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Product> findAll() {
		return (List<Product>) product_Repository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Product findBy(int id) {
		return product_Repository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Product save(Product initiative) {
		return product_Repository.save(initiative);
	}

	@Override
	@Transactional
	public void delete(int id) {
		product_Repository.deleteById(id);
	}
}
