import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addPrductToShoppingCart(products:any)
  {
    window.sessionStorage.setItem("products",JSON.stringify(products));
    window.sessionStorage.setItem("itemCount",products.length.toString());
  }

  getProductsFromShoppingCart():any[]
  {
    var products=window.sessionStorage.getItem("products");
    if(products!=null)
    {
      return JSON.parse(products);
    }
    else
    {
      return [];
    }
  }

  getItemCountInCart()
  {
    return Number( window.sessionStorage.getItem("itemCount"));
  }

  clearCart()
  {
    window.sessionStorage.removeItem("products");
    window.sessionStorage.setItem("itemCount","0");
    return Number( window.sessionStorage.getItem("itemCount"));
  }

  removeItemFromCart(product:any)
  {
    var productsInCart=this.getProductsFromShoppingCart();
    if(productsInCart.length!=0)
    {
      productsInCart.splice(productsInCart.indexOf(product),1);
      this.addPrductToShoppingCart(productsInCart);
    }
  }
}
