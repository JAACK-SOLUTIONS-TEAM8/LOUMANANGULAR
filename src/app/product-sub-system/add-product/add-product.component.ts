import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productDetailForm: FormGroup;
  productId: number;
  product:any;
  productTypeData:any[]=[];
  productSizeData:any[]=[];
  productImage:any={}

  imageUrl:string=""

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private prroductService:ProductService,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
      this.productId=params["id"];
    });
  }

  getProductById() {
    this.prroductService.getProductById(Number(this.productId)).subscribe(response=>{
      this.product=response.product;
      this.productDetailForm.controls["productName"].patchValue(this.product.productName);
      this.productDetailForm.controls["price"].patchValue(this.product.price);
      this.productDetailForm.controls["productTypeId"].patchValue(this.product.productTypeId);
      this.productDetailForm.controls["productSizeId"].patchValue(this.product.productSizeId);
      this.productImage.file=this.product.productImage
  
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
    if(this.productId!=0)
    this.getProductById();
    this.getProductTypes();
    this.getProductSizes();
  }

  initilizeForm() {
    this.productDetailForm = this.formBuilder.group({
      productName: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      price: [null,Validators.required],
      productTypeId: [null,Validators.required],
      productSizeId: [null,Validators.required],
    });
  }


  submitAddProductForm() {
    if(this.productDetailForm.invalid)
   {
    Swal.fire({
      title: 'Warning!',
      text: 'provide all the required fields values!',
      icon: 'info',
      confirmButtonText: 'Ok'
    })
     return;
   }

   if(this.productDetailForm.controls['price'].value<0)
   {
    Swal.fire({
      title: 'Warning!',
      text: 'Product Price Should not be negative',
      icon: 'info',
      confirmButtonText: 'Ok'
    })
     return;
   }

   let productDetail ={
   product:{
     "productId":Number(this.productId??0),
     "productTypeId":Number( this.productDetailForm.controls["productTypeId"].value),
      "productSizeId":Number( this.productDetailForm.controls["productSizeId"].value),
      "productName":String( this.productDetailForm.controls["productName"].value),
      "price":Number( this.productDetailForm.controls["price"].value),
      "productImage":String(this.productImage.file)
    },
    userId: Number(JSON.parse(localStorage.getItem('User')).userId)
  };
   debugger
   console.log(productDetail)

   this.prroductService.addProduct(productDetail).subscribe(response => {
     if (response.statusCode == 200) {

      Swal.fire({
        title: 'Success!',
        text: this.productId==0?"Product added successfully!":"Product updated successfully!",
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{
        this.router.navigateByUrl("/admin/product/list");
      })
       
     }
   });


 }


 uploadImage(event: any) {
   console.log(event.target.files)
  debugger
  this.readImageAsBase64(event.target.files[0]).subscribe(imageBase64 => {
    this.productImage = imageBase64;
  });
}

readImageAsBase64(file: any): Observable<any> {
  let observerable = new Observable((observer) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      observer.next({ file: reader.result, fileName: file.name, fileType: file.type });
    }
  });
  return observerable;
}

}
