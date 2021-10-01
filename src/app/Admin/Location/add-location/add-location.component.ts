import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  addLocationForm: FormGroup;
  provinces:any;
  locationId: number;
  location:any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private locationService:LocationService
  ) {
    this.route.params.subscribe(params=>{
      this.locationId=params["id"];
    });
  }

  ngOnInit(): void {
    this.initilizeForm();
    this.getAllProvinces();
    if(this.locationId!=0)
    this.getLocationById();

    this.addLocationForm.controls['province'].patchValue("none")
  }

  getLocationById() {
    this.locationService.getLocationById(this.locationId).subscribe(response=>{
        this.location=response.location;
        this.addLocationForm.controls["locationArea"].patchValue(this.location.locationArea);
        this.addLocationForm.controls["province"].patchValue(this.location.locationProvince);
    });
  }

  getAllProvinces(){
    this.locationService.getAllProvinces().subscribe(response=>{
      this.provinces=response.provinces;
    })
  }

  initilizeForm() {
    this.addLocationForm = this.formBuilder.group({
      locationArea: [null,Validators.required],
      province: [null,Validators.required]
    });
  }

  submitAddLocationForm() {

    if(this.addLocationForm.invalid && this.addLocationForm.controls['province'].value !="none" && this.addLocationForm.controls['province'].value !=null)
    {
      Swal.fire({
        title: 'Info!',
        text: 'Provide All Fields!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return 
    }

    let locationDetail={location:{
      "locationId":Number(this.locationId!=0?this.location.locationId:0),
      "locationArea":String(this.addLocationForm.controls["locationArea"].value),
      "locationProvince":String(this.addLocationForm.controls["province"].value)
    },
    userId:Number(JSON.parse(localStorage.getItem('User')).userId)  
  };

    this.locationService.addLocation(locationDetail).subscribe(response=>{
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: 'location added successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigateByUrl("/admin/location/detail")
        })
      }
      
    });

  }

}
