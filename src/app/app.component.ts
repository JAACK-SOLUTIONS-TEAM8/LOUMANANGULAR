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
  isLoggedIn:boolean;
  itemCount:number
  role:string;
  user:any;
  roles:any[]=[];
  constructor(
    private router:Router,
    private cartService:CartService,
    private authService:AuthService
    ) {
      this.initilization();
  
}

initilization()
{ debugger
  this.itemCount=this.cartService.getItemCountInCart();

  this.authService.isLoggedIn$.subscribe(value=>{
    this.isLoggedIn=value;
  });

  this.authService.user$.subscribe(value=>{
    this.user=JSON.parse(value);
    this.role=JSON.parse(value)?.userType
  });

  this.authService.userRoles$.subscribe(roles=>
    {
      this.roles=roles;
      console.log("==================================Roles====================================");
      console.log(this.roles);
      console.log("==========================================================================");

    });

    this.roles=JSON.parse(localStorage.getItem("UserRoles"))?.roles;
  this.isLoggedIn=Boolean(localStorage.getItem("isLoggedIn"));
  this.user=JSON.parse(localStorage.getItem("User"));
  this.role=JSON.parse(localStorage.getItem("User"))?.userType;
  console.log("==================================Roles from local storage====================================");
  console.log(this.roles);
  console.log("==========================================================================");

  this

      debugger
 if(this.user==null)
 {
   localStorage.clear();
  this.router.navigateByUrl("/home");
 }

}

  ngOnInit(): void {
    this.initilization();
  }

  logout()
  {
     this.authService.logout(Number(JSON.parse(localStorage.getItem("User")).userId)).subscribe(response=>{})
    localStorage.removeItem("User");
    this.cartService.clearCart();
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
}
