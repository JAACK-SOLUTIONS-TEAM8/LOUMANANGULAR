import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-client-order-detail',
  templateUrl: './client-order-detail.component.html',
  styleUrls: ['./client-order-detail.component.css']
})
export class ClientOrderDetailComponent implements OnInit {
  orderData:any[]=[]
  constructor(
    private orderService:OrderService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllOrders()
  }
  getAllOrders()
  {
    this.orderService.getAllOrders().subscribe(response=>{
      this.orderData=response.orders
    });
  }


  getOrderDetail(order:any)
  {
    this.router.navigateByUrl(`/admin/orders/detail/${order.orderId}`)
  }

}


