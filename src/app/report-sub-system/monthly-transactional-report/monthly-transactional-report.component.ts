import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import html2PDF from 'jspdf-html2canvas';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-monthly-transactional-report',
  templateUrl: './monthly-transactional-report.component.html',
  styleUrls: ['./monthly-transactional-report.component.css']
})
export class MonthlyTransactionalReportComponent implements OnInit {

  productData:any;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];
  dateData: string;

  constructor(
    private productService:ProductService
  ) {}
  
  
  
  ngOnInit(): void {
  }

 

  getMonthlyTransactionalReport()
  {
    if(this.dateData=="" || this.dateData==null)
    {
      return;
    }
    this.productService.getMonthlyTransactionalReport(String(this.dateData)).subscribe(response=>{
      this.productData=response.products;

      this.barChartData=[];
      this.barChartLabels=[];
      let soldQuantities:number[]=[];
      
      response.products?.soldProducts.forEach(p=>{
        soldQuantities.push(p.totalSoldPrice);
        this.barChartLabels.push(p.productName)
      });
      console.log(soldQuantities)
      this.barChartData.push({data:soldQuantities,label: 'Transactional Montly Sale Report'})

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
