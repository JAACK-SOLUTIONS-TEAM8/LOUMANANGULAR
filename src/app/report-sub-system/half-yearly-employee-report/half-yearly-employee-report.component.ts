import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import html2PDF from 'jspdf-html2canvas';
declare var $:any;

@Component({
  selector: 'app-half-yearly-employee-report',
  templateUrl: './half-yearly-employee-report.component.html',
  styleUrls: ['./half-yearly-employee-report.component.css']
})
export class HalfYearlyEmployeeReportComponent implements OnInit {

  reportData:any[]=[]
  dateData:any;

  
  constructor(
    private employeeService:EmployeeService
  ) {}
  
  
  
  ngOnInit(): void {
    this.getSixMonthRegistrationReport()
  }

  getSixMonthRegistrationReport()
  {
    
    this.employeeService.sixMonthRegistrationHistory().subscribe(response=>{
      this.reportData=response.history;
    })
  }

 downloadPDF() {
  

var element=document.getElementById("report");
html2PDF(element, {
  jsPDF: {
    format: 'a4',
  },
  imageType: 'image/jpeg',
  output: `Half_Yearly_Employee_Report.pdf`
});
  

}
}
