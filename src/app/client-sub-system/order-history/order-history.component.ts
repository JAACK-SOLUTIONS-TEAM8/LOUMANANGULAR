import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderData:any[]=[]
  constructor(
    private orderService:OrderService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getClientAllOrders()
  }

  getClientAllOrders()
  {
    this.orderService.getClientAllOrders(Number(JSON.parse(localStorage.getItem("User")).userId)).subscribe(response=>{
      this.orderData=response.orders
    });
  }


  getOrderDetail(order:any)
  {
    this.router.navigateByUrl(`/client/orders/detail/${order.orderId}`)
  }

}
