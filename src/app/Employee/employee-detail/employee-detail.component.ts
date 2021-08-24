import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  selectedEmployee: any;
  searchTerm!: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private employeeService:EmployeeService) { }
    
    employeesDetail:any[]=[]

  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees()
  {
    this.employeeService.getAllEmployees().subscribe(response=>{

      this.employeesDetail=response.employees;
    });
  }

  editEmployee(employee:any) {
    this.router.navigateByUrl(`/employee/add/${employee.employeeId}`);
  }

  confirmDeleteion() {
    console.log(this.selectedEmployee);
    this.employeeService.deleteEmployee(this.selectedEmployee.userId).subscribe(response => {
      if(response.statusCode==200)
      {
        console.log("employee deleted successfully");
        this.getAllEmployees();
      }
      console.log(response);
    });
  }

  deleteEmployee(employee: any)
  {
    this.selectedEmployee=employee;
  }
  

  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: "search field is empty!",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return
    }
    this.employeeService.searchEmployeeByName(this.searchTerm).subscribe(response=>{
      if(response.employees.length!=null&&response.employees.length!=0)
        this.employeesDetail = response.employees;
      else
      {
        Swal.fire({
          title: 'Warning!',
          text: "No search result found",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });
  }

  downloadDocument(employee:any)
  {
    debugger
    
      if(employee.document==null || employee.document =="" || employee.document =="undefined")
      {
        Swal.fire({
          title: 'Warning!',
          text: "No Document Found",
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        return 
      }
      let filepdf = employee.document
      let a = document.createElement('a');
      a.href = filepdf;
      a.download = employee.initials;
      a.click();
  
  }

  addEmployee()
{
  this.router.navigateByUrl("/employee/add/0");
}
}
