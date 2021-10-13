import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry/enquiry.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-enquiry',
  templateUrl: './client-enquiry.component.html',
  styleUrls: ['./client-enquiry.component.css']
})
export class ClientEnquiryComponent implements OnInit {

  enquiryTypeForm:FormGroup;
  enquiryData:any[]=[]
  selectedEnquiry:any;
  searchTerm:string;
  enquiryTypesData:any[]=[];
  constructor(
    private enquiryService:EnquiryService,
    private router:Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllAdminEnquiry();
    this.getAllEnquiryTypes();
    this.initilizeForm();
  }


  initilizeForm()
  {
    this.enquiryTypeForm=this.formBuilder.group({
      enquiryTypeId:[null]
    });
    this.enquiryTypeForm.controls["enquiryTypeId"].patchValue("none")
  }

  getAllAdminEnquiry()
  {
    this.enquiryService.getAllAdminEnquiries().subscribe(response=>{
        this.enquiryData=response.enquiries;
    });
  }

  reponseEnquiry(enquiry:any)
  {
      this.router.navigateByUrl(`admin/enquiry/view/${enquiry.enquiryId}`)
  }

  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'search bar field is empty',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
    }
    this.enquiryService.searchEnquiryTypeByName(this.searchTerm).subscribe(response=>{
      if(response.enquiries.length!=null&&response.enquiries.length!=0)
        this.enquiryData = response.enquiries;
      else
      {
        Swal.fire({
          title: 'Info!',
          text: 'No search result found!!',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      }
    });
  }

  getAllEnquiryTypes()
  {
    this.enquiryService.getAllEnquiryTypes().subscribe(response=>{
      this.enquiryTypesData=response.enquiryTypes;
    });
  }

  enquiryTypeSelected()
  {
    if(String(this.enquiryTypeForm.controls["enquiryTypeId"].value)=="none")
    {
      this.getAllAdminEnquiry();
      return;
    }
    this.enquiryService.getAllAdminEnquiriesByTypeId(Number(this.enquiryTypeForm.controls["enquiryTypeId"].value)).subscribe(response=>{
      console.log(response)
      this.enquiryData=response.enquiries;
    });
  }

}
