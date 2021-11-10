import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  productTypeForm: FormGroup;
  productTypeId:number;
  productType:any;
  constructor(
    private formBuilder: FormBuilder,
    private productService:ProductService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
        this. productTypeId=params["id"];
    });
   }

  getProducyTypeById() {
    this.productService.getProductTypeById(Number(this.productTypeId)).subscribe(response=>{
      this.productType=response.productType;
      console.log(response)
      this.productTypeForm.controls["productTypeName"].patchValue(this.productType.productTypeName);
    });
  }

  ngOnInit(): void {
    this.initilizeForm();
    if(this. productTypeId!=0)
      this.getProducyTypeById();
  }

  initilizeForm() {
    this.productTypeForm = this.formBuilder.group({
      productTypeName: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]]
    });
  }

  submitAddProductTypeForm() {
    if(this.productTypeForm.invalid)
   {
    Swal.fire({
      title: 'Warning!',
      text: "provide all the required fields values!",
      icon: 'info',
      confirmButtonText: 'Ok'
    })
     return;
   }
   let eproductTypeDetail =
   {
     "productTypeId":Number(this.productTypeId??0),
     "productTypeName":String( this.productTypeForm.controls["productTypeName"].value)
   };
   debugger
   console.log(eproductTypeDetail)

   this.productService.addProductType(eproductTypeDetail).subscribe(response => {
     if (response.statusCode == 200) {

      Swal.fire({
        title: 'Success!',
        text: this.productTypeId==0?"product Type added successfully!":"Product Type updated successfully!",
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{
        this.router.navigateByUrl("/admin/product/type/detail");
      })
     }
   });


 }


}
