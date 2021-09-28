import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productData:any[]=[]
  selectedProduct:any;
  searchTerm:string;

  constructor(
    private productService:ProductService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts()
  {
    this.productService.getAllProducts().subscribe(response=>{
        this.productData=response.products;
    });
  }

  editProduct(product:any)
  {
      this.router.navigateByUrl(`admin/product/add/${product.productId}`)
  }

  deleteProduct(product:any)
  {
    this.selectedProduct=product;
  }


  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: "search bar field is empty",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return
    }
    this.productService.searchProductByName(this.searchTerm).subscribe(response=>{

      if(response.statusCode==200)
        this.productData = response.products;
      else
      {
        Swal.fire({
          title: 'Warning!',
          text: "search bar field is empty",
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      }
    });
  }

  confirmDeleteion() {
    console.log(this.selectedProduct);
    this.productService.deleteProduct(Number(this.selectedProduct.productId)).subscribe(response => {
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: "Product deleted successfully",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getAllProducts();
      }
      else{
        Swal.fire({
          title: 'Warning!',
          text: "Cannot delete as product has been ordered",
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
        return 
      }
      console.log(response);
    });
  }


 

}
