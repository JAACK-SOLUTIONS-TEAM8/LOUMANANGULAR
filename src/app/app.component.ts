import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { CartService } from './services/cart/cart.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn!:boolean;
  itemCount!:number
  role!:string;
  user:any
  constructor(
    private router:Router,
    private cartService:CartService,
    private authService:AuthService
    ) {
      this.initilization();
  
}

initilization()
  {
    this.itemCount=this.cartService.getItemCountInCart();

    this.isLoggedIn=localStorage.getItem("User")!=null?true:false;
    this.role=JSON.parse(localStorage.getItem("User"))?.userType;
    
    this.user=JSON.parse(localStorage.getItem("User"));
    debugger
   if(localStorage.getItem("User")==null)
    this.router.navigateByUrl("/login");

  }

  ngOnInit(): void {}

  logout()
  {
     this.authService.logout(Number(JSON.parse(localStorage.getItem("User")).userId)).subscribe(response=>{})
    localStorage.removeItem("User");
    this.cartService.clearCart();
    this.router.navigateByUrl("/login");
  }
}
