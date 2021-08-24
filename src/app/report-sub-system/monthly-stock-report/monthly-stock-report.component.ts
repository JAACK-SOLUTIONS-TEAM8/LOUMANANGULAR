import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: 'app-monthly-stock-report',
  templateUrl: './monthly-stock-report.component.html',
  styleUrls: ['./monthly-stock-report.component.css']
})
export class MonthlyStockReportComponent implements OnInit {

  productData:any[]=[]
  dateData:any;

  constructor(
    private productService:ProductService
  ) {}
  
  
  
  ngOnInit(): void {
  }

 

  getStockMonthlyReport()
  {
    if(this.dateData=="" || this.dateData==null)
    {
      return;
    }
    this.productService.getStockMonthlyReport(String(this.dateData)).subscribe(response=>{
      this.productData=response.products;
    })
  }
  downloadPDF() {
  

    var element=document.getElementById("report");
    html2PDF(element, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output: `Monthly_Stock_report.pdf`
    });

}
}
