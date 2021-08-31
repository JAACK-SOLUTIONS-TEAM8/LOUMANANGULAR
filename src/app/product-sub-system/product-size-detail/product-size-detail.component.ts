import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-size-detail',
  templateUrl: './product-size-detail.component.html',
  styleUrls: ['./product-size-detail.component.css']
})
export class ProductSizeDetailComponent implements OnInit {

  productSizeData:any[]=[]
  selectedpProductSize:any;
  searchTerm:string;

  constructor(
    private productService:ProductService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllProductSizes();
  }

  getAllProductSizes()
  {
    this.productService.getAllProductSizes().subscribe(response=>{
      console.log(response);
        this.productSizeData=response.productSizes;
    });
  }

  editProductSize(productSize:any)
  {
      this.router.navigateByUrl(`admin/product/size/add/${productSize.productSizeId}`)
  }

  deleteProductSize(productSize:any)
  {
    this.selectedpProductSize=productSize;
  }



  confirmDeleteion() {
    console.log(this.selectedpProductSize);
    this.productService.deleteProductSize(this.selectedpProductSize.productSizeId).subscribe(response => {
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: "Product Size deleted successfully!",
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        this.getAllProductSizes();
      }
      console.log(response);
    });
  }

}
