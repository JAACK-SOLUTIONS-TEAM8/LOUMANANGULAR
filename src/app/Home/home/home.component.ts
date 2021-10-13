import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Codes'
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  value = 'https://www.google.com/maps/place/Louman+Eloff/@-26.142645,28.5864626,17z/data=!3m1!4b1!4m5!3m4!1s0x1e953223779562c7:0xdacf1a50fc8cf2f3!8m2!3d-26.142645!4d28.5886513';
  correctionlevel = NgxQrcodeErrorCorrectionLevels.HIGH;

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
