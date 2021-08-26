import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  employeeId:number;
  teamId:number;
  employeeData:any={}

  constructor(
    private employeeService:EmployeeService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
      this.teamId=params["teamId"]
      this.employeeId=params["employeeId"]

    })
   }

  ngOnInit(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(response=>{
      this.employeeData=response.employee
    })
  }

  goBack(){
    this.router.navigateByUrl("/admin/team/manage/"+this.teamId)
}

downloadDocument(employee:any)
{  
    let filepdf = employee.document
    let a = document.createElement('a');
    a.href = filepdf;
    a.download = employee.initials;
    a.click();

}
}
