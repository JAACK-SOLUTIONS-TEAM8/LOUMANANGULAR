import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  
  constructor(
    private formBuilder:FormBuilder,
    private authServcie:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initlizieForm();
  }

  initlizieForm()
  {
    this.loginForm=this.formBuilder.group({
      userName:[null,Validators.required],
      password:[null,Validators.required] 
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
        Swal.fire({
          title: 'Succes!',
          text: "Success",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
         
          localStorage.setItem("User",JSON.stringify(response.user));
          this.router.navigateByUrl("/home")
  
        })
      }
      else
      {
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

}
