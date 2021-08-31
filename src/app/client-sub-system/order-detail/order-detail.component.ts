import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderData:any;

  orderId:number;

  constructor(
    private orderService:OrderService,
    private route:ActivatedRoute,
    private router:Router
  ) { 
    this.route.params.subscribe(params=>{
      this.orderId=params["id"]
    })
  }

  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById()
  {
    this.orderService.getClientOrders(this.orderId).subscribe(response=>{
      console.log(response.order)
      this.orderData=response.order;
      console.log(this.orderData)
    })
  }

  completeOrder()
  {
    this.orderService.completeOrder(this.orderId).subscribe(response=>{
      if(response.statusCode ==200)
      {
        Swal.fire({
          title: 'Success!',
          text: 'Order Completed successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/admin/orders/all");

        });
      }
    });
  }

  downloadPDF() {
  

    var element=document.getElementById("invoice");
    html2PDF(element, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output: `${this.orderData?.clientName}'s_Order_Bill.pdf`
    });
}
}

