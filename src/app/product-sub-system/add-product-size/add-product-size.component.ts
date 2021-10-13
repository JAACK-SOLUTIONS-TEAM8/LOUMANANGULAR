import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-size',
  templateUrl: './add-product-size.component.html',
  styleUrls: ['./add-product-size.component.css']
})
export class AddProductSizeComponent implements OnInit {

  productSizeForm: FormGroup;


  productSizeId:number;
  productSizeData:any[]=[];
  productSize:any;

  constructor(
    private formBuilder: FormBuilder,
    private productService:ProductService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
        this. productSizeId=params["id"];
    });
   }

  ngOnInit(): void {
    this.initilizeForm();
    if(this. productSizeId!=0)
      this.getProducySizeById();
  }

  getProducySizeById() {
    this.productService.getProductSizeById(Number(this.productSizeId)).subscribe(response=>{
      this.productSize=response.productSize;
      console.log(response)
      this.productSizeForm.controls["productSizeDescription"].patchValue(this.productSize.productSizeDescription);
    });
  }

  initilizeForm() {
    this.productSizeForm = this.formBuilder.group({
      productSizeDescription: [null,[Validators.required,Validators.minLength(15),Validators.maxLength(50)]]
    });
  }

  submitAddProductSizeForm() {
     if(this.productSizeForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: "provide all the required fields values!",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
    let eproductSizeDetail =
    {
      "productSizeId":Number(this.productSizeId??0),
      "productSizeDescription":String( this.productSizeForm.controls["productSizeDescription"].value)
    };
    debugger
    console.log(eproductSizeDetail)

    this.productService.addProductSize(eproductSizeDetail).subscribe(response => {
      if (response.statusCode == 200) {

        
          Swal.fire({
            title: 'Success!',
            text: this.productSizeId==0?"product Size added successfully!":"Product Size updated successfully!",
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.router.navigateByUrl("/admin/product/size/detail");
          })
        }
    });


  }

}
