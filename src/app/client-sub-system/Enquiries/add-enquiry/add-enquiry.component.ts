import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { EnquiryService } from 'src/app/services/enquiry/enquiry.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-enquiry',
  templateUrl: './add-enquiry.component.html',
  styleUrls: ['./add-enquiry.component.css']
})
export class AddEnquiryComponent implements OnInit {

  enquiryId:number;
  enquiryTypesData:any[]=[];
  enquiry:any;

  adminData:any[]=[]

  addEnquiryForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private enquiryService:EnquiryService,
    private adminService:AdminService,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
      this.enquiryId=params["id"];
    });
   }

  ngOnInit(): void {
    this.initilizeForm();
    this.getAllEnquiryTypes();
    this.getAllAdmins();
    if(this.enquiryId!=0)
    this.getEnquiryById();

    this.addEnquiryForm.controls["adminUserId"].patchValue("none")
    this.addEnquiryForm.controls["enquiryTypeId"].patchValue("none")

  }


  getAllAdmins()
  {
    this.adminService.getAllAdmins().subscribe(response=>{
      this.adminData=response.admins
      console.log(this.adminData)
    })
  }

  getAllEnquiryTypes()
  {
    this.enquiryService.getAllEnquiryTypes().subscribe(response=>{
      this.enquiryTypesData=response.enquiryTypes;
    });
  }

  getEnquiryById()
  {
      this.enquiryService.getEnquiryById(Number(this.enquiryId)).subscribe(response=>{
        this.enquiry=response.enquiry;
        console.log(response)
        this.addEnquiryForm.controls["enquiryTypeId"].patchValue(this.enquiry.enquiryTypeId);
        this.addEnquiryForm.controls["enquiryMessage"].patchValue(this.enquiry.enquiryMessage);
       // this.addEnquiryForm.controls["adminUserId"].patchValue(this.enquiry.adminUserId);

      });
  }

  initilizeForm()
  {
    this.addEnquiryForm=this.formBuilder.group({
      enquiryTypeId:[null,Validators.required],
      enquiryMessage:[null,Validators.required],
     // adminUserId:[null,Validators.required]
    })
  }

  submitAddEnquiry()
  {
    if(this.addEnquiryForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: "provide all the required fields",
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return;
    }
    var clientData=JSON.parse(localStorage.getItem("User"));
    let enquiryDetail={
      "enquiryId":Number(this.enquiryId??0),
      "enquiryTypeId":Number(this.addEnquiryForm.controls["enquiryTypeId"].value),
      "enquiryMessage":String(this.addEnquiryForm.controls["enquiryMessage"].value),
      "clientUserId":Number(clientData.userId),
     // "adminUserId":Number(this.addEnquiryForm.controls["adminUserId"].value),

    };
debugger
    this.enquiryService.addEnquiry(enquiryDetail).subscribe(respnse=>{
      if(respnse.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: this.enquiryId==0?"enquiry added successfully!":"Enquiry Updated Successfully!",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/client/enquiry/detail")
        });
      }
    })
  }

}
