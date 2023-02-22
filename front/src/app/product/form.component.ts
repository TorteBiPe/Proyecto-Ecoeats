import { Component, OnInit } from '@angular/core';
import {Product} from './product'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { ProductsService } from './product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public product: Product = new Product();
  public titulo: string = "Crear Producto";
  
  errores!: string[];

  constructor(private productsService: ProductsService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarProducto()
  }

  cargarProducto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.productsService.getProduct(id).subscribe((product: Product) => this.product = product);
      }
    })
  }

  create(): void {
    this.productsService.create(this.product).subscribe(


        product => {
          this.router.navigate(['/product']);
          swal.fire('Nuevo producto', `El producto ${this.product.name} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.productsService.update(this.product)
      .subscribe(
        json => {
          this.router.navigate(['/product']);
          swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.product.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}

