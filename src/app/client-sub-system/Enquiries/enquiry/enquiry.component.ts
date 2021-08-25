import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry/enquiry.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {

  enquiryData:any[]=[]
  selectedEnquiry:any;
  searchTerm!:string;

  constructor(
    private enquiryService:EnquiryService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllEnquiry();
  }

  getAllEnquiry()
  {
    this.enquiryService.getAllClientEnquiry(Number(JSON.parse(localStorage.getItem("User")).userId)).subscribe(response=>{
        this.enquiryData=response.enquiries;
    });
  }

  editEnquiry(enquiry:any)
  {
    if(enquiry.enquiryStatus=='Pending')
      this.router.navigateByUrl(`client/enquiry/add/${enquiry.enquiryId}`)
      else
      this.router.navigateByUrl(`client/enquiry/response/${enquiry.enquiryId}`)
  }

  deleteEnquiry(enquiry:any)
  {
    this.selectedEnquiry=enquiry;
  }


  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: "search bar field is empty",
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
          title: 'Warning!',
          text: "No search result found!",
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      }
    });
  }

  confirmDeleteion() {
    console.log(this.selectedEnquiry);
    this.enquiryService.deleteEnquiry(this.selectedEnquiry.enquiryId).subscribe(response => {
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Warning!',
          text: "Enquiry  deleted successfully!",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getAllEnquiry();
      }
      console.log(response);
    });
  }


}
