import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-initial-step',
  templateUrl: './reset-password-initial-step.component.html',
  styleUrls: ['./reset-password-initial-step.component.css']
})
export class ResetPasswordInitialStepComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { }

  infoForm:FormGroup;


  ngOnInit(): void {
    this.infoForm=this.formBuilder.group({
      userName:[null,Validators.required],
      email:[null,Validators.required],
      password:[null,Validators.required],
      confirmPassword:[null,Validators.required]

    })
  }

  submit()
  {
    if(this.infoForm.invalid)
    {
      Swal.fire({
        title: 'Info!',
        text: 'Provide all fields values',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
     return
  }
  else if(this.infoForm.controls["password"].value!=this.infoForm.controls["confirmPassword"].value)
  {
    Swal.fire({
      title: 'Info!',
      text: 'Password does not matched!',
      icon: 'info',
      confirmButtonText: 'Ok'
    })
   return
  }

  let userInfo={
    "userName":String(this.infoForm.controls["userName"].value),
    "email":String(this.infoForm.controls["email"].value),
    "password":String(this.infoForm.controls["password"].value),
  }


  this.authService.resetPasswordInitial(userInfo).subscribe(response=>{
    if(response.statusCode==200)
    {
      Swal.fire({
        title: 'Sucess!',
        text: 'Password Changed Successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{
        this.router.navigateByUrl("/login")

      });
    }
    else
    {
      Swal.fire({
        title: 'Info!',
        text: 'User Doesnot exist',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return
    }
  })

  }

}
