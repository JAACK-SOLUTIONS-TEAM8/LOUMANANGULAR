import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { TeamService } from 'src/app/services/team/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-employee-profile',
  templateUrl: './view-employee-profile.component.html',
  styleUrls: ['./view-employee-profile.component.css']
})
export class ViewEmployeeProfileComponent implements OnInit {

  employeeUserId:number;
  pdfByteArrays=[]
  employeeData:any={}
  employeeDetailForm: FormGroup;
  editDetail:boolean=true;

  employeeImage:any={}
  teamEmployeeData: any[]=[];

  constructor(
    private employeeService:EmployeeService,
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder,
    private teamService:TeamService
  ) { 
    this.route.params.subscribe(params=>{
      this.employeeUserId=params["employeeUserId"]
    })
    debugger
  }

  ngOnInit(): void {
    this.getEmployeeByUserId();

    this.employeeDetailForm = this.formBuilder.group({
      initials: [null,Validators.required],
      surname: [null,Validators.required],
      email: [null,Validators.required],
      team: [null,Validators.required]

    });
  }

  getEmployeeByUserId()
  {
    this.employeeService.getEmployeeByUserId(this.employeeUserId).subscribe(response=>{
      this.employeeData=response.employee
      this.employeeDetailForm.controls["initials"].patchValue(response.employee.initials);
      this.employeeDetailForm.controls["surname"].patchValue(response.employee.surname);
      this.employeeDetailForm.controls["email"].patchValue(response.employee.email);
      this.employeeDetailForm.controls["team"].patchValue(response.employee.teamName??"No Team");

      this.employeeImage.file=this.employeeData.image;

      if(this.employeeData.teamId!=null && this.employeeData.teamId!=0)
      this.getTeamEmployees();
    });

  }


  getTeamEmployees()
  {
    this.teamService.getTeamEmployee(this.employeeData.teamId).subscribe(response=>{
      this.teamEmployeeData=response.employees;
      this.teamEmployeeData.forEach(employee=>{
       let index= this.employeeData.findIndex(e=>e.employeeId===employee.employeeId);
       if(index!=-1)
       {
        this.employeeData.splice(index,1)
       }
      })
    })
  }

  downloadDocument()
  {
    
  
      let filepdf = this.employeeData.document
      let a = document.createElement('a');
      a.href = filepdf;
      a.download = this.employeeData.initials;
      a.click();
  
  }

editProfile()
{
  debugger
  this.editDetail=false;
}

submitAddAdminForm()
{
  if(this.employeeDetailForm.invalid)
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
  debugger
  let employeeDetail =
  {
    "userId":  Number(this.employeeData!=null?this.employeeData.userId:0),
    "initials":  String(this.employeeDetailForm.controls["initials"].value),
    "surname":  String(this.employeeDetailForm.controls["surname"].value),
    "email":  String(this.employeeDetailForm.controls["email"].value),
    "image":  String(this.employeeImage.file),

  };
  debugger
  console.log(employeeDetail)

  this.employeeService.updateEmployee(employeeDetail).subscribe(response => {
    if (response.statusCode == 200) 
    {
      Swal.fire({
        title: 'Success!',
        text: 'employee updated successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{
        this.editDetail=true;
        this.getEmployeeByUserId();
      })
    }
  });
  this.employeeDetailForm.controls["userTypeId"].patchValue("none")

  console.log(employeeDetail);
}

uploadImage(event: any) {
  console.log(event.target.files)
 debugger
 this.readImageAsBase64(event.target.files[0]).subscribe(imageBase64 => {
   this.employeeImage = imageBase64;
 });
 this.editProfile()
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



}
