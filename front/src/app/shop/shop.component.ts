import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Product } from '../product/product';
import { ProductsService } from '../product/product.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products!: Product[];
  logeo:any;
  total=0;
  constructor(public productService: ProductsService) { }

  ngOnInit(): void {

    this.logeo=localStorage.getItem('login');

    //Recogemos los datos del back
    this.productService.getProducts().subscribe( (data: any) => {
      this.products=data;
      console.log(data);
          })
  }

}
