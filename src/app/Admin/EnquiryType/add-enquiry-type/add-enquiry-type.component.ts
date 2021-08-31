import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry/enquiry.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-enquiry-type',
  templateUrl: './add-enquiry-type.component.html',
  styleUrls: ['./add-enquiry-type.component.css']
})
export class AddEnquiryTypeComponent implements OnInit {

  addEnquiryTypeForm: FormGroup;
  enquiryTypeId:number;
  enquiryTypeData:any[]=[];
  enqueryType:any;

  constructor(
    private formBuilder: FormBuilder,
    private enquiryService:EnquiryService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe(params=>{
        this.enquiryTypeId=params["id"];
    });
   }

  ngOnInit(): void {
    this.initilizeForm();
    if(this.enquiryTypeId!=0)
      this.getEnquiryTypeById();
  }

  initilizeForm() {
    this.addEnquiryTypeForm = this.formBuilder.group({
      enquiryTypeDescription:[null,Validators.required]
    });
  }



  getEnquiryTypeById() {
    this.enquiryService.getEnquiryTypeById(this.enquiryTypeId).subscribe(response => {
      
      this.enqueryType = response.enquiryType;
      this.addEnquiryTypeForm.controls["enquiryTypeDescription"].patchValue(response.enquiryType.enquiryTypeDescription);
    
    });
  }



  submitAddEnquiryTypeForm() {
     if(this.addEnquiryTypeForm.invalid)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'provide all the required fields values!',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return
    }
    let enquiryTypeDetail =
    {
      "enquiryTypeId":Number(this.enquiryTypeId!=0?this.enqueryType.enquiryTypeId:0),
      "enquiryTypeDescription":String( this.addEnquiryTypeForm.controls["enquiryTypeDescription"].value)
    };
    debugger
    console.log(enquiryTypeDetail)

    this.enquiryService.addEnquiryType(enquiryTypeDetail).subscribe(response => {
      if (response.statusCode == 200) {

        if(this.enquiryTypeId==0)
        {
          Swal.fire({
            title: 'Success!',
            text: 'enquiry Type added successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.router.navigateByUrl("/admin/enquiry-type-detail");
          })
        }
        else
        {
          Swal.fire({
            title: 'Success!',
            text: 'enquiry Type updated successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(()=>{
            this.router.navigateByUrl("/admin/enquiry-type-detail");
          })
        }
      }
    });


  }


}

