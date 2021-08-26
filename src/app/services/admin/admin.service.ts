import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private dataService: DataService) { }

  getAllAdmins() {
    debugger
    return this.dataService.genericCaller("get", "Admin/All", "");
  }

  addAdmin(adminData: any) {
    debugger
    return this.dataService.genericCaller("post", "Admin/Add", adminData);
  }

  getAdminById(adminId: number) {
    debugger
    return this.dataService.genericCaller("get", `Admin/${adminId}`, "");
  }

  deleteAdmin(adminUserId: number) {
    debugger
    return this.dataService.genericCaller("get", `Admin/Delete/${adminUserId}`, "");
  }

  searchAdminByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Admin/Search?name="+searchTerm,"");
  }
}
