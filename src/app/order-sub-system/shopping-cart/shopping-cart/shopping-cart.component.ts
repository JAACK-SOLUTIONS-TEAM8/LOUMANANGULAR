import { Component, OnInit } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productData:any[]=[]
 selectedProduct:any;
 productCount:number=0;

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.productCount=this.cartService.getItemCountInCart();
  }

  getAllProducts()
  {
    this.productData=this.cartService.getProductsFromShoppingCart();
  }

  clearCart()
  {
    
    this.cartService.clearCart();
    this.getAllProducts();
    Swal.fire({
      title: 'Info!',
      text: "Cart is Cleared",
      icon: 'info',
      confirmButtonText: 'Ok'
    })
  }

  removeFromCart(product:any)
  {

    this.selectedProduct=product;
  }

  confirmRemoveFromCart()
  {
    this.cartService.removeItemFromCart(this.selectedProduct);
    this.getAllProducts();
    Swal.fire({
      title: 'Success!',
      text: "Product Removed from Cart",
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }
}

