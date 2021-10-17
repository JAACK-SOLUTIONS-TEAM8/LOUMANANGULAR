import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { Observable,Subject } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { TimerConfigService } from 'src/app/services/timer/timer-config.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import {WebcamImage} from 'ngx-webcam';
import { passwordMatcher } from 'src/app/Admin/validators';


declare var $: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  userTypes: any[]=[];

  imageSource:string="file";

  public webcamImage: WebcamImage = null;
     private trigger: Subject<void> = new Subject<void>();
   triggerSnapshot(): void {
     this.imageSource="camera";
    this.trigger.next();
   }
   handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
   }
  
   public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
   }

  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  config:CountdownConfig={
    demand:true,
    leftTime:Number(JSON.parse(localStorage.getItem("timerConfig")).leftTime),
    notify:0,
    stopTime:0

  };


  ngOnInit(): void {

    this.initilizeFrom();
    this.getUserTypes();
    if(this.employeeId!=0)
    this.getEmployeeById();
    
    setTimeout(()=>{
      this.countdown.begin();
    },1000)

  }

  employeeData:any;
  profileDetailForm: FormGroup;
  employeeDetailForm: FormGroup;
  employeeEmployeementDetailForm: FormGroup;
  employeeImage:any={}
  employeeDocument:any={}
  imageUrl:string=""

  textMessage: string = "added successfully!";

  employeeId!: number;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService:EmployeeService,
    private userService:UserService,
    private datePipe:DatePipe,
    private timerService:TimerConfigService
  ) {
     this.route.params.subscribe(params=>{
      this.employeeId=Number(params["id"]);
      console.log(this.employeeId);
    });
  }


  
  

  initilizeFrom() {

    this.profileDetailForm = this.formBuilder.group({
      userName: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      password: [null,[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: [null,Validators.required]
    },{validator:passwordMatcher});

    if(this.employeeId!=0)
    {
      this.profileDetailForm.removeValidators([passwordMatcher]);
      this.profileDetailForm.controls['password'].clearValidators();
      this.profileDetailForm.controls['password'].updateValueAndValidity()

      this.profileDetailForm.controls['confirmPassword'].clearValidators();
      this.profileDetailForm.controls['confirmPassword'].updateValueAndValidity()

    }

    this.employeeDetailForm = this.formBuilder.group({
      initials: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      surname: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      userTypeId: [null,Validators.required],
      idNumber: [null,[Validators.required,Validators.minLength(13),Validators.maxLength(13)]],
      email: [null,[Validators.required,Validators.email]],
      cellNumber: [null,[Validators.required]]

    });

    this.employeeDetailForm.controls["userTypeId"].patchValue("none")

    this.employeeEmployeementDetailForm = this.formBuilder.group({
      commenceDate: [null,Validators.required],
      terminationDate: [null],
      terminationReason: [null]
    });

  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(types => {
      this.userTypes = types.userTypes;
    });
  }

  getEmployeeById() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(response=>{
  

      this.employeeData=response.employee;
      console.log(response)

      this.profileDetailForm.controls["userName"].patchValue(response.employee.userName);
      this.profileDetailForm.controls["password"].patchValue(response.employee.password);
      this.profileDetailForm.controls["confirmPassword"].patchValue(response.employee.password);
      this.employeeDetailForm.controls["initials"].patchValue(response.employee.initials);
      this.employeeDetailForm.controls["surname"].patchValue(response.employee.surname);
      this.employeeDetailForm.controls["userTypeId"].patchValue(response.employee.userTypeId);
      this.employeeDetailForm.controls["idNumber"].patchValue(response.employee.idNumber);
      this.employeeDetailForm.controls["email"].patchValue(response.employee.email);
      this.employeeDetailForm.controls["cellNumber"].patchValue(response.employee.cellNumber);

      this.employeeEmployeementDetailForm.controls["commenceDate"].patchValue(this.datePipe.transform(response.employee.commenceDate,"yyyy-MM-dd"));
      this.employeeEmployeementDetailForm.controls["terminationDate"].patchValue(this.datePipe.transform(response.employee.terminationDate,"yyyy-MM-dd"));
      this.employeeEmployeementDetailForm.controls["terminationReason"].patchValue(response.employee.terminationReason);
      this.employeeImage.file=response.employee.image
      this.employeeDocument.file=response.employee.document

     
      this.profileDetailForm.markAllAsTouched();
      this.profileDetailForm.updateValueAndValidity();

      this.employeeDetailForm.markAllAsTouched();
      this.employeeDetailForm.updateValueAndValidity();

      this.employeeEmployeementDetailForm.markAllAsTouched();
      this.employeeEmployeementDetailForm.updateValueAndValidity();
    });
  }

  submitAddAdminForm() {
    debugger
    if (this.profileDetailForm.controls["confirmPassword"].value != this.profileDetailForm.controls["password"].value) {
      Swal.fire({
        title: 'Warning!',
        text: 'password does not matched!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    else if(this.profileDetailForm.invalid || this.employeeEmployeementDetailForm.invalid || this.employeeDetailForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'provide all the required fields values!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log("provide all the required fields values!");
      return;
    }
    else if(this.employeeDetailForm.controls["userTypeId"].value=="none")
    {
      Swal.fire({
        title: 'Warning!',
        text: 'Select user type',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    debugger
    let employeeDetail =
    {
      "userId":  Number(this.employeeData!=null?this.employeeData.userId:0),
      "employeeId": Number(this.employeeData!=null?this.employeeData.employeeId:0),
      "userName": String(this.profileDetailForm.controls["userName"].value),
      "password":  String(this.profileDetailForm.controls["password"].value),
      "userTypeId": Number(this.employeeDetailForm.controls["userTypeId"].value=="none" ? 0:this.employeeDetailForm.controls["userTypeId"].value),
      "initials":  String(this.employeeDetailForm.controls["initials"].value),
      "surname":  String(this.employeeDetailForm.controls["surname"].value),
      "email":  String(this.employeeDetailForm.controls["email"].value),
      "idNumber":  String(this.employeeDetailForm.controls["idNumber"].value),
      "cellNumber": String(this.employeeDetailForm.controls["cellNumber"].value),
      "image":String(this.imageSource=="file"?this.employeeImage.file: this.webcamImage.imageAsDataUrl),
      "document":String(this.employeeDocument.file),
      "addressId":null,
      "teamId":Number(this.employeeData!=null?this.employeeData.teamId:0),
      "teamName":String(this.employeeData!=null?this.employeeData.teamName:""),
      "commenceDate":this.employeeEmployeementDetailForm.controls["commenceDate"].value,
      "terminationDate":this.employeeEmployeementDetailForm.controls["terminationDate"].value,
      "terminationReason":this.employeeEmployeementDetailForm.controls["terminationReason"].value
    };
    debugger
    console.log(employeeDetail)

    this.employeeService.addEmployee({userId: Number(this.employeeData!=null?this.employeeData.userId:0) ,employee:employeeDetail} ).subscribe(response => {
      if (response.statusCode == 200) 
      {
        Swal.fire({
          title: 'Success!',
          text: this.employeeId==0?'employee added successfully!':'employee updated successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/employee/detail");
        })
      }
    });
    this.employeeDetailForm.controls["userTypeId"].patchValue("none")

    console.log(employeeDetail);

  }

  uploadImage(event: any) {
    this.imageSource="file";

    console.log(event.target.files)
   debugger
   this.readImageAsBase64(event.target.files[0]).subscribe(imageBase64 => {
     this.employeeImage = imageBase64;
   });
 }
 
 readImageAsBase64(file: any): Observable<any> {
   let observerable = new Observable((observer) => {
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = (_event) => {
       observer.next({ file: reader.result, fileName: file.name, fileType: file.type });
     }
   });
   return observerable;
 }


 uploadDocument(event: any) {
  console.log(event.target.files)
 debugger
 this.readImageAsBase64(event.target.files[0]).subscribe(imageBase64 => {
   this.employeeDocument = imageBase64;
 });
}

handleEvent(event:any)
  {
    if(event.action=="done")
    {
      this.router.navigateByUrl("/employee/detail");
    }
    console.log(event);
  }
}