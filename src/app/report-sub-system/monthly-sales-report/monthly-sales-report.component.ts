import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import html2PDF from 'jspdf-html2canvas';



@Component({
  selector: 'app-monthly-sales-report',
  templateUrl: './monthly-sales-report.component.html',
  styleUrls: ['./monthly-sales-report.component.css']
})
export class MonthlySalesReportComponent implements OnInit {

  productData:any[]=[]
  dateData:any;

  constructor(
    private orderService:OrderService
  ) {}
  
  
  
  ngOnInit(): void {
  }

 

  getStockMonthlyReport()
  {
    if(this.dateData=="" || this.dateData==null)
    {
      return;
    }
    this.orderService.getMonthlySalesReport(String(this.dateData)).subscribe(response=>{
      this.productData=response.quantity;
    })
  }
  downloadPDF() {
  

    var element=document.getElementById("report");
    html2PDF(element, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output:  `Monthly_Sales_Report.pdf`
    });

} 

}
