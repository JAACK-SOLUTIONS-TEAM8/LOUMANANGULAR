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
    if(this.locationId!=0)
    this.getLocationById();
  }

  getLocationById() {
    this.locationService.getLocationById(this.locationId).subscribe(response=>{
        this.location=response.location;
        this.addLocationForm.controls["locationArea"].patchValue(this.location.locationArea);
        this.addLocationForm.controls["province"].patchValue(this.location.locationProvince);
    });
  }

  initilizeForm() {
    this.addLocationForm = this.formBuilder.group({
      locationArea: [null,Validators.required],
      province: [null,Validators.required]
    });
  }

  submitAddLocationForm() {

    if(this.addLocationForm.invalid)
    {
      Swal.fire({
        title: 'Info!',
        text: 'Provide All Fields!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return 
    }

    let locationDetail={
      "locationId":Number(this.locationId!=0?this.location.locationId:0),
      "locationArea":String(this.addLocationForm.controls["locationArea"].value),
      "locationProvince":String(this.addLocationForm.controls["province"].value)
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
