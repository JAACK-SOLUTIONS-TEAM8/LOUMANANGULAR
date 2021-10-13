import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-verfication',
  templateUrl: './email-verfication.component.html',
  styleUrls: ['./email-verfication.component.css']
})
export class EmailVerficationComponent implements OnInit {


    code:string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  verifyCode(){
    debugger
    if(this.code==null || this.code=="")
    {
      Swal.fire({
        title: 'Warning!',
        text: "Please Enter Verification Code",
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
    }
    this.authService.verify({
      user:JSON.parse(localStorage.getItem("userToConfirm")),
      code:this.code
    }).subscribe(response=>{
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: "User Verified",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl('/login')
        })
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
