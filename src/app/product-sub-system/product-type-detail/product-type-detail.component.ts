import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-type-detail',
  templateUrl: './product-type-detail.component.html',
  styleUrls: ['./product-type-detail.component.css']
})
export class ProductTypeDetailComponent implements OnInit {

  productTypeData:any[]=[]
  selectedProductType:any;
  searchTerm:string;

  constructor(
    private productService:ProductService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  getAllProductTypes()
  {
    this.productService.getAllProductTypes().subscribe(response=>{
        this.productTypeData=response.productTypes;
    });
  }

  editProductType(productType:any)
  {
      this.router.navigateByUrl(`admin/product/type/add/${productType.productTypeId}`)
  }

  deleteProductSize(productType:any)
  {
    this.selectedProductType=productType;
  }



  confirmDeleteion() {
    console.log(this.selectedProductType);
    this.productService.deleteProductType(Number(this.selectedProductType.productTypeId)).subscribe(response => {
      if(response.statusCode==200)
      {
        Swal.fire({
        title: 'Success!',
        text: "Product Type deleted successfully",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
        this.getAllProductTypes();
      }
      console.log(response);
    });
  }

}
