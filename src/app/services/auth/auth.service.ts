import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dataService:DataService
  ) { }

  login(userData:any) {
    debugger
    return this.dataService.genericCaller("post", "Auth/Login", userData);
  }

  logout(userId:number) {
    debugger
    return this.dataService.genericCaller("get", "Auth/Logout/"+userId, "");
  }

  resetPasswordInitial(userData: any) {
    debugger
    return this.dataService.genericCaller("post", "Auth/ResetPassword", userData);
  }

}
