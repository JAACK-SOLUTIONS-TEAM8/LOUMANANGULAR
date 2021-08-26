import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry/enquiry.service';

@Component({
  selector: 'app-enquiry-response',
  templateUrl: './enquiry-response.component.html',
  styleUrls: ['./enquiry-response.component.css']
})
export class EnquiryResponseComponent implements OnInit {

  enquiryId:number;
  enquiryData:any={};


  constructor(
    private route:ActivatedRoute,
    private enquiryService:EnquiryService,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
      this.enquiryId=params["id"]
      this.getEnquiryWithResponseById();
    });
   }

  ngOnInit(): void {
  }


 

  getEnquiryWithResponseById()
  {
    debugger
    this.enquiryService.getEnquiryWithResponseById(Number(this.enquiryId)).subscribe(response=>{
      this.enquiryData=response.enquiry;
      console.log(this.enquiryData)
    })
  }


}
