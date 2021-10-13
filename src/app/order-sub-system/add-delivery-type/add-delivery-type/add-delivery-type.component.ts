import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-delivery-type',
  templateUrl: './add-delivery-type.component.html',
  styleUrls: ['./add-delivery-type.component.css']
})
export class AddDeliveryTypeComponent implements OnInit {

  addDeliveryTypeForm: FormGroup | undefined;
  deliveryTypeId:number | undefined;
  deliveryTypeData:any[]=[];
  deliveryType:any;

  constructor(
    private formBuilder: FormBuilder,
    private orderService:OrderService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
        this.deliveryTypeId=params["id"];
    });
   }

  ngOnInit(): void {
    this.initilizeForm();
    if(this.deliveryTypeId!=0)
      this.getDeliveryTypeById();
  }

  initilizeForm() {
    this.addDeliveryTypeForm = this.formBuilder.group({
      description:[null,[Validators.required,Validators.minLength(15),Validators.maxLength(50)]]
    });
  }



  getDeliveryTypeById() {
    this.orderService.getDeliveryTypeById(this.deliveryTypeId).subscribe(response => {
      
      this.deliveryType = response.deliveryType;
      this.addDeliveryTypeForm.controls["description"].patchValue(response.deliveryType.description);
    
    });
  }



  submitAddDeliveryTypeForm() {
     if(this.addDeliveryTypeForm.invalid)
    {
      Swal.fire({
        title: 'Info!',
        text: "provide all the required fields values!",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
    let deliveryTypeDetail =
    {
      "deliveryTypeId":Number(this.deliveryTypeId??0),
      "description":String( this.addDeliveryTypeForm.controls["description"].value)
    };
    debugger
    console.log(deliveryTypeDetail)

    this.orderService.addDeliveryType(deliveryTypeDetail).subscribe(response => {
      if (response.statusCode == 200) {

        Swal.fire({
          title: 'Success!',
          text: this.deliveryTypeId?'elivery Type added successfully!':"delivery Type updated successfully!",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/order/deliveryType/detail");
        })
        
      }
    });


  }


}
