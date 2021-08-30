import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry/enquiry.service';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-enquiry-type-detail',
  templateUrl: './enquiry-type-detail.component.html',
  styleUrls: ['./enquiry-type-detail.component.css']
})
export class EnquiryTypeDetailComponent implements OnInit {

  enquiryTypesData:any[]=[]
  selectedEnquiry:any;
  searchTerm:string;

  constructor(
    private enquiryService:EnquiryService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllEnquiryTypes();
  }

  getAllEnquiryTypes()
  {
    this.enquiryService.getAllEnquiryTypes().subscribe(response=>{
        this.enquiryTypesData=response.enquiryTypes;
    });
  }

  editEnquiryType(enquiryType:any)
  {
      this.router.navigateByUrl(`admin/add-enquiry-type/${enquiryType.enquiryTypeId}`)
  }

  deleteEnquiryType(enquiryType:any)
  {
    this.selectedEnquiry=enquiryType;
  }


  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'Search field is empty!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return
    }
    this.enquiryService.searchEnquiryTypeByName(this.searchTerm).subscribe(response=>{
      if(response.enquiryTypes.length!=null&&response.enquiryTypes.length!=0)
        this.enquiryTypesData = response.enquiryTypes;
      else
      {
        Swal.fire({
          title: 'Warninf!',
          text: 'No search result found!',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  confirmDeleteion() {
    console.log(this.selectedEnquiry);
    this.enquiryService.deleteEnquiryType(this.selectedEnquiry.enquiryTypeId).subscribe(response => {
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: 'Enquiry Type deleted successfully!',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
        this.getAllEnquiryTypes();
      }
      console.log(response);
    });
  }


}

