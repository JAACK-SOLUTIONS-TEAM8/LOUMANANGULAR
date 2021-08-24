import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  selectedLocation: any;
  locationData:any[]=[];

  searchTerm:string;

  constructor(
    private router: Router,
    private locationService:LocationService
  ) {}



  ngOnInit(): void {
    this.getAllLocations();
  }


  getAllLocations()
  {
    this.locationService.getAllLocations().subscribe(response=>{
      console.log(response)
        this.locationData=response.locations;
    });
  }

  deleteLocation(location:any)
  {
    this.selectedLocation=location;
  }

  confirmDeleteion()
  {
    this.locationService.deleteLocation(this.selectedLocation.locationId).subscribe(reponse=>{
      if(reponse.statusCode ==200)
      {
        console.log("locatoin deleted successfully")
        this.getAllLocations();
      }
      else
      {
        console.log("locatoin deletion failed")
        this.getAllLocations();
      }

    });
  }

  editLocation(location:any)
  {
      this.router.navigateByUrl(`/admin/location/add/${location.locationId}`);
  }


  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Info!',
        text: 'search bar field is empty!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return;
    }
    this.locationService.searchLocationByName(this.searchTerm).subscribe(response=>{
      console.log("search result")
      console.log(response)
      if(response.locations!=null&&response.locations.length!=0)
      {
        
        this.locationData = response.locations;
      }
      else
      {
        Swal.fire({
          title: 'Info!',
          text: 'No search result found!',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
        this.locationData = response.locations;
      }
    });
  }

}
