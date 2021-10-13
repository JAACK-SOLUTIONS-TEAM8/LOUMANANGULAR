import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private dataService:DataService
  ) { }
  
  getAllLocations() {
    debugger
    return this.dataService.genericCaller("get", "Location/All", "");
  }

  getAllProvinces() {
    debugger
    return this.dataService.genericCaller("get", "Location/Provinces", "");
  }

  addLocation(locationData: any) {
    debugger
    return this.dataService.genericCaller("post", "Location/Add", locationData);
  }

  getLocationById(locationId: number) {
    debugger
    return this.dataService.genericCaller("get", `Location/${locationId}`, "");
  }

  deleteLocation(location: any) {
    debugger
    return this.dataService.genericCaller("post", `Location/Delete`, location);
  }

  searchLocationByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Location/Search?location="+searchTerm,"");
  }
}
