import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { AdminService } from 'src/app/services/admin/admin.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private adminService: AdminService,
    private router: Router) {
    this.route.params.subscribe(param => {
      this.adminId = param["id"];
    });
    
  }

  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  config:CountdownConfig={
    demand:false,
    leftTime:600,
    notify:0,
    stopTime:0
  }


  profileDetailForm: FormGroup;
  adminDetailForm: FormGroup;

  modalTitle:string="";
  modalMessage:string="";

  adminId: any;

  userTypes: any[] = [];

  adminData: any = {};



  ngOnInit(): void {
    this.initilizeForm();
    this.getUserTypes();
    if (this.adminId != 0)
      this.getAdminById();

    setTimeout(()=>{
      this.countdown.begin();
    },1000)
  }

  initilizeForm() {
    this.profileDetailForm = this.fromBuilder.group({
      userName: [null,[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      password: [null,[Validators.required,Validators.maxLength(8),Validators.minLength(6)]],
      confirmPassword: [null,Validators.required]
    });

    this.adminDetailForm = this.fromBuilder.group({
      initials: [null,[Validators.required,Validators.maxLength(5),Validators.minLength(2)]],
      surname: [null,[Validators.required,Validators.maxLength(50)]],
      userTypeId: [null,Validators.required],
      idNumber: [null,[Validators.required,Validators.maxLength(13)]],
      email: [null,[Validators.required,Validators.maxLength(50)]]
    });
  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(types => {
      this.userTypes = types.userTypes;
    });
  }

  getAdminById() {
    this.adminService.getAdminById(this.adminId).subscribe(response => {
      this.adminData = response.admin;

      this.profileDetailForm.controls["userName"].patchValue(this.adminData.userName);
      this.profileDetailForm.controls["password"].patchValue(this.adminData.password);
      this.profileDetailForm.controls["confirmPassword"].patchValue(this.adminData.password);


      this.adminDetailForm.controls["userTypeId"].patchValue(this.adminData.userTypeId);
      this.adminDetailForm.controls["surname"].patchValue(this.adminData.surname);
      this.adminDetailForm.controls["initials"].patchValue(this.adminData.initials);
      this.adminDetailForm.controls["email"].patchValue(this.adminData.email);
      this.adminDetailForm.controls["idNumber"].patchValue(this.adminData.idNumber);
    });
  }



  submitAddAdminForm() {
    console.log(this.profileDetailForm.value);
    console.log(this.adminDetailForm.value);
    debugger
    if(this.profileDetailForm.controls["password"].errors!=null || this.profileDetailForm.controls["password"].errors!=undefined){
      if(this.profileDetailForm.controls["password"].errors.minlength)
      {
        Swal.fire({
          title: 'Warning!',
          text: "Password should be minimum of 6 characters and maximum of 8 characters",
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
        return;
      }
  
      if(this.profileDetailForm.controls["password"].errors.maxlength)
      {
        Swal.fire({
          title: 'Warning!',
          text: "Password should be minimum of 6 characters and maximum of 8 characters",
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
        return;
      }
  
    if (this.profileDetailForm.controls["confirmPassword"].value != this.profileDetailForm.controls["password"].value) 
    {

      console.log("password does not match!");

      Swal.fire({
        title: 'Warning!',
        text: 'Password did not Match',
        icon: 'info',
        confirmButtonText: 'Ok'
      })

      return;
    }
  }

  if(this.profileDetailForm.controls["userName"].errors!=null || this.profileDetailForm.controls["userName"].errors!=undefined){
    if(this.profileDetailForm.controls["userName"].errors.minlength)
    {
      Swal.fire({
        title: 'Warning!',
        text: "User Name should be minimum of 5 characters and maximum of 50 characters",
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }

    if(this.profileDetailForm.controls["initials"].errors.maxlength)
    {
      Swal.fire({
        title: 'Warning!',
        text: "User Name should be minimum of 5 characters and maximum of 50 characters",
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }
}

if(this.adminDetailForm.controls["initials"].errors!=null || this.adminDetailForm.controls["initials"].errors!=undefined){
  if(this.adminDetailForm.controls["initials"].errors.minlength)
  {
    Swal.fire({
      title: 'Warning!',
      text: "Initials should be minimum of 2 characters and maximum of 8 characters",
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
    return;
  }

  if(this.adminDetailForm.controls["initials"].errors.maxlength)
  {
    Swal.fire({
      title: 'Warning!',
      text: "Initials should be minimum of 2 characters and maximum of 8 characters",
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
    return;
  }
}

if(this.adminDetailForm.controls["surname"].errors!=null || this.adminDetailForm.controls["surname"].errors!=undefined){
  
  if(this.adminDetailForm.controls["surname"].errors.maxlength)
  {
    Swal.fire({
      title: 'Warning!',
      text: "Surname should be at least 50 characters",
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
    return;
  }
}

if(this.adminDetailForm.controls["idNumber"].errors!=null || this.adminDetailForm.controls["idNumber"].errors!=undefined){
  
  if(this.adminDetailForm.controls["idNumber"].errors.maxlength)
  {
    Swal.fire({
      title: 'Warning!',
      text: "ID Number should be at least 13 characters",
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
    return;
  }
}

if(this.adminDetailForm.controls["email"].errors!=null || this.adminDetailForm.controls["email"].errors!=undefined){
  
  if(this.adminDetailForm.controls["email"].errors.maxlength)
  {
    Swal.fire({
      title: 'Warning!',
      text: "Email Address should be at least 50 characters",
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
    return;
  }
}


    else if(this.profileDetailForm.invalid || this.adminDetailForm.invalid)
    {
      console.log("provide all the required fields values!");

      Swal.fire({
        title: 'Info!',
        text: 'Provide All Required Fields',
        icon: 'info',
        confirmButtonText: 'Ok'
      })

      return;
    }

    let adminDetail =
    {
      "adminUserId":  Number(0),
      "adminId": Number(this.adminId ?? 0),
      "userName": String(this.profileDetailForm.controls["userName"].value),
      "password":  String(this.profileDetailForm.controls["password"].value),
      "userTypeId": Number(this.adminDetailForm.controls["userTypeId"].value ?? 0),
      "initials":  String(this.adminDetailForm.controls["initials"].value),
      "surname":  String(this.adminDetailForm.controls["surname"].value),
      "email":  String(this.adminDetailForm.controls["email"].value),
      "idNumber":  String(this.adminDetailForm.controls["idNumber"].value),
      "cellNumber": String( "")
    };
    debugger
    console.log(adminDetail)

    this.adminService.addAdmin(adminDetail).subscribe(response => {
      if (response.statusCode == 200) {

        if(this.adminId==0)
        {
          console.log("admin added successfully!");
          this.modalTitle="Success";
          this.modalMessage="Admin Added Successfully!";
          Swal.fire({
            title: 'Success!',
            text: 'Admin Added Successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.router.navigateByUrl("/admin/detail");
          })
        }
          else
          {
            Swal.fire({
              title: 'Success!',
              text: 'Admin Updated Successfully!',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(()=>{
              this.router.navigateByUrl("/admin/detail");
            })
          }
      }
    });

    console.log(adminDetail);

  }

  handleEvent(event:any)
  {
    if(event.action=="done")
    {
      this.router.navigateByUrl("/admin/detail");
    }
    console.log(event);
  }
}
