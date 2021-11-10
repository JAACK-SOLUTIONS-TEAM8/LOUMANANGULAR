import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TimerConfigService } from 'src/app/services/timer/timer-config.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import {  passwordMatcher } from '../../validators';

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
    private timerService:TimerConfigService,
    private router: Router) {
    this.route.params.subscribe(param => {
      this.adminId = param["id"];
    });

  }

  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  config:CountdownConfig={
    demand:true,
    leftTime:Number(JSON.parse(localStorage.getItem("timerConfig")).leftTime),
    notify:0,
    stopTime:0

  };


  profileDetailForm: FormGroup;
  adminDetailForm: FormGroup;

  modalTitle:string="";
  modalMessage:string="";

  adminId: any;

  userTypes: any[] = [];

  adminData: any = {};

  timerConfig:any;


  ngOnInit(): void {
    this.initilizeForm();
    this.getUserTypes();
    if (this.adminId != 0)
      this.getAdminById();

      console.log(Number(JSON.parse(localStorage.getItem("timerConfig")).leftTime));
            setTimeout(()=>{
              this.countdown.begin();
            },1000)

  }

  initilizeForm() {
    this.profileDetailForm = this.fromBuilder.group({
      userName: [null,[Validators.required,Validators.maxLength(50), Validators.minLength(5)]],
      password: [null,[Validators.required,Validators.maxLength(8), Validators.minLength(4)]],
      confirmPassword: [null,Validators.required]
    },{ validators: passwordMatcher });

    this.adminDetailForm = this.fromBuilder.group({
      initials: [null,[Validators.required,Validators.maxLength(50), Validators.minLength(3)]],
      surname: [null,[Validators.required,Validators.maxLength(50), Validators.minLength(3)]],
      userTypeId: [null],
      idNumber: [null,[Validators.required,Validators.minLength(13),Validators.maxLength(13)]],
      email: [null, [Validators.required, Validators.email]],
      cellNumber: [null, [Validators.required]]

    });

    
  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(types => {
      this.userTypes = types.userTypes;
      let admin=this.userTypes.find(user=>user.userTypeDescription=="Admin")
      this.adminDetailForm.controls["userTypeId"].patchValue(Number(admin.userTypeId))

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
      this.adminDetailForm.controls["cellNumber"].patchValue(this.adminData.cellNumber);

      this.adminDetailForm.controls["idNumber"].patchValue(this.adminData.idNumber);
    });
  }



  submitAddAdminForm() {
    console.log(this.profileDetailForm.value);
    console.log(this.adminDetailForm.value);
    debugger

    if (this.profileDetailForm.controls["confirmPassword"].value != this.profileDetailForm.controls["password"].value) 
    {

      console.log("password does not matched!");

      Swal.fire({
        title: 'Warning!',
        text: 'Password did not Matched',
        icon: 'info',
        confirmButtonText: 'Ok'
      })

      return;
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
      "adminUserId":  Number(this.adminId==0?0:this.adminData.userId),
      "adminId": Number(this.adminId ?? 0),
      "userName": String(this.profileDetailForm.controls["userName"].value),
      "password":  String(this.profileDetailForm.controls["password"].value),
      "userTypeId": Number(this.adminDetailForm.controls["userTypeId"].value ?? 0),
      "initials":  String(this.adminDetailForm.controls["initials"].value),
      "surname":  String(this.adminDetailForm.controls["surname"].value),
      "email":  String(this.adminDetailForm.controls["email"].value),
      "idNumber":  String(this.adminDetailForm.controls["idNumber"].value),
      "cellNumber": String(this.adminDetailForm.controls["cellNumber"].value),
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
