import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: 'app-monthly-employee-register-report',
  templateUrl: './monthly-employee-register-report.component.html',
  styleUrls: ['./monthly-employee-register-report.component.css']
})
export class MonthlyEmployeeRegisterReportComponent implements OnInit {

  employeeData:any[]=[]
  dateData:any;

  constructor(
    private employeeService:EmployeeService
  ) { }

  ngOnInit(): void {
  }
  getMonthlyRegistrationReport()
  {
    if(this.dateData=="" || this.dateData==null)
    {
      return;
    }
    this.employeeService.employeeAttendanceHistory(String(this.dateData)).subscribe(response=>{
      this.employeeData=response.history;
    })
  }

  downloadPDF() {
  

    var element=document.getElementById("report");
    html2PDF(element, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output:  `Monthly_Employee_Registration_report.pdf`
    });

}
}
