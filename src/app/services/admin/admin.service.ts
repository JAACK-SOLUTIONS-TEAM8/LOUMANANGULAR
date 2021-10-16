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

  getAllRoles() {
    debugger
    return this.dataService.genericCaller("get", "Admin/Roles", "");
  }

  addRole(roleData: any) {
    debugger
    return this.dataService.genericCaller("post", "Admin/Roles/Add", roleData);
  }
  getRoleById(roleId: number) {
    debugger
    return this.dataService.genericCaller("get", `Admin/Roles/${roleId}`, "");
  }

  getAllFeatures() {
    debugger
    return this.dataService.genericCaller("get", "Admin/Features", "");
  }

  addFeature(featureData: any) {
    debugger
    return this.dataService.genericCaller("post", "Admin/Features/Add", featureData);
  }
  getFeatureeById(featureId: number) {
    debugger
    return this.dataService.genericCaller("get", `Admin/Features/${featureId}`, "");
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
