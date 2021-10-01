import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complete-stock',
  templateUrl: './complete-stock.component.html',
  styleUrls: ['./complete-stock.component.css']
})
export class CompleteStockComponent implements OnInit {
  
  productDetailForm: FormGroup;
  stockId: number;
  product:any;
  productTypeData:any[]=[];
  productSizeData:any[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private prroductService:ProductService,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
      this.stockId=params["id"];
    });
  }

  getStockProductById() {
    this.prroductService.getStockProductById(Number(this.stockId)).subscribe(response=>{
      this.product=response.product;
      this.productDetailForm.controls["productName"].patchValue(this.product.productName);
      this.productDetailForm.controls["price"].patchValue(this.product.price);
      this.productDetailForm.controls["productTypeId"].patchValue(this.product.productTypeName);
      this.productDetailForm.controls["productSizeId"].patchValue(this.product.productSizeDescription);
      this.productDetailForm.controls["productQuantity"].patchValue(0);
      this.productDetailForm.controls["productExistingQuantity"].patchValue(this.product.productQuantity);

    });
  }

  getProductTypes() {
    this.prroductService.getAllProductTypes().subscribe(response=>{
      this.productTypeData=response.productTypes;
    })
  }

  getProductSizes() {
    this.prroductService.getAllProductSizes().subscribe(response=>{
      this.productSizeData=response.productSizes;
    })

  }

  ngOnInit(): void {
    this.initilizeForm();
    this.getStockProductById();
    this.getProductTypes();
    this.getProductSizes();
  }

  initilizeForm() {
    this.productDetailForm = this.formBuilder.group({
      productName: [null,Validators.required],
      price: [null,Validators.required],
      productTypeId: [null,Validators.required],
      productSizeId: [null,Validators.required],
      productQuantity: [null,Validators.required],
      productExistingQuantity: [null,Validators.required],

    });
  }


  wireOffStockConfirm() {
    if(this.productDetailForm.invalid)
   {
    Swal.fire({
      title: 'Error!',
      text: 'provide all the required fields values!',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
     return;
   }

   if(this.productDetailForm.controls['productQuantity'].value <0)
   {
    Swal.fire({
      title: 'Warning!',
      text: 'Product quantity should be a positive number',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
     return;
   }

   let stockDetail =
   {
     "stockId":Number(this.stockId??0),
     "productId":Number(0),
      "productQuantity":Number( this.productDetailForm.controls["productQuantity"].value)
    };
   debugger
   console.log(stockDetail)

   this.prroductService.completeStockProduct(stockDetail).subscribe(response => {
     if (response.statusCode == 200) {

      Swal.fire({
        title: 'Success!',
        text: 'Stock updated successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{
        this.router.navigateByUrl("/admin/stock/detail");
      })
       
     }
   });


 }

}
