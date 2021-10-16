import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: 'app-management-report',
  templateUrl: './management-report.component.html',
  styleUrls: ['./management-report.component.css']
})
export class ManagementReportComponent implements OnInit {

  productData:any[]=[]

  constructor(
    private productService:ProductService
  ) {}
  
  
  
  ngOnInit(): void {
    this.getManagementReport();
  }

 

  getManagementReport()
  {
   
    this.productService.getManagementReport().subscribe(response=>{
      this.productData=response.products;


    })
    debugger
  }
  downloadPDF() {
  

    var element=document.getElementById("report");
    html2PDF(element, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output:  `Transactional_Monthly_Sales_Report.pdf`
    });

} 

}


