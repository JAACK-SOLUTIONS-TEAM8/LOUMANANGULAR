import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ClientService } from 'src/app/services/client/client.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  productData:any[];
  deliveryTypeData:any[]=[];
  userInfo:any;

  total:number;
  subTotal:number;
  discount:number;
  vat:number;

deliveryTypeForm:FormGroup;
paymentTypeForm:FormGroup;
cardFormForm:FormGroup;
pickupInfoForm:FormGroup;

role:string="client";

  showPaymentMethod: boolean=false;
  showPickupInfo:boolean=false;
  showCardDetailForm: boolean=false;
  constructor(
    private clientService:ClientService,
    private cartServive:CartService,
    private formBuilder:FormBuilder,
    private orderService:OrderService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getCartProduct();
    this.initilizeForm();
    this.getAllDeliveryTypes();

  }

  initilizeForm()
  {
    this.deliveryTypeForm=this.formBuilder.group({
      deliveryType:[null,Validators.required]
    });

    this.paymentTypeForm=this.formBuilder.group({
      paymentType:[null,Validators.required]
    });

    this.cardFormForm=this.formBuilder.group({
      holderName:[null,Validators.required],
      cardNumber:[null,Validators.required],
      securityNumber:[null,Validators.required],
    });

    this.pickupInfoForm=this.formBuilder.group({
      pickupDate:[null,Validators.required],
      pickupTime:[null,Validators.required]
    });
    this.deliveryTypeForm.controls["deliveryType"].patchValue("none")
    this.paymentTypeForm.controls["paymentType"].patchValue("none")

  }

  getAllDeliveryTypes()
  {
    this.orderService.getAllDeliveryTypes().subscribe(response=>{
      this.deliveryTypeData=response.deliveryTypes;
    })
  }

  getUserInfo()
  {
    this.clientService.getClientByUserId(Number(JSON.parse(localStorage.getItem("User")).userId)).subscribe(response=>{
      this.userInfo=response.client;
    })
  }

  getCartProduct()
  {
    this.productData=this.cartServive.getProductsFromShoppingCart();
    this.deliveryType();
  }

  deliveryType()
  {
    this.total=0;
    this.productData.forEach(product=>{
      this.total=this.total+(product.product.price * product.quantity);
      
        this.discount=this.total>500?this.total*0.01:0;
    });
  }

  submitOrder()
  {

    if(this.role=="admin")
    {

      return;
    }

    if(this.showCardDetailForm && this.cardFormForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: "provide card details",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return
    }
    if(this.deliveryTypeForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: "provide all fields values",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return
    }

    let orderDetail={
      "orderId":Number(0),
      "clientUserId":Number(JSON.parse(localStorage.getItem("User")).userId),
      "billId":Number(0),
      "total":Number(this.total),
      "discount":Number(this.discount),
      "products":this.productData,
      "deliveryTypeId":Number(this.deliveryTypeForm.controls["deliveryType"].value??0),
      "paymentType":String(this.paymentTypeForm.controls["paymentType"].value),
      "cardDetail":{...this.cardFormForm.value},
      "pickupDate":String(this.pickupInfoForm.controls["pickupDate"].value),
      "pickupTime":String(this.pickupInfoForm.controls["pickupTime"].value)
    };

    console.log(orderDetail)

    this.orderService.submitOrder(orderDetail).subscribe(response=>{
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: "Order Submitted Successfully!",
          icon: 'info',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.cartServive.clearCart();
          this.router.navigateByUrl("/client/product/list");  
        })
      }
    });
  }

  deliveryTypeChanged()
  {
    this.deliveryTypeData.forEach(type=>{
      if(Number(type.deliveryTypeId)==Number(this.deliveryTypeForm.controls["deliveryType"].value))
      {
        if(type.description=="Home Delivery")
        {
          this.showPaymentMethod=true;
          this.showPickupInfo=false;
          this.paymentTypeForm.controls["paymentType"].patchValue("none")

        }
        else
        {
          this.showPaymentMethod=false;
          this.showPickupInfo=true;

        }
      }
    })
  }
  paymentMethodTypeChanged()
  {
    if(this.paymentTypeForm.controls["paymentType"].value=="Credit Card")
    {
      this.showCardDetailForm=true;
    }
    else
    {
      this.showCardDetailForm=false;
    }
  }

  

  downloadPDF() {
  

    var element=document.getElementById("invoice");
    html2PDF(element, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output: `${this.userInfo?.initials+'_'+this.userInfo?.surname}'s_Order_Bill.pdf`
    });

} 

}
