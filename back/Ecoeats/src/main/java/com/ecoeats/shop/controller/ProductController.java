package com.ecoeats.shop.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoeats.shop.entity.Product;
import com.ecoeats.shop.service.IProductService;
import com.ecoeats.shop.service.ProductService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
    public IProductService productoService;
	
	@GetMapping("/products")
    public List<Product> index(){
    	return productoService.findAll();
    }//index
	
    @GetMapping("/products/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
    	Product product = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			product = productoService.findBy(id);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al insertar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(product == null) {
			response.put("mensaje", "El producto ID: ".concat(String.valueOf(id).concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Product>(product, HttpStatus.OK);
    }//show
    
    
    @PostMapping("/products")
	public ResponseEntity<?> create(@Valid @RequestBody Product product, BindingResult result) {
		Product productNuevo= null;
		Map<String, Object> response= new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream().map(
					err -> "El campo '" +  err.getField() + "' " + err.getDefaultMessage()).collect(Collectors.toList());
					
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			product = productoService.save(product);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al insertar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El producto ha sido creado con ??xito!");
		response.put("product", productNuevo);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}//create
    
    
    @PutMapping("/products/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Product product, BindingResult result, @PathVariable int id) {
    	Product productCurrent = productoService.findBy(id);
    	Product productUpdate = null;
		Map<String, Object> response= new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream().map(
					err -> "El campo '" +  err.getField() + "' " + err.getDefaultMessage()).collect(Collectors.toList());
					
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(productCurrent == null) {
			response.put("mensaje", "Error: no se pudo editar, el producto ID: ".concat(String.valueOf(id).concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			productCurrent.setName(product.getName());
			productCurrent.setPrice(product.getPrice());
			productCurrent.setUrlimage(product.getUrlimage());
			
			productUpdate= productoService.save(productCurrent);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al actualizar el producto en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El producto ha sido actualizado con ??xito!");
		response.put("product", productUpdate);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}//update
    
    
    @DeleteMapping("/products/{id}")
	public ResponseEntity<?> delete(@PathVariable int id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			productoService.delete(id);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al eliminar el producto en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El producto ha sido eliminado con ??xito!");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}//delete
}
