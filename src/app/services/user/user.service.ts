import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dataService: DataService) { }

  getUserTypes() {
    return this.dataService.genericCaller("get", "User/UserTypes/All", "");
  }

  getAudit() {
    return this.dataService.genericCaller("get", "User/Audit", "");
  }

  searchAuditByUserName(name:string) {
    return this.dataService.genericCaller("get", "User/Audit/Search?name="+name, "");
  }


  getAllUserRoles(userId:number) {
    debugger
    return this.dataService.genericCaller("get", `User/Roles/${userId}`, "");
  }
  AddUserRoles(roleDetail:any) {
    debugger
    return this.dataService.genericCaller("post", `User/Roles/Add`, roleDetail);
  }

  getAllRoleReatures(roleId:number) {
    debugger
    return this.dataService.genericCaller("get", `User/Features/${roleId}`, "");
  }
  AddRoleFeature(featureDetail:any) {
    debugger
    return this.dataService.genericCaller("post", `User/Features/Add`, featureDetail);
  }

}
