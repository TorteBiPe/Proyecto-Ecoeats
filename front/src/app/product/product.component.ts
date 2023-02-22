import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/product';
import { ProductsService } from '../product/product.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products!: Product[];
  //paginador: any;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe( (data: any) => {
      this.products=data;
      console.log(data);
      
      
          })
  }
  delete(product: Product): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Esta seguro?',
        text: `¿Seguro que desea eliminar al producto ${product.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productsService.delete(product.id).subscribe((response) => {
            this.products = this.products.filter((cli) => cli !== product);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${product.name} eliminado con éxito`,
              'success'
            );
          });
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }
}
