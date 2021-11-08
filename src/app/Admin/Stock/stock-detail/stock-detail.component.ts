import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  productData:any[]=[]
  selectedProduct:any;
  searchTerm:string;

  constructor(
    private productService:ProductService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllStockProducts();
  }

  getAllStockProducts()
  {
    this.productService.getAllProducts().subscribe(response=>{
        this.productData=response.products;
    });
  }

  writeOffStockProduct(product:any)
  {
      this.router.navigateByUrl(`admin/stock/wireoff/${product.stockId}`)
  }

  completeStockProduct(product:any)
  {
      this.router.navigateByUrl(`admin/stock/complete/${product.stockId}`)
  }

  captureStockProduct(product:any)
  {
      this.router.navigateByUrl(`admin/stock/capture/${product.stockId}`)
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
        title: 'Info!',
        text: 'search bar field is empty',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }
    this.productService.searchStockProductByName(this.searchTerm).subscribe(response=>{
      if(response.enquiryTypes.length!=null&&response.enquiryTypes.length!=0)
        this.productData = response.enquiryTypes;
      else
      {
        Swal.fire({
          title: 'Info!',
          text: 'No search result found!',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
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
          text: 'Product deleted successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.getAllStockProducts();
      }
      console.log(response);
    });
  }


}
