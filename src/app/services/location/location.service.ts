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

  addLocation(locationData: any) {
    debugger
    return this.dataService.genericCaller("post", "Location/Add", locationData);
  }

  getLocationById(locationId: number) {
    debugger
    return this.dataService.genericCaller("get", `Location/${locationId}`, "");
  }

  deleteLocation(locationId: number) {
    debugger
    return this.dataService.genericCaller("get", `Location/Delete/${locationId}`, "");
  }

  searchLocationByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Location/Search?location="+searchTerm,"");
  }
}
