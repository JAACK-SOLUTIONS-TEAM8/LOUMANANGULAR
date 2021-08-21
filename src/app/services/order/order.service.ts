import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private dataService:DataService
  ) { }

  getAllDeliveryTypes() {
    debugger
    return this.dataService.genericCaller("get", "Order/DeliveryType/All", "");
  }

  addDeliveryType(deliveryData: any) {
    debugger
    return this.dataService.genericCaller("post", "Order/DeliveryType/Add", deliveryData);
  }

  getDeliveryTypeById(deliveryTypeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Order/DeliveryType/${deliveryTypeId}`, "");
  }

  deleteDeliveryType(deliveryTypeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Order/DeliveryType/Delete/${deliveryTypeId}`, "");
  }

  searchDeliveryTypeByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Order/DeliveryType/Search?name="+searchTerm,"");
  }


  submitOrder(orderDetail: any) {
    debugger
    return this.dataService.genericCaller("post", "Order/Add", orderDetail);
  }

  getAllOrders() {
    debugger
    return this.dataService.genericCaller("get", "Order/All", "");
  }

  getClientOrders(orderId:number) {
    debugger
    return this.dataService.genericCaller("get", `Order/All/${orderId}`, "");
  }

  completeOrder(orderId:number)
  {
    debugger
    return this.dataService.genericCaller("get", `Order/Complete/${orderId}`, "");
  }


  getMonthlySalesReport(dateInfo:string)
  {
    debugger
    return this.dataService.genericCaller("get", `Order/MonthlySalesReport?dateInfo=${dateInfo}`, "");
  }

}

