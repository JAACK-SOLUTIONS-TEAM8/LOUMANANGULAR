import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry/enquiry.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-enquiry-detail',
  templateUrl: './client-enquiry-detail.component.html',
  styleUrls: ['./client-enquiry-detail.component.css']
})
export class ClientEnquiryDetailComponent implements OnInit {

  enquiryId:number;
  enquiryData:any={};

  responseForm:FormGroup;

  constructor(
    private route:ActivatedRoute,
    private enquiryService:EnquiryService,
    private formBuilder:FormBuilder,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
      this.enquiryId=params["id"]
      this.getEnquiryWithResponseById();
    });
   }

  ngOnInit(): void {
    this.initilizeForm();
  }


  initilizeForm()
  {
    this.responseForm=this.formBuilder.group({
      enquiryResponseMessage:[null]
    });

  }

  getEnquiryWithResponseById()
  {
    debugger
    this.enquiryService.getEnquiryWithResponseById(Number(this.enquiryId)).subscribe(response=>{
      this.enquiryData=response.enquiry;
      if(Number(this.enquiryData.enquiryResponseId)!=0)
      {
        debugger
        this.responseForm.controls["enquiryResponseMessage"].patchValue(this.enquiryData.enquiryResponseMessage)
      }
      console.log(this.enquiryData)
    })
  }

  submitEnquiryResponse()
  {
    if(this.responseForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'Provide All the Fields!!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }
    let responseDetail={
      "enquiryResponseId":Number(this.enquiryData.enquiryResponseId),
      "enquiryResponseMessage":String(this.responseForm.controls["enquiryResponseMessage"].value),
      "enquiryId":Number(this.enquiryId)
    };

    debugger
    this.enquiryService.submitEnquiryResponse(responseDetail).subscribe(response=>{
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Warning!',
          text: 'response submitted successfuly!!',
          icon: 'info',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/admin/enquiry/detail")

        });
      }
    });

  }

}
