import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { TeamService } from 'src/app/services/team/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent implements OnInit {

  teamId: number
  locationData:any[]=[];

  employeeForm:FormGroup;
  teamData:any={};
  employeeData:any[]=[];
  teamEmployeeData:any[]=[];
  selectedEmployee:any=null;

  constructor(
    private route: ActivatedRoute,
    private teamService:TeamService,
    private router:Router,
    private employeeService:EmployeeService,
    private formBuilder:FormBuilder
  ) { 
    this.route.params.subscribe(params=>{
      this.teamId=params["id"];
    });
  }

  ngOnInit(): void {
    this.getTeamById();
    this.getAllEmployees()
    this.getTeamEmployees()
    this.employeeForm=this.formBuilder.group({
      employee:[null,Validators.required]
    })

    this.employeeForm.controls["employee"].patchValue("none")
  }
  getAllEmployees()
  {
    this.employeeService.getAllEmployees().subscribe(response=>{
      this.employeeData=response.employees;
    })
  }
  
    getTeamById() {
      this.teamService.getTeamById(this.teamId).subscribe(response=>{
          this.teamData=response.team;
      });
    }
  
    getTeamEmployees()
    {
      this.teamService.getTeamEmployee(this.teamId).subscribe(response=>{
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
  
    employeeSelected()
    {
     this.selectedEmployee =this.employeeForm.controls["employee"].value
     debugger
        if(this.teamEmployeeData.includes(this.selectedEmployee))
        {
          Swal.fire({
            title: 'Warning!',
            text: 'Employee Already in team',
            icon: 'error',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.selectedEmployee=null;
            this.employeeForm.controls["employee"].patchValue("none")
          })
          return
        }
    }
  
  addEmployeeToTeam()
  {
    if(this.selectedEmployee==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'Select an Employee to add',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
    else
    {
      let employeeDetail={...this.selectedEmployee};
      employeeDetail["teamId"]=Number(this.teamId)
      this.teamService.addEmployeeToTeam(employeeDetail).subscribe(response=>{
        if(response.statusCode==200)
        {
          Swal.fire({
            title: 'Success!',
            text: 'Employee Added to the Team',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.getTeamEmployees();
          })
        }
        else
        {
          Swal.fire({
            title: 'Warning!',
            text: 'Employee is already part of a Team',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
          return ;
        }
      })
    }
  }
  
  viewEmployeeDetail(employee:any)
  {
    debugger
    this.router.navigateByUrl("/employee/profile/"+this.teamId+"/"+employee.employeeId)
  }
  
  removeFromTeam(employee:any)
  {
    this.teamService.RemoveEmployeeFromTeam(this.teamId,Number(employee.employeeId)).subscribe(response=>{
      if(response.statusCode==200)
      {
        this.employeeForm.controls["employee"].patchValue("none")
  
        Swal.fire({
          title: 'Success!',
          text: 'Employee Removed from the Team',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.getTeamById();
          this.getAllEmployees()
          this.getTeamEmployees()    
        })
      }
    })
  }
  
  
  markAttendance()
  {
    this.teamService.canMarkAttendance(Number(this.teamId)).subscribe(response=>{
      if(response.statusCode ==200)
      {
        this.router.navigateByUrl("/admin/team/attendance/"+this.teamId);

      }
      else{
        Swal.fire({
          title: 'Info!',
          text: 'Today is not the working day for this team',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      }
    })
  }
  
}
