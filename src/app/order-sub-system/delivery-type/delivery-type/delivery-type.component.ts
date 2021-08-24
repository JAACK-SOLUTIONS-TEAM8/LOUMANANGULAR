import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-type',
  templateUrl: './delivery-type.component.html',
  styleUrls: ['./delivery-type.component.css']
})
export class DeliveryTypeComponent implements OnInit {

  deliveryTypesData:any[]=[]
  selectedDelivery:any;
  searchTerm:string | undefined;

  constructor(
    private orderService:OrderService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllDeliveryTypes();
  }

  getAllDeliveryTypes()
  {
    this.orderService.getAllDeliveryTypes().subscribe(response=>{
        this.deliveryTypesData=response.deliveryTypes;
    });
  }

  editDeliveryType(deliveryType:any)
  {
      this.router.navigateByUrl(`order/deliveryType/add/${deliveryType.deliveryTypeId}`)
  }

  deleteDeliveryType(deliveryType:any)
  {
    this.selectedDelivery=deliveryType;
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
    this.orderService.searchDeliveryTypeByName(this.searchTerm).subscribe(response=>{
      if(response.deliveryTypes.length!=null&&response.deliveryTypes.length!=0)
        this.deliveryTypesData = response.deliveryTypes;
      else
      {
        Swal.fire({
          title: 'Warning!',
          text: "No search result found!",
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        this.deliveryTypesData = response.deliveryTypes;
      }
    });
  }

  confirmDeleteion() {
    console.log(this.selectedDelivery);
    this.orderService.deleteDeliveryType(this.selectedDelivery.deliveryTypeId).subscribe(response => {
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: "DeliveryType deleted successfully!",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getAllDeliveryTypes();
      }
      console.log(response);
    });
  }
  


}

