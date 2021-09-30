import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn:boolean;
  itemCount:number
  role:string;

  constructor(
    private router:Router,
    private cartService:CartService,
    private authService:AuthService
    ) {
      this.itemCount=this.cartService.getItemCountInCart();

      this.isLoggedIn=localStorage.getItem("User")!=null?true:false;
      this.role=JSON.parse(localStorage.getItem("User"))?.userType;
    
      
  }

  ngOnInit(): void {}

  logout()
  {
    this.authService.logout(Number(JSON.parse(localStorage.getItem("User")).userId)).subscribe(response=>{})
    localStorage.removeItem("User");
    this.router.navigateByUrl("/login");
  }

}
