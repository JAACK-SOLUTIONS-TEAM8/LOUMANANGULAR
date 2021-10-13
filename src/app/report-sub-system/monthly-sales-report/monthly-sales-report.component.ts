import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import html2PDF from 'jspdf-html2canvas';

import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-monthly-sales-report',
  templateUrl: './monthly-sales-report.component.html',
  styleUrls: ['./monthly-sales-report.component.css']
})
export class MonthlySalesReportComponent implements OnInit {


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [];

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

      this.barChartData=[];
      this.barChartLabels=[];
      let soldQuantities:number[]=[];
      
      this.productData.forEach(p=>{
        soldQuantities.push(p.soldQuantity);
        this.barChartLabels.push(p.productName)
      });
      console.log(soldQuantities)
      this.barChartData.push({data:soldQuantities,label: 'Products Montly Sale'})

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
      output:  `Monthly_Sales_Report.pdf`
    });

} 

}
