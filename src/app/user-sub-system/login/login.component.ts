import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TimerConfigService } from 'src/app/services/timer/timer-config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  code:string="";

  isAuthenticated:boolean=false;

  constructor(
    private formBuilder:FormBuilder,
    private authServcie:AuthService,
    private router:Router,
    private timerService:TimerConfigService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.initlizieForm();
  }

  initlizieForm()
  {
    this.loginForm=this.formBuilder.group({
      userName:[null,Validators.required],
      password:[null,Validators.required],
      code:[null] 
    });
  }

  login()
  {
    if(this.loginForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: "provide all fields values!",
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }
    let loginData={
      "userName":String(this.loginForm.controls["userName"].value),
      "password":String(this.loginForm.controls["password"].value)
    };

    this.authServcie.login(loginData).subscribe(response=>{
      if(response.statusCode==200)
      {
        this.isAuthenticated=true;

        localStorage.setItem('userToConfirm',JSON.stringify(response.user));

        Swal.fire({
          title: 'Succes!',
          text: "Success",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        return
      }
      else
      {
        this.authServcie.isLoggedIn=false;
        this.authServcie.isLoggedInSubject.next(false);

        Swal.fire({
          title: 'Warning!',
          text: "Incorrect Username and password!",
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
        return;
      }
    });
  }


  verifyCode(){
    debugger
    let verificationCode=this.loginForm.controls["code"].value
    if(verificationCode==null ||verificationCode=="")
    {
      
      Swal.fire({
        title: 'Warning!',
        text: "Please Enter Verification Code",
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }
    this.authService.verify({
      user:JSON.parse(localStorage.getItem("userToConfirm")),
      code:verificationCode
    }).subscribe(response=>{


      if(response.statusCode==200)
      {

        console.log(response.status)
        localStorage.setItem('isLoggedIn',String(true))

        this.authServcie.isLoggedIn=true;
        this.authServcie.user=JSON.stringify(response.status.user);

        this.authServcie.isLoggedInSubject.next(true);
        this.authServcie.userSubject.next(JSON.stringify(response.status.user))

        localStorage.setItem("User",JSON.stringify(response.status.user));

        this.timerService.getTimerConfig().subscribe(response=>{

        localStorage.setItem("timerConfig",JSON.stringify(response.config));
        })
        Swal.fire({
          title: 'Success!',
          text: "User Verified",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
         
          this.router.navigateByUrl("/home")
  
        })
      }
      else if(response.statusCode == 401)
      {
        Swal.fire({
          title: 'Warning!',
          text: "Incorrect Code",
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
        return
      }
      else
      {
        Swal.fire({
          title: 'Warning!',
          text: "Incorrect code or time out try again",
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      }
      console.log(response);
    })
  }


}
