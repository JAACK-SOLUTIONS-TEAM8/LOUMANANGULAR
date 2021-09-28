import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private dataService:DataService
  ) { }

  getAllProducts() {
    debugger
    return this.dataService.genericCaller("get", "Product/All", "");
  }

  addProduct(productData: any) {
    debugger
    return this.dataService.genericCaller("post", "Product/Add", productData);
  }

  getProductById(productId: number) {
    debugger
    return this.dataService.genericCaller("get", `Product/${productId}`, "");
  }

  deleteProduct(productId: number) {
    debugger
    return this.dataService.genericCaller("get", `Product/Delete/${productId}`, "");
  }

  searchProductByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Product/Search?name="+searchTerm,"");
  }


  //product types
  getAllProductTypes()
  {
    return this.dataService.genericCaller("get","Product/ProductType/All","");

  }

  addProductType(productTypeData: any) {
    debugger
    return this.dataService.genericCaller("post", "Product/ProductType/Add", productTypeData);
  }

  getProductTypeById(productTypeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Product/ProductType/${productTypeId}`, "");
  }

  deleteProductType(productTypeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Product/ProductType/Delete/${productTypeId}`, "");
  }

  searchProductTypeByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Product/ProductType/Search?name="+searchTerm,"");
  }


  //product types
  getAllProductSizes()
  {
    return this.dataService.genericCaller("get","Product/ProductSize/All","");

  }

  addProductSize(productSizeData: any) {
    debugger
    return this.dataService.genericCaller("post", "Product/ProductSize/Add", productSizeData);
  }

  getProductSizeById(productSizeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Product/ProductSize/${productSizeId}`, "");
  }

  deleteProductSize(productSizeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Product/ProductSize/Delete/${productSizeId}`, "");
  }

  searchProductSizeByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Product/ProductSize/Search?name="+searchTerm,"");
  }

  getStockProductById(stockId: number) {
    debugger
    return this.dataService.genericCaller("get", `Product/Stock/${stockId}`, "");
  }

  wireOffStockProduct(stockData: any) {
    debugger
    return this.dataService.genericCaller("post", `Product/Stock/WireOff`, stockData);
  }

  completeStockProduct(stockData: any) {
    debugger
    return this.dataService.genericCaller("post", `Product/Stock/Complete`, stockData);
  }

  searchStockProductByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Product/Stock/Search?name="+searchTerm,"");
  }

  checkProductQuantityInStock(productId:number)
  {
    return this.dataService.genericCaller("get","Product/Stock/Quantity/"+productId,"");
  }

  getStockMonthlyReport(dateInfo:string)
  {
    return this.dataService.genericCaller("get","Product/Stock/MonthlyReport?dateInfo="+dateInfo,"");
  }

}
